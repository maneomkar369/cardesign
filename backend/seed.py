import os
import django
from django.core.management import execute_from_command_line

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from designs.models import Design, DesignImage, DesignAsset, Tag

def create_users():
    users = [
        {'username': 'designer1', 'email': 'designer1@example.com', 'password': 'pass123'},
        {'username': 'designer2', 'email': 'designer2@example.com', 'password': 'pass123'},
        {'username': 'admin', 'email': 'admin@example.com', 'password': 'admin123'},
    ]
    for user_data in users:
        user, created = User.objects.get_or_create(
            username=user_data['username'],
            defaults={
                'email': user_data['email'],
                'is_staff': user_data['username'] == 'admin',
                'is_superuser': user_data['username'] == 'admin'
            }
        )
        if created:
            user.set_password(user_data['password'])
            user.save()
            print(f"Created user: {user.username}")

def create_tags():
    tags = ['Sedan', 'SUV', 'Sports', 'Electric', 'Luxury', 'Compact']
    for tag_name in tags:
        tag, created = Tag.objects.get_or_create(name=tag_name)
        if created:
            print(f"Created tag: {tag.name}")

def create_designs():
    user1 = User.objects.get(username='designer1')
    user2 = User.objects.get(username='designer2')

    designs = [
        {
            'title': 'Futuristic Sedan',
            'description': 'A sleek electric sedan for the future.',
            'author': user1,
            'is_public': True,
            'tags': ['Electric', 'Sedan']
        },
        {
            'title': 'Off-Road SUV',
            'description': 'Rugged SUV perfect for adventures.',
            'author': user2,
            'is_public': True,
            'tags': ['SUV', 'Sports']
        },
        {
            'title': 'Luxury Coupe',
            'description': 'Elegant coupe with premium features.',
            'author': user1,
            'is_public': True,
            'tags': ['Luxury', 'Sports']
        },
    ]

    for design_data in designs:
        tags = design_data.pop('tags')
        design, created = Design.objects.get_or_create(
            title=design_data['title'],
            defaults=design_data
        )
        if created:
            for tag_name in tags:
                tag = Tag.objects.get(name=tag_name)
                design.tags.add(tag)
            print(f"Created design: {design.title}")

def create_assets():
    assets = [
        {'name': 'Wheel 1', 'file': 'assets/wheel1.svg'},
        {'name': 'Spoiler', 'file': 'assets/spoiler.svg'},
        {'name': 'Decal 1', 'file': 'assets/decal1.png'},
    ]
    for asset_data in assets:
        asset, created = DesignAsset.objects.get_or_create(
            name=asset_data['name'],
            defaults={'file': asset_data['file']}
        )
        if created:
            print(f"Created asset: {asset.name}")

if __name__ == '__main__':
    print("Seeding database...")
    create_users()
    create_tags()
    create_designs()
    create_assets()
    print("Seeding complete!")