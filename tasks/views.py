from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from projects.models import ProjectMember
from .models import (
    Task,
    Comment,
    ActivityLog
)

from .serializers import (
    TaskSerializer,
    CommentSerializer
)


class TaskViewSet(ModelViewSet):

    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    queryset = Task.objects.all()

    filterset_fields = [
        "status",
        "priority",
        "assignee"
    ]

    # def perform_create(self, serializer):

    #     task = serializer.save(
    #         created_by=self.request.user
    #     )

    #     ActivityLog.objects.create(
    #         task=task,
    #         user=self.request.user,
    #         action="Task Created"
    #     )
    def perform_create(self, serializer):

        project = serializer.validated_data["project"]

        is_member = ProjectMember.objects.filter(
            project=project,
            user=self.request.user
        ).exists()

        if not is_member:
            raise PermissionDenied(
                "You are not a project member"
            )

        task = serializer.save(
            created_by=self.request.user
        )

        ActivityLog.objects.create(
            task=task,
            user=self.request.user,
            action="Task Created"
        )
    def get_queryset(self):

        return Task.objects.filter(
            project__project_members__user=self.request.user
        ).distinct()

class CommentViewSet(ModelViewSet):

    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    queryset = Comment.objects.all()

    def perform_create(self, serializer):

        comment = serializer.save(
            user=self.request.user
        )

        ActivityLog.objects.create(
            task=comment.task,
            user=self.request.user,
            action="Comment Added"
        )
    def get_queryset(self):

        return Comment.objects.filter(
            task__project__project_members__user=self.request.user
        ).distinct()
    
    def perform_update(self, serializer):

        comment = self.get_object()

        if comment.user != self.request.user:
            raise PermissionDenied(
                "You can only edit your own comments"
            )

        serializer.save()


    def perform_destroy(self, instance):

        if instance.user != self.request.user:
            raise PermissionDenied(
                "You can only delete your own comments"
            )

        instance.delete()