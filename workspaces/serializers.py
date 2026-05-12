from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Workspace, WorkspaceMember


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "username", "email"]


class WorkspaceMemberSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = WorkspaceMember
        fields = ["id", "user", "role"]


class WorkspaceSerializer(serializers.ModelSerializer):

    members = WorkspaceMemberSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Workspace
        fields = [
            "id",
            "name",
            "description",
            "created_by",
            "created_at",
            "members"
        ]

        read_only_fields = [
            "created_by",
            "created_at"
        ]
