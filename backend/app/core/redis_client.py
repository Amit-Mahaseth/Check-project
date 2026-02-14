from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class MockRedis:
    def __init__(self):
        self.store = {}
        logger.warning("Using In-Memory Mock Redis (Redis connection failed or not configured)")

    async def set(self, key, value, ex=None):
        self.store[key] = value
        return True

    async def get(self, key):
        return self.store.get(key)
    
    async def close(self):
        pass

# Try to import redis, if fails or connection fails, use Mock
try:
    import redis.asyncio as redis
    # We create a client but don't connect yet. 
    # Connection errors usually happen on first command.
    # To be safe for this hackathon demo, we will wrap the client in a way that falls back.
    
    # Simple check:
    real_client = redis.from_url(settings.REDIS_URL, encoding="utf-8", decode_responses=True)
except Exception as e:
    logger.error(f"Redis import failed: {e}")
    real_client = None

class RobustRedisClient:
    def __init__(self):
        self.client = real_client
        self.mock = MockRedis()
        self.using_mock = False

    async def set(self, key, value, ex=None):
        if self.using_mock or not self.client:
            return await self.mock.set(key, value, ex)
        try:
            return await self.client.set(key, value, ex=ex)
        except Exception as e:
            logger.error(f"Redis set failed: {e}. Switching to Mock.")
            self.using_mock = True
            return await self.mock.set(key, value, ex)

    async def get(self, key):
        if self.using_mock or not self.client:
            return await self.mock.get(key)
        try:
            return await self.client.get(key)
        except Exception as e:
            logger.error(f"Redis get failed: {e}. Switching to Mock.")
            self.using_mock = True
            return await self.mock.get(key)

redis_client = RobustRedisClient()

async def get_redis_client():
    return redis_client
