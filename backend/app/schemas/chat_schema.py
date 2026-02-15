"""
Chat schemas.
"""

from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ChatCreate(BaseModel):
    """Schema for creating a chat message"""
    message: str


class ChatResponse(BaseModel):
    """Schema for chat response"""
    id: int
    message: str
    response: Optional[str]
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class ChatListResponse(BaseModel):
    """Schema for list of chats"""
    chats: list[ChatResponse]
    count: int


class ChatMessage(BaseModel):
    """Schema for chat message with session"""
    message: str
    session_id: Optional[str] = None
