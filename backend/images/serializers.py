from rest_framework import serializers
from .models import ImageQuery

class ImageQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageQuery
        fields = ["id", "date_created", "query", "author", "likes", "dislikes"]
        extra_kwargs = {"author": {"read_only": True}}