# NexTask — Multi User Task Management System

## Overview

NexTask is a collaborative multi-user task management web application built using Django REST Framework and React.

The platform allows users to:
- Create workspaces
- Add team members
- Create projects
- Manage tasks
- Add comments for collaboration

The application supports role-based collaboration where workspace owners/admins can manage members and projects, while members can access assigned workspaces and collaborate through tasks and comments.

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Secure API Access

---

## Workspaces
- Create multiple workspaces
- Add members via registered email
- Role-based access management
- Workspace collaboration

---

## Projects
- Create multiple projects inside a workspace
- Project visibility for workspace members
- Organized project structure

---

## Tasks
- Create and manage tasks
- Task priorities
- Task status management
- Due dates
- Task descriptions

---

## Comments
- Add comments on tasks
- Collaborative discussion system

---

## Dashboard
Members can view:
- Workspaces they are part of
- Projects inside workspaces
- Tasks associated with projects

---

# Tech Stack

## Backend
- Python
- Django
- Django REST Framework (DRF)

### Why Django + DRF?
- Django provides a powerful built-in admin panel for quick database management and testing.
- Excellent for backend-heavy applications.
- Secure authentication system.
- Rapid API development using DRF serializers and viewsets.
- Scalable project structure.

---

## Frontend
- React.js
- Axios
- React Router DOM

### Why React?
- Component-based architecture.
- Fast UI rendering.
- Easy API integration with DRF.
- Efficient state management for frontend screens.

---

# Architecture Overview

## User Flow

User  
→ Registers  
→ Logs In  
→ Creates Workspace  
→ Adds Members  
→ Creates Projects  
→ Creates Tasks  
→ Adds Comments  

---

## Member Flow

Member  
→ Gets Added to Workspace  
→ Accesses Workspace Dashboard  
→ Views Projects & Tasks  
→ Adds Comments  

---

# Project Structure

```text
TaskManager/
│
├── accounts/
├── workspaces/
├── projects/
├── tasks/
├── backend/
├── frontend/
├── manage.py
├── requirements.txt
```

# Key Design Decisions
- Users can create independent workspaces for collaboration.
- Workspace owners/admins can add members using registered email IDs.
- Multiple projects can exist inside a workspace.
- Members automatically gain access to workspace projects and related tasks.
- JWT authentication is used for secure API communication.
- Django admin panel is leveraged for quick backend management and debugging.

# Known Limitations
- Comment editing and deletion are not implemented yet.
- Kanban board view is not implemented currently.
- Email invitation system is simplified and works only for already registered users.
- Notifications and real-time updates are not implemented

# Future Improvements
- Kanban Drag-and-Drop Board
- Real-time Notifications
- Task Assignment Tracking
- Activity Logs
- Comment Editing & Deletion
- Email Invitations
- File Attachments
- Search & Filtering
- Deployment Optimization
