"""
Standard response format for all API responses.
"""

from pydantic import BaseModel
from typing import Any, Optional, Generic, TypeVar

T = TypeVar('T')


class ApiResponse(BaseModel, Generic[T]):
    """
    Standard API response format.
    
    All endpoints return this format for consistency.
    """
    success: bool
    data: Optional[T] = None
    message: str = "Operation successful"
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": {},
                "message": "Operation successful"
            }
        }


def success_response(data: Any = None, message: str = "Operation successful") -> dict:
    """Create a success response"""
    return {
        "success": True,
        "data": data,
        "message": message
    }


def error_response(message: str, data: Any = None) -> dict:
    """Create an error response"""
    return {
        "success": False,
        "data": data,
        "message": message
    }
