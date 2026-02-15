"""
Agent service with business logic.
"""

from sqlalchemy.orm import Session
from app.models import Agent
from app.schemas.agent_schema import AgentCreate, AgentUpdate, AgentResponse
from fastapi import HTTPException, status
import logging

logger = logging.getLogger(__name__)


class AgentService:
    """Service for agent operations"""
    
    @staticmethod
    def create_agent(db: Session, agent_data: AgentCreate, user_id: int) -> AgentResponse:
        """
        Create a new agent.
        
        Args:
            db: Database session
            agent_data: Agent creation data
            user_id: Owner user ID
            
        Returns:
            AgentResponse with created agent data
        """
        new_agent = Agent(
            name=agent_data.name,
            description=agent_data.description,
            user_id=user_id,
            status="active"
        )
        
        db.add(new_agent)
        db.commit()
        db.refresh(new_agent)
        
        logger.info(f"Agent created: {new_agent.name} for user {user_id}")
        return AgentResponse.from_orm(new_agent)
    
    @staticmethod
    def get_agents(db: Session, user_id: int) -> list[AgentResponse]:
        """Get all agents for a user"""
        agents = db.query(Agent).filter(Agent.user_id == user_id).all()
        return [AgentResponse.from_orm(agent) for agent in agents]
    
    @staticmethod
    def get_agent_by_id(db: Session, agent_id: int, user_id: int) -> Agent:
        """Get agent by ID, ensuring user ownership"""
        agent = db.query(Agent).filter(
            Agent.id == agent_id,
            Agent.user_id == user_id
        ).first()
        
        if not agent:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Agent not found"
            )
        
        return agent
    
    @staticmethod
    def update_agent(
        db: Session,
        agent_id: int,
        agent_data: AgentUpdate,
        user_id: int
    ) -> AgentResponse:
        """
        Update an agent.
        
        Args:
            db: Database session
            agent_id: Agent ID to update
            agent_data: Updated agent data
            user_id: Owner user ID
            
        Returns:
            Updated AgentResponse
        """
        agent = AgentService.get_agent_by_id(db, agent_id, user_id)
        
        update_data = agent_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(agent, field, value)
        
        db.add(agent)
        db.commit()
        db.refresh(agent)
        
        logger.info(f"Agent updated: {agent.name}")
        return AgentResponse.from_orm(agent)
    
    @staticmethod
    def delete_agent(db: Session, agent_id: int, user_id: int) -> None:
        """Delete an agent"""
        agent = AgentService.get_agent_by_id(db, agent_id, user_id)
        
        db.delete(agent)
        db.commit()
        
        logger.info(f"Agent deleted: {agent_id}")
