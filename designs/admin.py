from django.contrib import admin
from .models import Design, DesignImage, DesignAsset, DesignVersion, Like, Comment, Tag

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')

@admin.register(Design)
class DesignAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'is_public', 'created_at')
    list_filter = ('is_public', 'created_at')
    search_fields = ('title', 'description')

@admin.register(DesignImage)
class DesignImageAdmin(admin.ModelAdmin):
    list_display = ('design', 'uploaded_at')

@admin.register(DesignAsset)
class DesignAssetAdmin(admin.ModelAdmin):
    list_display = ('name', 'uploaded_at')

@admin.register(DesignVersion)
class DesignVersionAdmin(admin.ModelAdmin):
    list_display = ('design', 'created_at')

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'design', 'created_at')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'design', 'created_at')
