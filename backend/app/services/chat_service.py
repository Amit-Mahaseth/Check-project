"""
Chat service with business logic.
"""

from sqlalchemy.orm import Session
from app.models import Chat
from app.schemas.chat_schema import ChatCreate, ChatResponse
from fastapi import HTTPException, status
import logging

logger = logging.getLogger(__name__)


class ChatService:
    """Service for chat operations"""
    
    @staticmethod
    def create_chat(
        db: Session,
        chat_data: ChatCreate,
        user_id: int,
        response: str = None
    ) -> ChatResponse:
        """
        Create a new chat message.
        
        Args:
            db: Database session
            chat_data: Chat message data
            user_id: User ID
            response: Optional AI response
            
        Returns:
            ChatResponse with created chat data
        """
        new_chat = Chat(
            message=chat_data.message,
            response=response,
            user_id=user_id
        )
        
        db.add(new_chat)
        db.commit()
        db.refresh(new_chat)
        
        logger.info(f"Chat created for user {user_id}")
        return ChatResponse.from_orm(new_chat)
    
    @staticmethod
    def get_chat_history(db: Session, user_id: int, limit: int = 50) -> list[ChatResponse]:
        """
        Get chat history for a user.
        
        Args:
            db: Database session
            user_id: User ID
            limit: Maximum number of messages to return
            
        Returns:
            List of ChatResponse objects
        """
        chats = db.query(Chat).filter(
            Chat.user_id == user_id
        ).order_by(Chat.created_at.desc()).limit(limit).all()
        
        return [ChatResponse.from_orm(chat) for chat in reversed(chats)]
    
    @staticmethod
    def get_chat_by_id(db: Session, chat_id: int, user_id: int) -> Chat:
        """Get chat message by ID"""
        chat = db.query(Chat).filter(
            Chat.id == chat_id,
            Chat.user_id == user_id
        ).first()
        
        if not chat:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat message not found"
            )
        
        return chat
    
    @staticmethod
    def update_chat_response(
        db: Session,
        chat_id: int,
        response: str,
        user_id: int
    ) -> ChatResponse:
        """Update chat with AI response"""
        chat = ChatService.get_chat_by_id(db, chat_id, user_id)
        
        chat.response = response
        db.add(chat)
        db.commit()
        db.refresh(chat)
        
        logger.info(f"Chat updated with response: {chat_id}")
        return ChatResponse.from_orm(chat)
