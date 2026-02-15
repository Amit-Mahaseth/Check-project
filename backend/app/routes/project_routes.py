"""
Project routes.
"""

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.project_schema import (
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse,
    ProjectListResponse
)
from app.core.security import get_current_user
from app.services.project_service import ProjectService
from app.routes.response_model import success_response

router = APIRouter(
    prefix="/api/v1/projects",
    tags=["projects"]
)


@router.get("", response_model=dict)
async def list_projects(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> dict:
    """
    Get all projects for current user.
    Requires JWT token.
    """
    user_id = current_user.get("user_id")
    projects = ProjectService.get_projects(db, user_id)
    
    return success_response(
        data={
            "projects": projects,
            "count": len(projects)
        },
        message="Projects retrieved successfully"
    )


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_project(
    project_data: ProjectCreate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> dict:
    """
    Create a new project.
    Requires JWT token.
    """
    user_id = current_user.get("user_id")
    project = ProjectService.create_project(db, project_data, user_id)
    
    return success_response(
        data=project,
        message="Project created successfully"
    )


@router.put("/{project_id}", response_model=dict)
async def update_project(
    project_id: int,
    project_data: ProjectUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> dict:
    """
    Update a project.
    Requires JWT token and project ownership.
    """
    user_id = current_user.get("user_id")
    project = ProjectService.update_project(db, project_id, project_data, user_id)
    
    return success_response(
        data=project,
        message="Project updated successfully"
    )


@router.delete("/{project_id}", response_model=dict)
async def delete_project(
    project_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> dict:
    """
    Delete a project.
    Requires JWT token and project ownership.
    """
    user_id = current_user.get("user_id")
    ProjectService.delete_project(db, project_id, user_id)
    
    return success_response(
        message="Project deleted successfully"
    )
