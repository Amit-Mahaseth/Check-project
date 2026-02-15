"""
Agent model for ORM.
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base


class Agent(Base):
    """
    Agent model representing AI agents in the system.
    
    Attributes:
        id: Unique agent identifier
        name: Agent's display name
        description: Detailed description of agent's purpose
        status: Current status (active, inactive, processing)
        created_at: Creation timestamp
        user_id: Foreign key referencing the owner user
    """
    __tablename__ = "agents"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True, nullable=False)
    description = Column(String(1000))
    status = Column(String(50), default="active")  # active, inactive, processing
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="agents")
    
    def __repr__(self):
        return f"<Agent(id={self.id}, name={self.name}, status={self.status})>"
