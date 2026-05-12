from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

from django.contrib.auth.models import User

from .models import Workspace, WorkspaceMember
from .serializers import WorkspaceSerializer
from rest_framework.exceptions import PermissionDenied
from projects.models import Project, ProjectMember
from .permissions import (
    is_workspace_admin,
    is_workspace_member
)

class WorkspaceViewSet(ModelViewSet):

    serializer_class = WorkspaceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Workspace.objects.filter(
            members__user=self.request.user
        ).distinct()

    def perform_create(self, serializer):

        workspace = serializer.save(
            created_by=self.request.user
        )

        WorkspaceMember.objects.create(
            workspace=workspace,
            user=self.request.user,
            role="OWNER"
        )

    @action(detail=True, methods=["post"])
    def add_member(self, request, pk=None):

        workspace = self.get_object()

        email = request.data.get("email")
        role = request.data.get("role", "MEMBER")

        try:

            user = User.objects.get(email=email)
            # prevent duplicates
            if WorkspaceMember.objects.filter(
                workspace=workspace,
                user=user
            ).exists():

                return Response({
                    "error": "User already member"
                }, status=400)

            WorkspaceMember.objects.create(
                workspace=workspace,
                user=user,
                role=role
            )
            

            return Response({
                "message": "Member added successfully"
            })

        except User.DoesNotExist:

            return Response({
                "error": "User not found"
            }, status=404)