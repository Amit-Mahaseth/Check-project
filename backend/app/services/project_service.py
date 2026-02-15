"""
Project service with business logic.
"""

from sqlalchemy.orm import Session
from app.models import Project
from app.schemas.project_schema import ProjectCreate, ProjectUpdate, ProjectResponse
from fastapi import HTTPException, status
import logging

logger = logging.getLogger(__name__)


class ProjectService:
    """Service for project operations"""
    
    @staticmethod
    def create_project(db: Session, project_data: ProjectCreate, user_id: int) -> ProjectResponse:
        """
        Create a new project.
        
        Args:
            db: Database session
            project_data: Project creation data
            user_id: Owner user ID
            
        Returns:
            ProjectResponse with created project data
        """
        new_project = Project(
            name=project_data.name,
            description=project_data.description,
            user_id=user_id
        )
        
        db.add(new_project)
        db.commit()
        db.refresh(new_project)
        
        logger.info(f"Project created: {new_project.name} for user {user_id}")
        return ProjectResponse.from_orm(new_project)
    
    @staticmethod
    def get_projects(db: Session, user_id: int) -> list[ProjectResponse]:
        """Get all projects for a user"""
        projects = db.query(Project).filter(Project.user_id == user_id).all()
        return [ProjectResponse.from_orm(project) for project in projects]
    
    @staticmethod
    def get_project_by_id(db: Session, project_id: int, user_id: int) -> Project:
        """Get project by ID, ensuring user ownership"""
        project = db.query(Project).filter(
            Project.id == project_id,
            Project.user_id == user_id
        ).first()
        
        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found"
            )
        
        return project
    
    @staticmethod
    def update_project(
        db: Session,
        project_id: int,
        project_data: ProjectUpdate,
        user_id: int
    ) -> ProjectResponse:
        """
        Update a project.
        
        Args:
            db: Database session
            project_id: Project ID to update
            project_data: Updated project data
            user_id: Owner user ID
            
        Returns:
            Updated ProjectResponse
        """
        project = ProjectService.get_project_by_id(db, project_id, user_id)
        
        update_data = project_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(project, field, value)
        
        db.add(project)
        db.commit()
        db.refresh(project)
        
        logger.info(f"Project updated: {project.name}")
        return ProjectResponse.from_orm(project)
    
    @staticmethod
    def delete_project(db: Session, project_id: int, user_id: int) -> None:
        """Delete a project"""
        project = ProjectService.get_project_by_id(db, project_id, user_id)
        
        db.delete(project)
        db.commit()
        
        logger.info(f"Project deleted: {project_id}")
