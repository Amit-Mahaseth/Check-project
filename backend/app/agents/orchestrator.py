from app.agents.base_agent import BaseAgent
from app.agents.review_monk import ReviewMonkAgent
from app.agents.codebase_sherpa import CodebaseSherpaAgent
from app.core.demo_data import DEMO_PR_REVIEW, DEMO_HINDI_EXPLANATION
import json

class OrchestratorAgent(BaseAgent):
    def __init__(self):
        super().__init__("orchestrator")
        self.review_monk = ReviewMonkAgent()
        self.codebase_sherpa = CodebaseSherpaAgent()
        
        self.system_prompt = """You are the 'Orchestrator' of CodeSherpa.
        Your job is to classify user intent and route the request to the correct specialist agent.
        
        Available Agents:
        1. Review Monk: For code reviews, PR analysis, bug detection, checking diffs.
        2. Codebase Sherpa: For explaining code, learning concepts, documentation help, understanding files.
        
        Output JSON:
        {
            "target_agent": "review_monk" | "codebase_sherpa" | "general_chat",
            "confidence": 0.0-1.0,
            "reasoning": "why you chose this agent"
        }
        """

    async def process(self, input_data: dict, session_id: str) -> dict:
        user_message = input_data.get("message", "")
        
        # DEMO MODE CHECK
        if "demo" in user_message.lower():
            if "review" in user_message.lower():
                return DEMO_PR_REVIEW
            if "hindi" in user_message.lower() or "namaste" in user_message.lower():
                return DEMO_HINDI_EXPLANATION
        
        # 1. Intent Classification
        classification_prompt = f"User Message: '{user_message}'\n\nClassify the intent and choose the best agent."
        
        response_text = await self.call_claude(classification_prompt, self.system_prompt, temperature=0.1)
        
        try:
            intent_data = json.loads(response_text.replace("```json", "").replace("```", "").strip())
            target_agent = intent_data.get("target_agent")
            
            # 2. Routing
            if target_agent == "review_monk":
                # In a real scenario, we'd extract the diff or PR URL here. 
                # For now, we assume the input might contain code or we ask for it.
                # Passing raw message for now.
                return await self.review_monk.process(
                    {"diff": input_data.get("code_context", user_message), "pr_title": "User Query"},
                    session_id
                )
                
            elif target_agent == "codebase_sherpa":
                return await self.codebase_sherpa.process(
                    {
                        "action": "explain", 
                        "code_snippet": input_data.get("code_context", user_message),
                        "target_language": "English" # Default to English, can extract from message later
                    },
                    session_id
                )
            
            else:
                # General chat fallback
                return {"reply": f"I can help you with code reviews or learning. You said: {user_message}"}

        except Exception as e:
            return {"error": f"Orchestration failed: {str(e)}"}
