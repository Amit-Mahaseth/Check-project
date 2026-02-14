import boto3
import json
from botocore.exceptions import ClientError, BotoCoreError
from app.core.config import settings
import logging
import asyncio

logger = logging.getLogger(__name__)

class BedrockService:
    def __init__(self):
        self.mock_mode = False
        
        # Check if keys are configured. If 'your_access_key' is still there, use mock mode.
        if settings.AWS_ACCESS_KEY_ID == "your_access_key" or not settings.AWS_ACCESS_KEY_ID:
            logger.warning("AWS Credentials not found. Switching to MOCK MODE.")
            self.mock_mode = True
            self.client = None
        else:
            try:
                self.client = boto3.client(
                    service_name='bedrock-runtime',
                    region_name=settings.AWS_REGION,
                    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
                )
                self.model_id = "anthropic.claude-3-5-sonnet-20241022-v2:0"
            except Exception as e:
                logger.error(f"Failed to init Bedrock client: {e}. Switching to MOCK MODE.")
                self.mock_mode = True

    async def invoke_claude(self, prompt: str, system_prompt: str = None, max_tokens: int = 4096, temperature: float = 0.5):
        """
        Invokes Claude 3.5 Sonnet on AWS Bedrock.
        """
        if self.mock_mode:
            logger.info("Using MOCK Bedrock response")
            await asyncio.sleep(1) # Simulate latency
            return self._get_mock_response(prompt)

        try:
            body = {
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": max_tokens,
                "temperature": temperature,
                "messages": [
                    {
                        "role": "user",
                        "content": [{"type": "text", "text": prompt}]
                    }
                ]
            }
            
            if system_prompt:
                body["system"] = [{"text": system_prompt}]

            # Wrap blocking call in executor
            loop = asyncio.get_event_loop()
            response = await loop.run_in_executor(
                None, 
                lambda: self.client.invoke_model(
                    modelId=self.model_id,
                    body=json.dumps(body)
                )
            )
            
            response_body = json.loads(response.get('body').read())
            return response_body['content'][0]['text']

        except (ClientError, BotoCoreError, Exception) as e:
            logger.error(f"Error invoking Bedrock: {e}")
            logger.info("Falling back to mock response due to error.")
            return self._get_mock_response(prompt)

    def _get_mock_response(self, prompt: str) -> str:
        """Simple mock responses for demo purposes when APIs fail"""
        prompt_lower = prompt.lower()
        
        # 1. Orchestrator Intent Classification
        if "classify the intent" in prompt_lower:
            # simple keyword matching for routing
            if "review" in prompt_lower or "pr" in prompt_lower or "diff" in prompt_lower:
                target = "review_monk"
            elif "explain" in prompt_lower or "learn" in prompt_lower or "concept" in prompt_lower:
                target = "codebase_sherpa"
            else:
                target = "general_chat"
                
            return json.dumps({
                "target_agent": target,
                "confidence": 0.99,
                "reasoning": "Mock mode classification"
            })

        # 2. Review Monk Agent
        if "review the following pull request" in prompt_lower or "analyze this diff" in prompt_lower:
            return json.dumps({
                "summary": "MOCK REVIEW: The code looks mostly good but lacks error handling.",
                "findings": [
                    {"severity": "HIGH", "file": "main.py", "line": 10, "issue": "Missing try/except block", "suggestion": "Add error handling", "code_fix": "try: ... except: ..."}
                ],
                "quality_score": 7,
                "security_risk": "Low"
            })
            
        # 3. Codebase Sherpa Agent
        if "explain the following code" in prompt_lower or "create a learning path" in prompt_lower:
            return json.dumps({
                "explanation": "MOCK EXPLANATION: This is a function that does X, Y, Z. It uses basic logic to achieve the result.",
                "learning_steps": ["Step 1: Understand the inputs", "Step 2: Process the data", "Step 3: Return result"],
                "key_concepts": [{"term": "Mock", "definition": "A fake simulation used for testing"}],
                "analogy": "This is like a spare tire when the main one is flat - it gets you moving but isn't the real thing."
            })

        # 4. General Chat / Fallback
        return f"Namaste! 🙏 I am in Demo Mode (AWS keys unavailable). You asked: '{prompt[:50]}...'"

bedrock_client = BedrockService()
