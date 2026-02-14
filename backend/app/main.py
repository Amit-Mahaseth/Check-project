from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.agents.orchestrator import OrchestratorAgent
from app.api.endpoints import github, whatsapp
import logging

import json

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("CodeSherpa")

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Orchestrator
orchestrator = OrchestratorAgent()

# Include Routers
app.include_router(github.router, prefix="/api/github", tags=["github"])
app.include_router(whatsapp.router, prefix="/api/whatsapp", tags=["whatsapp"])

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "CodeSherpa Backend"}

@app.post("/api/chat")
async def chat_endpoint(payload: dict):
    """
    Standard HTTP endpoint for chat
    Payload: {"message": "...", "session_id": "...", "code_context": "..."}
    """
    try:
        session_id = payload.get("session_id", "default_session")
        response = await orchestrator.process(payload, session_id)
        return response
    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# WebSocket Connection Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Expecting JSON string
            try:
                payload = json.loads(data)
                session_id = payload.get("session_id", "ws_session")
                
                # Send "Processing..." status
                await manager.send_personal_message(json.dumps({"type": "status", "content": "thinking"}), websocket)
                
                # Process with Orchestrator
                response = await orchestrator.process(payload, session_id)
                
                # Send response
                await manager.send_personal_message(json.dumps({"type": "response", "content": response}), websocket)
                
            except json.JSONDecodeError:
                await manager.send_personal_message(json.dumps({"error": "Invalid JSON"}), websocket)
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        logger.error(f"WebSocket Error: {e}")
        try:
            await manager.send_personal_message(json.dumps({"error": str(e)}), websocket)
        except:
            pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
