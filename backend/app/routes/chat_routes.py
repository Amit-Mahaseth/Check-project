"""
Chat routes.
"""

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.chat_schema import (
    ChatCreate,
    ChatResponse,
    ChatListResponse
)
from app.core.security import get_current_user
from app.services.chat_service import ChatService
from app.routes.response_model import success_response

router = APIRouter(
    prefix="/api/v1/chat",
    tags=["chat"]
)


@router.get("", response_model=dict)
async def get_chat_history(
    limit: int = 50,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> dict:
    """
    Get chat history for current user.
    Requires JWT token.
    
    - **limit**: Maximum number of messages to return (default: 50)
    """
    user_id = current_user.get("user_id")
    chats = ChatService.get_chat_history(db, user_id, limit)
    
    return success_response(
        data={
            "chats": chats,
            "count": len(chats)
        },
        message="Chat history retrieved successfully"
    )


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_chat(
    chat_data: ChatCreate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> dict:
    """
    Create a new chat message.
    Requires JWT token.
    
    - **message**: The user's message/query
    """
    user_id = current_user.get("user_id")
    chat = ChatService.create_chat(db, chat_data, user_id)
    
    return success_response(
        data=chat,
        message="Chat message created successfully"
    )


@router.get("/{chat_id}", response_model=dict)
async def get_chat(
    chat_id: int,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> dict:
    """
    Get a specific chat message by ID.
    Requires JWT token and message ownership.
    """
    user_id = current_user.get("user_id")
    chat = ChatService.get_chat_by_id(db, chat_id, user_id)
    
    return success_response(
        data=ChatResponse.from_orm(chat),
        message="Chat message retrieved successfully"
    )
