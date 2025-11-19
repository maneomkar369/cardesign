from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

app_name = 'designs'

urlpatterns = [
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('designs/', views.DesignListCreateView.as_view(), name='design_list_create'),
    path('designs/<slug:slug>/', views.DesignDetailView.as_view(), name='design_detail'),
    path('designs/<slug:slug>/images/', views.DesignImageUploadView.as_view(), name='design_image_upload'),
    path('assets/', views.DesignAssetListCreateView.as_view(), name='asset_list_create'),
    path('designs/<slug:slug>/versions/', views.DesignVersionListView.as_view(), name='design_version_list'),
    path('designs/<slug:slug>/versions/', views.DesignVersionCreateView.as_view(), name='design_version_create'),
    path('designs/<slug:slug>/like/', views.toggle_like, name='toggle_like'),
    path('designs/<slug:slug>/comments/', views.CommentListCreateView.as_view(), name='comment_list_create'),
]