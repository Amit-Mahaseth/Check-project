"""
Agent schemas.
"""

from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class AgentCreate(BaseModel):
    """Schema for creating an agent"""
    name: str
    description: Optional[str] = None


class AgentUpdate(BaseModel):
    """Schema for updating an agent"""
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None


class AgentResponse(BaseModel):
    """Schema for agent response"""
    id: int
    name: str
    description: Optional[str]
    status: str
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class AgentListResponse(BaseModel):
    """Schema for list of agents"""
    agents: list[AgentResponse]
    count: int
