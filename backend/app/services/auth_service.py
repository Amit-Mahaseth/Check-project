"""
Authentication service with business logic.
"""

from sqlalchemy.orm import Session
from app.models import User
from app.schemas.user_schema import UserRegister, UserResponse
from app.core.security import SecurityUtils
from fastapi import HTTPException, status
import logging

logger = logging.getLogger(__name__)


class AuthService:
    """Service for authentication operations"""
    
    @staticmethod
    def register_user(db: Session, user_data: UserRegister) -> UserResponse:
        """
        Register a new user.
        
        Args:
            db: Database session
            user_data: User registration data
            
        Returns:
            UserResponse with created user data
            
        Raises:
            HTTPException: If email already exists
        """
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            logger.warning(f"Registration attempt with existing email: {user_data.email}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        hashed_password = SecurityUtils.hash_password(user_data.password)
        new_user = User(
            name=user_data.name,
            email=user_data.email,
            hashed_password=hashed_password
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        logger.info(f"User registered: {new_user.email}")
        return UserResponse.from_orm(new_user)
    
    @staticmethod
    def login_user(db: Session, email: str, password: str) -> User:
        """
        Authenticate user and return user object.
        
        Args:
            db: Database session
            email: User email
            password: User password
            
        Returns:
            User object if authentication successful
            
        Raises:
            HTTPException: If credentials invalid
        """
        user = db.query(User).filter(User.email == email).first()
        
        if not user or not SecurityUtils.verify_password(password, user.hashed_password):
            logger.warning(f"Failed login attempt: {email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        if not user.is_active:
            logger.warning(f"Login attempt on inactive account: {email}")
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is inactive"
            )
        
        logger.info(f"User logged in: {email}")
        return user
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> User:
        """Get user by ID"""
        return db.query(User).filter(User.id == user_id).first()
    
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> User:
        """Get user by email"""
        return db.query(User).filter(User.email == email).first()
