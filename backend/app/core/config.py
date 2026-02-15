"""
Application configuration using environment variables.
Production-level configuration management with security best practices.
"""

from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    """
    Application settings with validation and environment variable support.
    All defaults are development settings - override with environment variables in production.
    """
    
    # === Project Information ===
    PROJECT_NAME: str = "CodeSherpa"
    PROJECT_VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = False
    
    # === Database Configuration ===
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///./codesherpa.db"  # Development: SQLite, Production: PostgreSQL
    )
    
    # === JWT Configuration ===
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production-12345")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # === CORS Configuration ===
    CORS_ORIGINS: list = [
        "http://localhost:5173",
        "http://localhost:5174", 
        "http://localhost:3000",
        "http://127.0.0.1:5173"
    ]
    
    # === AWS Configuration ===
    AWS_REGION: str = os.getenv("AWS_REGION", "us-east-1")
    AWS_ACCESS_KEY_ID: Optional[str] = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY: Optional[str] = os.getenv("AWS_SECRET_ACCESS_KEY")
    
    # === GitHub Integration ===
    GITHUB_TOKEN: Optional[str] = os.getenv("GITHUB_TOKEN")
    GITHUB_WEBHOOK_SECRET: Optional[str] = os.getenv("GITHUB_WEBHOOK_SECRET")
    
    # === Redis Configuration ===
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
    # === DynamoDB Configuration ===
    DYNAMODB_TABLE_NAME: str = "codesherpa_memory"
    
    # === Email Configuration (Optional) ===
    SMTP_SERVER: Optional[str] = os.getenv("SMTP_SERVER")
    SMTP_PORT: Optional[int] = os.getenv("SMTP_PORT", type=int)
    SMTP_USER: Optional[str] = os.getenv("SMTP_USER")
    SMTP_PASSWORD: Optional[str] = os.getenv("SMTP_PASSWORD")
    
    class Config:
        case_sensitive = True
        env_file = ".env"


# Create singleton settings instance
settings = Settings()
