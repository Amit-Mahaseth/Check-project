"""
User routes for profile management.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.user_schema import UserResponse, UserUpdate
from app.core.security import get_current_user
from app.services.auth_service import AuthService
from app.routes.response_model import success_response

router = APIRouter(
    prefix="/api/v1/user",
    tags=["user"]
)


@router.get("/me", response_model=dict)
async def get_current_user_info(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> dict:
    """
    Get current authenticated user's information.
    Requires JWT token in Authorization header.
    """
    user_id = current_user.get("user_id")
    user = AuthService.get_user_by_id(db, user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return success_response(
        data=UserResponse.from_orm(user),
        message="User information retrieved"
    )


@router.put("/me", response_model=dict)
async def update_user_info(
    user_update: UserUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> dict:
    """
    Update current user's information.
    """
    user_id = current_user.get("user_id")
    user = AuthService.get_user_by_id(db, user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update fields
    if user_update.name:
        user.name = user_update.name
    if user_update.email:
        user.email = user_update.email
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return success_response(
        data=UserResponse.from_orm(user),
        message="User information updated successfully"
    )
