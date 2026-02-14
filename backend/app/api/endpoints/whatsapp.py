from fastapi import APIRouter, Request, HTTPException
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# Verification token for WhatsApp Webhook setup (Meta requirement)
VERIFY_TOKEN = "codesherpa_secure_verify_token" 

@router.get("/webhook")
async def verify_webhook(request: Request):
    """WhatsApp verification challenge"""
    params = request.query_params
    mode = params.get("hub.mode")
    token = params.get("hub.verify_token")
    challenge = params.get("hub.challenge")

    if mode and token:
        if mode == "subscribe" and token == VERIFY_TOKEN:
            return int(challenge)
        else:
            raise HTTPException(status_code=403, detail="Verification failed")
    return {"status": "error", "message": "Missing parameters"}

@router.post("/webhook")
async def whatsapp_webhook(request: Request):
    """Receive messages from WhatsApp"""
    data = await request.json()
    
    # Extract message (simplified for demo)
    try:
        entry = data['entry'][0]
        changes = entry['changes'][0]
        value = changes['value']
        
        if 'messages' in value:
            message = value['messages'][0]
            from_number = message['from']
            msg_body = message['text']['body']
            
            logger.info(f"WhatsApp msg from {from_number}: {msg_body}")
            
            # Here we would route to Orchestrator -> Claude -> Send Reply
            # For now, we just log it as the integration stub
            
    except Exception as e:
        logger.error(f"Error parsing WhatsApp hook: {e}")

    return {"status": "received"}
