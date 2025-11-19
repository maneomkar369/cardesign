"""
Seed script to populate the database with the 9 car designs from the frontend.
Matches the mock data from Home.jsx
"""
import os
import sys
import django

# Setup Django environment
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from designs.models import Design, Tag

def create_or_get_user():
    """Get or create a default user for the designs"""
    user, created = User.objects.get_or_create(
        username='admin',
        defaults={
            'email': 'admin@cardesign.com',
            'first_name': 'Admin',
            'last_name': 'User',
            'is_staff': True,
            'is_superuser': True
        }
    )
    if created:
        user.set_password('admin123')
        user.save()
        print(f"✓ Created admin user (username: admin, password: admin123)")
    else:
        print(f"✓ Using existing admin user")
    return user

def create_tags(tag_names):
    """Create or get tags"""
    tags = []
    for tag_name in tag_names:
        tag, created = Tag.objects.get_or_create(name=tag_name)
        tags.append(tag)
        if created:
            print(f"  ✓ Created tag: {tag_name}")
    return tags

def seed_cars():
    """Seed the database with 9 car designs"""
    
    print("\n🚗 Starting car design seeding...\n")
    
    user = create_or_get_user()
    
    # Car designs data matching Home.jsx mock data
    cars = [
        {
            'title': 'Cyber Phantom GT',
            'slug': 'cyber-phantom-gt',
            'description': 'A cutting-edge electric hypercar featuring adaptive aerodynamics, holographic displays, and quantum-dot LED matrix lighting. 0-60 in 1.9 seconds with 1000+ hp.',
            'tags': ['Electric', 'Luxury', 'Performance', 'Concept'],
            'image_url': 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=800'
        },
        {
            'title': 'Urban EV Compact',
            'slug': 'urban-ev-compact',
            'description': 'Smart city car with autonomous parking, 360° cameras, and sustainable bamboo interior. Perfect for urban mobility with 200-mile range.',
            'tags': ['Electric', 'Compact', 'Urban', 'Eco-Friendly'],
            'image_url': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800'
        },
        {
            'title': 'Apex Roadster',
            'slug': 'apex-roadster',
            'description': 'Open-top performance with carbon fiber monocoque, active suspension, and biometric authentication. Pure driving exhilaration meets luxury.',
            'tags': ['Roadster', 'Performance', 'Luxury', 'Carbon Fiber'],
            'image_url': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
        },
        {
            'title': 'Neo Safari Cruiser',
            'slug': 'neo-safari-cruiser',
            'description': 'Adventure SUV with terrain-adaptive AI, solar roof panels, and modular cargo system. Built for off-grid exploration.',
            'tags': ['SUV', 'Off-Road', 'Adventure', 'Solar'],
            'image_url': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
        },
        {
            'title': 'Volt Sedan Pro',
            'slug': 'volt-sedan-pro',
            'description': 'Executive sedan with Level 4 autonomy, gesture controls, and adaptive comfort seats. The future of business travel.',
            'tags': ['Sedan', 'Executive', 'Autonomous', 'Luxury'],
            'image_url': 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800'
        },
        {
            'title': 'Thunder Truck X',
            'slug': 'thunder-truck-x',
            'description': 'All-electric pickup with 500-mile range, powered tonneau cover, and built-in workshop tools. Reinventing the American truck.',
            'tags': ['Truck', 'Electric', 'Utility', 'Power'],
            'image_url': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800'
        },
        {
            'title': 'Zenith Coupe',
            'slug': 'zenith-coupe',
            'description': 'Grand tourer with adaptive aerodynamics, starlight headliner, and hand-stitched Italian leather. Where art meets engineering.',
            'tags': ['Coupe', 'Luxury', 'Grand Tourer', 'Italian'],
            'image_url': 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800'
        },
        {
            'title': 'Prism Crossover',
            'slug': 'prism-crossover',
            'description': 'Family-focused with 7-seat configuration, pet-friendly features, and integrated entertainment pods. Adventure starts here.',
            'tags': ['Crossover', 'Family', 'Versatile', 'Tech'],
            'image_url': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
        },
        {
            'title': 'Aero Sport',
            'slug': 'aero-sport',
            'description': 'Track-ready sports car with active aero, ceramic brakes, and telemetry system. Engineered for the ultimate lap time.',
            'tags': ['Sports', 'Track', 'Performance', 'Aero'],
            'image_url': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'
        }
    ]
    
    created_count = 0
    updated_count = 0
    
    for car_data in cars:
        # Check if design already exists
        design, created = Design.objects.get_or_create(
            slug=car_data['slug'],
            defaults={
                'title': car_data['title'],
                'description': car_data['description'],
                'author': user,
                'is_public': True
            }
        )
        
        if created:
            created_count += 1
            print(f"✓ Created: {car_data['title']}")
        else:
            # Update existing design
            design.title = car_data['title']
            design.description = car_data['description']
            design.is_public = True
            design.save()
            updated_count += 1
            print(f"↻ Updated: {car_data['title']}")
        
        # Add tags
        tags = create_tags(car_data['tags'])
        design.tags.set(tags)
    
    print(f"\n✅ Seeding complete!")
    print(f"   Created: {created_count} designs")
    print(f"   Updated: {updated_count} designs")
    print(f"   Total: {Design.objects.count()} designs in database")
    print(f"\n💡 You can now access these designs via the API at:")
    print(f"   http://localhost:8000/api/designs/")
    print(f"   http://localhost:8000/api/designs/apex-roadster/")

if __name__ == '__main__':
    try:
        seed_cars()
    except Exception as e:
        print(f"\n❌ Error during seeding: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
