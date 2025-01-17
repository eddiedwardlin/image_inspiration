from django.urls import path
from . import views

urlpatterns = [
    path("image-query/", views.ImageQueryListCreate.as_view(), name="image-query-list"),
    path("image-query/update/<int:pk>/", views.ImageQueryUpdate.as_view(), name="image-query-update"),
    path("image-query/delete/<int:pk>/", views.ImageQueryDestroy.as_view(), name="image-query-delete"),
]