# CodeSherpa Backend - Production-Level Architecture

## Overview

This is a professional, production-ready FastAPI backend for the CodeSherpa SaaS platform. Built with enterprise-level architecture, security, and scalability in mind.

## 🏗 Project Structure

```
backend/
├── app/
│   ├── core/
│   │   ├── config.py          # Configuration management
│   │   └── security.py        # JWT & password hashing
│   │
│   ├── db/
│   │   ├── database.py        # Database setup & session management
│   │   └── base.py            # Base model class
│   │
│   ├── models/
│   │   ├── user.py            # User ORM model
│   │   ├── agent.py           # Agent ORM model
│   │   ├── project.py         # Project ORM model
│   │   └── chat.py            # Chat ORM model
│   │
│   ├── schemas/
│   │   ├── user_schema.py     # User Pydantic schemas
│   │   ├── agent_schema.py    # Agent Pydantic schemas
│   │   ├── project_schema.py  # Project Pydantic schemas
│   │   └── chat_schema.py     # Chat Pydantic schemas
│   │
│   ├── services/
│   │   ├── auth_service.py    # Authentication business logic
│   │   ├── agent_service.py   # Agent business logic
│   │   ├── project_service.py # Project business logic
│   │   └── chat_service.py    # Chat business logic
│   │
│   ├── routes/
│   │   ├── response_model.py  # Standard response format
│   │   ├── auth_routes.py     # Auth endpoints
│   │   ├── user_routes.py     # User endpoints
│   │   ├── agent_routes.py    # Agent endpoints
│   │   ├── project_routes.py  # Project endpoints
│   │   └── chat_routes.py     # Chat endpoints
│   │
│   ├── agents/                # AI orchestration (existing)
│   ├── api/                   # External integrations (GitHub, WhatsApp)
│   ├── services/              # Additional services (Bedrock, GitHub)
│   └── main.py                # FastAPI application entry point
│
├── .env                       # Development environment variables
├── .env.example               # Environment template
├── requirements.txt           # Python dependencies
└── Dockerfile                 # Container configuration
```

## 🚀 Features

### Authentication & Security
- ✅ JWT token-based authentication
- ✅ Bcrypt password hashing with configurable rounds
- ✅ Dependency injection for protected routes
- ✅ Token validation and refresh

### Database
- ✅ SQLAlchemy ORM for database abstraction
- ✅ Support for SQLite (development) and PostgreSQL (production)
- ✅ Relationship management between entities
- ✅ Automatic database initialization

### API Endpoints
- ✅ REST API with professional structure
- ✅ Consistent JSON response format
- ✅ Comprehensive error handling
- ✅ HTTP status codes best practices

### WebSocket Support
- ✅ Real-time chat functionality
- ✅ Connection management
- ✅ Bidirectional messaging
- ✅ Broadcasting capability

### AI Integration
- ✅ AWS Bedrock integration
- ✅ Multi-agent orchestration
- ✅ Chat history management
- ✅ Session-based conversations

## 🔐 API Endpoints

### Authentication

```
POST   /api/v1/auth/register      - Register new user
POST   /api/v1/auth/login         - Login and get JWT token
POST   /api/v1/auth/refresh       - Refresh token
```

### User Management

```
GET    /api/v1/user/me            - Get current user profile
PUT    /api/v1/user/me            - Update current user
```

### Agents

```
GET    /api/v1/agents             - List all agents
POST   /api/v1/agents             - Create new agent
PUT    /api/v1/agents/{id}        - Update agent
DELETE /api/v1/agents/{id}        - Delete agent
```

### Projects

```
GET    /api/v1/projects           - List all projects
POST   /api/v1/projects           - Create new project
PUT    /api/v1/projects/{id}      - Update project
DELETE /api/v1/projects/{id}      - Delete project
```

### Chat

```
GET    /api/v1/chat               - Get chat history
POST   /api/v1/chat               - Create chat message
GET    /api/v1/chat/{id}          - Get specific chat
```

### WebSocket

```
WS     /ws                        - Real-time chat connection
```

## 📋 Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "data": null,
  "message": "Error description"
}
```

## 🛠 Setup & Installation

### Prerequisites
- Python 3.9+
- PostgreSQL 12+ (for production)
- Redis (optional, for caching)
- AWS account (for Bedrock integration)

### Installation

1. **Clone and navigate to backend:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Setup environment variables:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. **Initialize database:**
```bash
# For development (creates SQLite)
python -c "from app.db.database import init_db; init_db()"
```

6. **Run development server:**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Access the application:
- API: http://localhost:8000
- Swagger Docs: http://localhost:8000/api/v1/docs
- ReDoc: http://localhost:8000/api/v1/redoc

## 🔧 Configuration

### Environment Variables

```env
# Application
DEBUG=true
SECRET_KEY=your-secret-key

# Database
DATABASE_URL=sqlite:///./codesherpa.db

# JWT
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
CORS_ORIGINS=http://localhost:5173

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
```

See `.env.example` for complete configuration options.

## 🔑 Authentication Usage

### Registration
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

Response includes JWT token:
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGc...",
    "token_type": "bearer",
    "user": { "id": 1, "email": "john@example.com", ... }
  }
}
```

### Using Authentication
Include token in Authorization header:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/v1/user/me
```

## 📊 Database Models

### User
```python
- id: int (Primary Key)
- name: str
- email: str (Unique)
- hashed_password: str
- is_active: bool
- created_at: datetime
```

### Agent
```python
- id: int (Primary Key)
- name: str
- description: str
- status: str (active, inactive, processing)
- user_id: int (Foreign Key)
- created_at: datetime
```

### Project
```python
- id: int (Primary Key)
- name: str
- description: str
- user_id: int (Foreign Key)
- created_at: datetime
```

### Chat
```python
- id: int (Primary Key)
- message: str
- response: str
- user_id: int (Foreign Key)
- created_at: datetime
```

## 🧪 Testing

Run tests:
```bash
pytest
```

Run tests with coverage:
```bash
pytest --cov=app
```

## 📦 Deployment

### Docker Deployment

Build image:
```bash
docker build -t codesherpa-backend .
```

Run container:
```bash
docker run -d \
  -p 8000:8000 \
  -e DATABASE_URL=postgresql://... \
  -e SECRET_KEY=... \
  codesherpa-backend
```

### Production Checklist

- [ ] Change `SECRET_KEY` to a strong, random value
- [ ] Set `DEBUG=false`
- [ ] Use PostgreSQL for database
- [ ] Configure CORS origins
- [ ] Setup SSL/HTTPS
- [ ] Configure AWS credentials
- [ ] Setup logging and monitoring
- [ ] Configure rate limiting
- [ ] Setup backup strategy
- [ ] Configure auto-scaling

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env` file
2. **Secret Key**: Change `SECRET_KEY` in production (use `openssl rand -hex 32`)
3. **CORS**: Restrict to specific frontend origins
4. **Passwords**: Always hashed with bcrypt (never plain text)
5. **Tokens**: Implement token rotation and refresh
6. **HTTPS**: Always use HTTPS in production
7. **Database**: Use strong credentials and connection encryption
8. **Validation**: Always validate input with Pydantic schemas

## 📝 API Documentation

Interactive documentation automatically available at:
- Swagger UI: `http://localhost:8000/api/v1/docs`
- ReDoc: `http://localhost:8000/api/v1/redoc`

## 🤝 Integration with Frontend

Frontend should:
1. Login to get JWT token
2. Include token in `Authorization: Bearer <token>` header
3. Handle 401 responses for token refresh
4. Use WebSocket `/ws` endpoint for real-time chat

## 🐛 Troubleshooting

### Database Connection Error
- Verify DATABASE_URL in `.env`
- Ensure PostgreSQL is running
- Check database credentials

### Authentication Errors
- Verify SECRET_KEY is same across instances
- Check token expiration
- Ensure CORS origins match frontend URL

### WebSocket Connection Issues
- Check CORS origins configuration
- Verify WebSocket endpoint is accessible
- Check browser console for errors

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/en/20/)
- [Pydantic Validation](https://docs.pydantic.dev/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

## 📄 License

Copyright © 2024 CodeSherpa. All rights reserved.

## 🙋 Support

For issues and questions:
1. Check this README
2. Review `.env.example` for configuration
3. Check FastAPI docs at `/api/v1/docs`
4. Review logs for detailed errors

---

**CodeSherpa Backend** - Production-Ready SaaS Backend Architecture v1.0.0
