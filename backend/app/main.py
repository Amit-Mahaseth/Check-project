"""
CodeSherpa FastAPI Application - Main Entry Point.
Production-level backend with full REST API, WebSocket support, and AI orchestration.
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.database import init_db
from app.agents.orchestrator import OrchestratorAgent
from app.api.endpoints import github, whatsapp
from app.routes import (
    auth_router,
    user_router,
    agent_router,
    project_router,
    chat_router
)
from app.routes.response_model import success_response
import logging
import json

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("CodeSherpa")

# ===== APPLICATION SETUP =====

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Production-level SaaS backend for CodeSherpa",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc"
)

# ===== DATABASE INITIALIZATION =====

@app.on_event("startup")
async def startup_event():
    """Initialize database and services on startup"""
    try:
        init_db()
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Error initializing database: {str(e)}")
    
    # Initialize orchestrator
    global orchestrator
    orchestrator = OrchestratorAgent()
    logger.info("Orchestrator initialized")


# ===== CORS MIDDLEWARE =====

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

logger.info(f"CORS enabled for origins: {settings.CORS_ORIGINS}")


# ===== ORCHESTRATOR INSTANCE =====

orchestrator: OrchestratorAgent = None


# ===== HEALTH CHECK ENDPOINTS =====

@app.get("/health")
async def health_check() -> dict:
    """Health check endpoint"""
    return success_response(
        data={
            "status": "ok",
            "service": settings.PROJECT_NAME,
            "version": "1.0.0"
        },
        message="Service is healthy"
    )


@app.get("/")
async def root() -> dict:
    """Root endpoint"""
    return success_response(
        data={
            "service": settings.PROJECT_NAME,
            "version": "1.0.0",
            "docs": f"{settings.API_V1_STR}/docs"
        },
        message="Welcome to CodeSherpa Backend"
    )


# ===== INCLUDE ROUTERS =====

# Authentication & User Management
app.include_router(auth_router)
app.include_router(user_router)

# Core Resources
app.include_router(agent_router)
app.include_router(project_router)
app.include_router(chat_router)

# Legacy integrations
app.include_router(github.router, prefix="/api/github", tags=["github"])
app.include_router(whatsapp.router, prefix="/api/whatsapp", tags=["whatsapp"])


# ===== HTTP CHAT ENDPOINT =====

@app.post(f"{settings.API_V1_STR}/process")
async def process_chat_http(payload: dict) -> dict:
    """
    HTTP endpoint for chat processing.
    
    Payload:
    {
        "message": "User message",
        "session_id": "Session identifier",
        "code_context": "Optional code context"
    }
    """
    try:
        if not orchestrator:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Orchestrator not initialized"
            )
        
        session_id = payload.get("session_id", "default_session")
        response = await orchestrator.process(payload, session_id)
        
        return success_response(
            data=response,
            message="Chat processed successfully"
        )
        
    except Exception as e:
        logger.error(f"Chat processing error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error processing chat"
        )


# ===== WEBSOCKET CONNECTION MANAGER =====

class ConnectionManager:
    """Manages WebSocket connections"""
    
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        """Accept and track new connection"""
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"Client connected. Total connections: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        """Remove disconnected client"""
        self.active_connections.remove(websocket)
        logger.info(f"Client disconnected. Total connections: {len(self.active_connections)}")

    async def send_personal_message(self, message: str, websocket: WebSocket):
        """Send message to specific client"""
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        """Broadcast message to all connected clients"""
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception as e:
                logger.error(f"Error broadcasting to client: {str(e)}")


manager = ConnectionManager()


# ===== WEBSOCKET ENDPOINT =====

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for real-time chat.
    
    Expects JSON messages:
    {
        "message": "User message",
        "session_id": "Session identifier"
    }
    """
    await manager.connect(websocket)
    
    try:
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            
            try:
                payload = json.loads(data)
                session_id = payload.get("session_id", "ws_session")
                
                logger.info(f"Message received from {session_id}")
                
                # Send processing status
                await manager.send_personal_message(
                    json.dumps({
                        "type": "status",
                        "content": "thinking"
                    }),
                    websocket
                )
                
                # Process with Orchestrator
                if orchestrator:
                    response = await orchestrator.process(payload, session_id)
                    
                    # Send response
                    await manager.send_personal_message(
                        json.dumps({
                            "type": "response",
                            "content": response
                        }),
                        websocket
                    )
                else:
                    await manager.send_personal_message(
                        json.dumps({
                            "type": "error",
                            "content": "Orchestrator not initialized"
                        }),
                        websocket
                    )
                    
            except json.JSONDecodeError:
                await manager.send_personal_message(
                    json.dumps({
                        "type": "error",
                        "content": "Invalid JSON format"
                    }),
                    websocket
                )
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        logger.info("WebSocket disconnected")
        
    except Exception as e:
        logger.error(f"WebSocket error: {str(e)}")
        manager.disconnect(websocket)


# ===== ERROR HANDLERS =====

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """Handle general exceptions"""
    logger.error(f"Unhandled exception: {str(exc)}")
    return {
        "success": False,
        "data": None,
        "message": "Internal server error"
    }


# ===== APPLICATION INFO =====

if __name__ == "__main__":
    import uvicorn
    
    logger.info(f"Starting {settings.PROJECT_NAME} server...")
    logger.info(f"Database: {settings.DATABASE_URL}")
    logger.info(f"Debug mode: {settings.DEBUG}")
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level="info"
    )
        try:
            await manager.send_personal_message(json.dumps({"error": str(e)}), websocket)
        except:
            pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
