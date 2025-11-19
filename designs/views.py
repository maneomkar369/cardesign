from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Design, DesignImage, DesignAsset, DesignVersion, Like, Comment, Tag
from .serializers import (
    RegisterSerializer, DesignSerializer, DesignCreateSerializer,
    DesignAssetSerializer, DesignVersionSerializer, LikeSerializer,
    CommentSerializer, TagSerializer, DesignImageSerializer
)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    pass  # Use default


class DesignListCreateView(generics.ListCreateAPIView):
    queryset = Design.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return DesignCreateSerializer
        return DesignSerializer

    def get_queryset(self):
        queryset = Design.objects.filter(is_public=True)
        search = self.request.query_params.get('search', None)
        tag = self.request.query_params.get('tag', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(description__icontains=search) | Q(tags__name__icontains=search)
            ).distinct()
        if tag:
            queryset = queryset.filter(tags__slug=tag)
        return queryset.order_by('-created_at')


class DesignDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Design.objects.all()
    serializer_class = DesignSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAuthenticated()]
        return super().get_permissions()

    def perform_update(self, serializer):
        if serializer.instance.author != self.request.user:
            raise PermissionError("You can only edit your own designs.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            raise PermissionError("You can only delete your own designs.")
        instance.delete()


class DesignImageUploadView(generics.CreateAPIView):
    serializer_class = DesignImageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        design_slug = self.kwargs['slug']
        design = get_object_or_404(Design, slug=design_slug)
        if design.author != self.request.user:
            raise PermissionError("You can only upload images to your own designs.")
        serializer.save(design=design)


class DesignAssetListCreateView(generics.ListCreateAPIView):
    queryset = DesignAsset.objects.all()
    serializer_class = DesignAssetSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class DesignVersionListView(generics.ListAPIView):
    serializer_class = DesignVersionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        design_slug = self.kwargs['slug']
        design = get_object_or_404(Design, slug=design_slug)
        return design.versions.all()


class DesignVersionCreateView(generics.CreateAPIView):
    serializer_class = DesignVersionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        design_slug = self.kwargs['slug']
        design = get_object_or_404(Design, slug=design_slug)
        if design.author != self.request.user:
            raise PermissionError("You can only create versions for your own designs.")
        serializer.save(design=design)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_like(request, slug):
    design = get_object_or_404(Design, slug=slug)
    like, created = Like.objects.get_or_create(user=request.user, design=design)
    if not created:
        like.delete()
        return Response({'liked': False})
    return Response({'liked': True})


class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        design_slug = self.kwargs['slug']
        design = get_object_or_404(Design, slug=design_slug)
        return design.comment_set.all()

    def perform_create(self, serializer):
        design_slug = self.kwargs['slug']
        design = get_object_or_404(Design, slug=design_slug)
        serializer.save(user=self.request.user, design=design)
