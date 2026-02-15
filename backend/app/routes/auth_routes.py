"""
Authentication routes.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta

from app.db.database import get_db
from app.schemas.user_schema import (
    UserRegister,
    UserLogin,
    TokenResponse,
    UserResponse
)
from app.services.auth_service import AuthService
from app.core.security import SecurityUtils
from app.routes.response_model import success_response
from app.core.config import settings

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["authentication"]
)


@router.post("/register", response_model=dict, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserRegister,
    db: Session = Depends(get_db)
) -> dict:
    """
    Register a new user.
    
    - **name**: User's full name
    - **email**: User's email address
    - **password**: User's password (minimum 8 characters)
    """
    user = AuthService.register_user(db, user_data)
    return success_response(
        data=user,
        message="User registered successfully"
    )


@router.post("/login", response_model=dict, status_code=status.HTTP_200_OK)
async def login(
    credentials: UserLogin,
    db: Session = Depends(get_db)
) -> dict:
    """
    Login user and return JWT token.
    
    - **email**: User's registered email
    - **password**: User's password
    """
    user = AuthService.login_user(db, credentials.email, credentials.password)
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = SecurityUtils.create_access_token(
        data={"sub": str(user.id), "email": user.email},
        expires_delta=access_token_expires
    )
    
    user_response = UserResponse.from_orm(user)
    
    token_data = {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_response
    }
    
    return success_response(
        data=token_data,
        message="Login successful"
    )


@router.post("/refresh", response_model=dict)
async def refresh_token(
    current_user: dict = Depends(SecurityUtils.decode_token)
) -> dict:
    """Refresh JWT token"""
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    new_token = SecurityUtils.create_access_token(
        data={"sub": current_user.get("sub"), "email": current_user.get("email")},
        expires_delta=access_token_expires
    )
    
    return success_response(
        data={"access_token": new_token, "token_type": "bearer"},
        message="Token refreshed successfully"
    )
