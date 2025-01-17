from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import ImageQuerySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import ImageQuery

# Make an image query
class ImageQueryListCreate(generics.ListCreateAPIView):
    serializer_class = ImageQuerySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ImageQuery.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

# View for updating likes and dislikes
class ImageQueryUpdate(generics.UpdateAPIView):
    serializer_class = ImageQuerySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ImageQuery.objects.filter(author=user)

# Delete an image query
class ImageQueryDestroy(generics.DestroyAPIView):
    serializer_class = ImageQuerySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ImageQuery.objects.filter(author=user)