from abc import ABC, abstractmethod
from app.services.bedrock_service import bedrock_client
from app.core.redis_client import redis_client
import json
import logging

logger = logging.getLogger(__name__)

class BaseAgent(ABC):
    def __init__(self, agent_name: str):
        self.agent_name = agent_name
        self.bedrock = bedrock_client
        self.redis = redis_client

    async def save_context(self, session_id: str, key: str, value: any, expire: int = 3600):
        """Saves context to Redis (Short-term memory)"""
        full_key = f"agent:{self.agent_name}:{session_id}:{key}"
        await self.redis.set(full_key, json.dumps(value), ex=expire)

    async def get_context(self, session_id: str, key: str):
        """Retrieves context from Redis"""
        full_key = f"agent:{self.agent_name}:{session_id}:{key}"
        data = await self.redis.get(full_key)
        return json.loads(data) if data else None

    async def call_claude(self, prompt: str, system_prompt: str = None, temperature: float = 0.5):
        """Wrapper to call Claude with agent-specific logging"""
        logger.info(f"Agent {self.agent_name} invoking Claude...")
        return await self.bedrock.invoke_claude(prompt, system_prompt, temperature=temperature)

    @abstractmethod
    async def process(self, input_data: dict, session_id: str) -> dict:
        """Main entry point for the agent"""
        pass
