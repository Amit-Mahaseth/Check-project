from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "CodeSherpa"
    API_V1_STR: str = "/api/v1"
    
    # AWS Bedrock
    AWS_REGION: str = "us-east-1"
    AWS_ACCESS_KEY_ID: str | None = None
    AWS_SECRET_ACCESS_KEY: str | None = None
    
    # GitHub
    GITHUB_TOKEN: str | None = None
    GITHUB_WEBHOOK_SECRET: str | None = None
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # DynamoDB
    DYNAMODB_TABLE_NAME: str = "codesherpa_memory"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
