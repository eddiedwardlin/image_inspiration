from django.db import models
from django.contrib.auth.models import User

# Image query model that stores the query made by the user as well as likes and dislikes
class ImageQuery(models.Model):
    query = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_image")
    likes = models.JSONField(default=list, blank=True)
    dislikes = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.query