"""
Database configuration and session management.
Production-level database setup with SQLAlchemy ORM.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

# Determine if we're using SQLite for development or PostgreSQL for production
DATABASE_URL = settings.DATABASE_URL
SQLALCHEMY_KWARGS = {}

# SQLite requires check_same_thread=False
if "sqlite" in DATABASE_URL:
    SQLALCHEMY_KWARGS = {"connect_args": {"check_same_thread": False}}

# Create database engine
engine = create_engine(
    DATABASE_URL,
    echo=settings.DEBUG,  # Print SQL queries in debug mode
    **SQLALCHEMY_KWARGS
)

# Create session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for all models
Base = declarative_base()


def get_db() -> Session:
    """
    Dependency for getting database session.
    Ensures session is properly closed after request.
    
    Yields:
        SQLAlchemy Session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Initialize database by creating all tables"""
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Error initializing database: {str(e)}")
        raise


# Export for use in other modules
__all__ = [
    "engine",
    "SessionLocal",
    "Base",
    "get_db",
    "init_db"
]
