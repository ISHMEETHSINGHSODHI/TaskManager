from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from django.contrib.auth.models import User

from .models import Project, ProjectMember
from .serializers import ProjectSerializer

from rest_framework.exceptions import PermissionDenied

from workspaces.permissions import (
    is_workspace_admin,
    is_workspace_member
)
class ProjectViewSet(ModelViewSet):

    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    queryset = Project.objects.all()

    def perform_create(self, serializer):

        workspace = serializer.validated_data["workspace"]

        if not is_workspace_admin(
            self.request.user,
            workspace
        ):
            raise PermissionDenied(
                "Only admins can create projects"
            )

        project = serializer.save(
            created_by=self.request.user
        )

        ProjectMember.objects.create(
            project=project,
            user=self.request.user
        )

    # @action(detail=True, methods=["post"])
    # def add_member(self, request, pk=None):

    #     project = self.get_object()

    #     email = request.data.get("email")

    #     try:
    #         user = User.objects.get(email=email)

    #         ProjectMember.objects.create(
    #             project=project,
    #             user=user
    #         )

    #         return Response({
    #             "message": "Member added"
    #         })

    #     except User.DoesNotExist:

    #         return Response({
    #             "error": "User not found"
    #         }, status=404)
    @action(detail=True, methods=["post"])
    def add_member(self, request, pk=None):

        project = self.get_object()

        workspace = project.workspace

        if not is_workspace_admin(
            request.user,
            workspace
        ):
            raise PermissionDenied(
                "Only admins can add members"
            )

        email = request.data.get("email")

        try:
            user = User.objects.get(email=email)

            ProjectMember.objects.create(
                project=project,
                user=user
            )

            return Response({
                "message": "Member added"
            })

        except User.DoesNotExist:

            return Response({
                "error": "User not found"
            }, status=404)