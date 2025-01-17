from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("register/", views.CreateUserView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="get-token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
]