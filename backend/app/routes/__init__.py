"""
Routes package.
Imports all route routers.
"""

from app.routes.auth_routes import router as auth_router
from app.routes.user_routes import router as user_router
from app.routes.agent_routes import router as agent_router
from app.routes.project_routes import router as project_router
from app.routes.chat_routes import router as chat_router

__all__ = [
    "auth_router",
    "user_router",
    "agent_router",
    "project_router",
    "chat_router"
]
