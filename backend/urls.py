from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    path("admin/", admin.site.urls),

    # JWT
    path("api/token/", TokenObtainPairView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),

    # App URLs
    path("api/accounts/", include("accounts.urls")),
    path("api/workspaces/", include("workspaces.urls")),
    path("api/projects/", include("projects.urls")),
    path("api/", include("tasks.urls")),
]