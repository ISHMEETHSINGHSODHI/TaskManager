from rest_framework import serializers

from .models import (
    Task,
    Comment,
    ActivityLog
)


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = [
            "user",
            "created_at"
        ]


class ActivityLogSerializer(serializers.ModelSerializer):

    class Meta:
        model = ActivityLog
        fields = "__all__"


class TaskSerializer(serializers.ModelSerializer):

    comments = CommentSerializer(
        many=True,
        read_only=True
    )

    activity_logs = ActivityLogSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = [
        "created_by",
        "created_at"
    ]