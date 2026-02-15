"""
Chat model for ORM.
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base


class Chat(Base):
    """
    Chat model for storing chat messages and responses.
    
    Attributes:
        id: Unique chat message identifier
        message: User's message/query
        response: AI response
        created_at: When the message was created
        user_id: Foreign key referencing the user who sent the message
    """
    __tablename__ = "chats"
    
    id = Column(Integer, primary_key=True, index=True)
    message = Column(Text, nullable=False)
    response = Column(Text, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Relationships
    user = relationship("User", back_populates="chats")
    
    def __repr__(self):
        return f"<Chat(id={self.id}, user_id={self.user_id}, created_at={self.created_at})>"
