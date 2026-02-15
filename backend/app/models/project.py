"""
Project model for ORM.
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base


class Project(Base):
    """
    Project model for user projects.
    
    Attributes:
        id: Unique project identifier
        name: Project name
        description: Project description
        created_at: Creation timestamp
        user_id: Foreign key referencing the owner user
    """
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True, nullable=False)
    description = Column(String(1000))
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="projects")
    
    def __repr__(self):
        return f"<Project(id={self.id}, name={self.name})>"
