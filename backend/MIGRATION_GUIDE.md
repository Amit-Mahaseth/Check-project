# Backend Refactoring - Migration Guide

## ✨ What's Changed

The backend has been refactored from a basic structure to a professional, production-level SaaS architecture following FastAPI best practices.

### Old vs New

| Aspect | Old | New |
|--------|-----|-----|
| **Structure** | Monolithic | Layered (Routes → Services → Models) |
| **Database** | None (demo only) | SQLAlchemy ORM with SQLite/PostgreSQL |
| **Authentication** | None | JWT with Bcrypt hashing |
| **API Format** | Inconsistent | Standard response format |
| **Database Models** | None | Full ORM models (User, Agent, Project, Chat) |
| **Validation** | None | Pydantic schemas on all endpoints |
| **CORS** | Allow all | Configurable with env variables |
| **Error Handling** | Basic | Proper HTTP status codes |
| **Documentation** | Minimal | Auto-generated Swagger/ReDoc |

---

## 🎯 Key Improvements

### 1. **Layered Architecture**
```
Routes → Services → Database Models
```

Each layer has a specific responsibility:
- **Routes**: HTTP handlers, validation
- **Services**: Business logic
- **Models**: Database schema

### 2. **Database Persistence**
`User`, `Agent`, `Project`, `Chat` models now store data in database:
- User login credentials
- Agent definitions
- Project metadata
- Chat history

### 3. **Secure Authentication**
- JWT tokens for stateless authentication
- Bcrypt password hashing
- Protected routes with dependency injection

### 4. **Professional API**
All responses follow consistent format:
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

### 5. **Configuration Management**
Environment variables via `.env` file:
```env
DEBUG=true
DATABASE_URL=sqlite:///./codesherpa.db
SECRET_KEY=dev-secret-key
```

### 6. **Documentation**
Auto-generated Swagger UI at `/api/v1/docs`

---

## 📋 Migration Checklist

- [x] ✅ Database setup with SQLAlchemy ORM
- [x] ✅ JWT authentication system
- [x] ✅ User model and registration/login
- [x] ✅ Agent/Project/Chat models with CRUD operations
- [x] ✅ Protected routes with authentication
- [x] ✅ Standard response format
- [x] ✅ CORS configuration
- [x] ✅ Environment variables
- [x] ✅ Comprehensive documentation
- [x] ✅ WebSocket support maintained
- [x] ✅ Integration with existing services

---

## 🔄 How to Use New Features

### Register & Login

```bash
# Register
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'

# Response includes user data

# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'

# Response includes:
# {
#   "access_token": "eyJhbGc...",
#   "token_type": "bearer",
#   "user": { "id": 1, "email": "john@example.com", ... }
# }
```

### Use Protected Routes

```bash
# All agent/project/chat endpoints require token

TOKEN="eyJhbGc..."  # From login response

# Get user profile
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/v1/user/me

# Create agent
curl -X POST http://localhost:8000/api/v1/agents \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Code Reviewer",
    "description": "Reviews code for quality"
  }'

# List agents
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/v1/agents

# Get chat history
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/v1/chat
```

---

## 📂 New File Structure

### Core Modules
```
app/core/
├── config.py       # Environment-based configuration
└── security.py     # JWT and password utilities
```

### Database
```
app/db/
├── database.py     # SQLAlchemy setup and session
└── base.py         # Base model class
```

### Data Models
```
app/models/
├── user.py         # User table schema
├── agent.py        # Agent table schema
├── project.py      # Project table schema
└── chat.py         # Chat message table schema
```

### API Contracts
```
app/schemas/
├── user_schema.py      # Register, Login, UserResponse
├── agent_schema.py     # AgentCreate, AgentUpdate, AgentResponse
├── project_schema.py   # ProjectCreate, ProjectUpdate, ProjectResponse
└── chat_schema.py      # ChatCreate, ChatResponse
```

### Business Logic
```
app/services/
├── auth_service.py     # register_user, login_user, get_user
├── agent_service.py    # create_agent, get_agents, update_agent, delete_agent
├── project_service.py  # create_project, get_projects, update_project, delete_project
└── chat_service.py     # create_chat, get_chat_history, update_chat_response
```

### HTTP Endpoints
```
app/routes/
├── auth_routes.py      # /api/v1/auth/*
├── user_routes.py      # /api/v1/user/*
├── agent_routes.py     # /api/v1/agents/*
├── project_routes.py   # /api/v1/projects/*
└── chat_routes.py      # /api/v1/chat/*
```

---

## 🔌 Existing Features Preserved

✅ **WebSocket Chat** - `/ws` endpoint still works  
✅ **AI Orchestration** - Bedrock integration maintained  
✅ **GitHub Integration** - `/api/github/*` endpoints available  
✅ **WhatsApp Integration** - `/api/whatsapp/*` endpoints available  
✅ **HTTP Chat Endpoint** - `/api/v1/process` available  

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Agents Table
```sql
CREATE TABLE agents (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    status VARCHAR(50) DEFAULT 'active',
    user_id INTEGER FOREIGN KEY REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Projects Table
```sql
CREATE TABLE projects (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    user_id INTEGER FOREIGN KEY REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Chats Table
```sql
CREATE TABLE chats (
    id INTEGER PRIMARY KEY,
    message TEXT NOT NULL,
    response TEXT,
    user_id INTEGER FOREIGN KEY REFERENCES users(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🛠 Adding New Features

### Add New Endpoint

**1. Create Schema** (`app/schemas/feature_schema.py`)
```python
from pydantic import BaseModel

class FeatureCreate(BaseModel):
    name: str
    description: str
```

**2. Create Model** (`app/models/feature.py`)
```python
from sqlalchemy import Column, String, Integer, ForeignKey
from app.db.database import Base

class Feature(Base):
    __tablename__ = "features"
    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    user_id = Column(Integer, ForeignKey("users.id"))
```

**3. Create Service** (`app/services/feature_service.py`)
```python
from app.models import Feature
from app.schemas.feature_schema import FeatureCreate

class FeatureService:
    @staticmethod
    def create_feature(db, feature_data: FeatureCreate, user_id: int):
        feature = Feature(**feature_data.dict(), user_id=user_id)
        db.add(feature)
        db.commit()
        return feature
```

**4. Create Routes** (`app/routes/feature_routes.py`)
```python
from fastapi import APIRouter, Depends
from app.routes.response_model import success_response
from app.core.security import get_current_user
from app.services.feature_service import FeatureService

router = APIRouter(prefix="/api/v1/features", tags=["features"])

@router.post("")
async def create_feature(feature_data: FeatureCreate, current_user=Depends(get_current_user), db=Depends(get_db)):
    user_id = current_user["user_id"]
    feature = FeatureService.create_feature(db, feature_data, user_id)
    return success_response(data=feature)
```

**5. Include Router** (`app/main.py`)
```python
from app.routes.feature_routes import router as feature_router
app.include_router(feature_router)
```

---

## 🔐 Security Considerations

### Password Hashing
Passwords are hashed with Bcrypt (12 rounds):
```python
hashed = SecurityUtils.hash_password("password123")
is_valid = SecurityUtils.verify_password("password123", hashed)
```

### JWT Tokens
Tokens expire after `ACCESS_TOKEN_EXPIRE_MINUTES` (default: 30):
```python
token = SecurityUtils.create_access_token({"sub": user_id})
payload = SecurityUtils.decode_token(token)
```

### Protected Routes
Use `get_current_user` dependency for protection:
```python
@router.get("/me")
async def get_profile(current_user = Depends(get_current_user)):
    # current_user["user_id"] is available
    pass
```

---

## 📌 Important Notes

1. **Database**: First run creates SQLite database at `./codesherpa.db`
2. **Secrets**: Change `SECRET_KEY` in `.env` for production
3. **CORS**: Set appropriate `CORS_ORIGINS` for your frontend
4. **Tokens**: Tokens don't persist - stateless by design
5. **Data**: All user data is stored in database, not memory

---

## ✅ Verification

After setup, verify everything works:

```bash
# 1. Check server is running
curl http://localhost:8000/health

# 2. Register user
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test1234"}'

# 3. Get token
TOKEN=$(curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test1234"}' | jq '.data.access_token')

# 4. Test protected route
curl -H "Authorization: Bearer $TOKEN" http://localhost:8000/api/v1/user/me

# 5. View documentation
# Open http://localhost:8000/api/v1/docs in browser
```

---

## 📖 Further Reading

- [BACKEND_SETUP.md](./BACKEND_SETUP.md) - Complete setup guide
- [QUICK_START.md](./QUICK_START.md) - Quick reference
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Guide](https://docs.sqlalchemy.org/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Backend Refactoring Complete!** 🎉

Your backend is now production-ready with professional architecture, security, and scalability.
