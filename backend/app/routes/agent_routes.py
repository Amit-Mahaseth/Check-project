"""
Agent routes.
"""

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.agent_schema import (
    AgentCreate,
    AgentUpdate,
    AgentResponse,
    AgentListResponse
)
from app.core.security import get_current_user
from app.services.agent_service import AgentService
from app.routes.response_model import success_response

router = APIRouter(
    prefix="/api/v1/agents",
    tags=["agents"]
)


@router.get("", response_model=dict)
async def list_agents(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> dict:
    """
    Get all agents for current user.
    Requires JWT token.
    """
    user_id = current_user.get("user_id")
    agents = AgentService.get_agents(db, user_id)
    
    return success_response(
        data={
            "agents": agents,
            "count": len(agents)
        },
        message="Agents retrieved successfully"
    )


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_agent(
    agent_data: AgentCreate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> dict:
    """
    Create a new agent.
    Requires JWT token.
    """
    user_id = current_user.get("user_id")
    agent = AgentService.create_agent(db, agent_data, user_id)
    
    return success_response(
        data=agent,
        message="Agent created successfully"
    )


@router.put("/{agent_id}", response_model=dict)
async def update_agent(
    agent_id: int,
    agent_data: AgentUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> dict:
    """
    Update an agent.
    Requires JWT token and agent ownership.
    """
    user_id = current_user.get("user_id")
    agent = AgentService.update_agent(db, agent_id, agent_data, user_id)
    
    return success_response(
        data=agent,
        message="Agent updated successfully"
    )


@router.delete("/{agent_id}", response_model=dict)
async def delete_agent(
    agent_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> dict:
    """
    Delete an agent.
    Requires JWT token and agent ownership.
    """
    user_id = current_user.get("user_id")
    AgentService.delete_agent(db, agent_id, user_id)
    
    return success_response(
        message="Agent deleted successfully"
    )
