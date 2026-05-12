from .models import WorkspaceMember


def is_workspace_admin(user, workspace):

    return WorkspaceMember.objects.filter(
        workspace=workspace,
        user=user,
        role__in=["OWNER", "ADMIN"]
    ).exists()


def is_workspace_member(user, workspace):

    return WorkspaceMember.objects.filter(
        workspace=workspace,
        user=user
    ).exists()