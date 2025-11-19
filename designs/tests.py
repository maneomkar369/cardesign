from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Design, Tag, DesignImage

class DesignModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.tag = Tag.objects.create(name='Test Tag')

    def test_design_creation(self):
        design = Design.objects.create(
            title='Test Design',
            description='A test design',
            author=self.user,
            is_public=True
        )
        design.tags.add(self.tag)
        self.assertEqual(design.title, 'Test Design')
        self.assertEqual(design.author, self.user)
        self.assertIn(self.tag, design.tags.all())

class DesignAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(user=self.user)

    def test_create_design(self):
        data = {
            'title': 'New Design',
            'description': 'Description',
            'is_public': True,
            'tags': ['New Tag']
        }
        response = self.client.post('/api/designs/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Design.objects.count(), 1)
        self.assertEqual(Design.objects.get().title, 'New Design')

    def test_list_designs(self):
        Design.objects.create(title='Design 1', author=self.user, is_public=True)
        response = self.client.get('/api/designs/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
