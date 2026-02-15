# Backend Architecture - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Setup Environment
```bash
cp .env.example .env
# Edit .env if needed (defaults work for local development)
```

### 3. Run Server
```bash
uvicorn app.main:app --reload
```

Server running at `http://localhost:8000`

---

## 📍 Quick Test

### Test Health Endpoint
```bash
curl http://localhost:8000/health
```

### Register User
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the `access_token` from response.

### Get User Profile (Protected Route)
```bash
curl -H "Authorization: Bearer ACCESS_TOKEN" \
  http://localhost:8000/api/v1/user/me
```

Replace `ACCESS_TOKEN` with token from login response.

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────┐
│      Frontend (React + Vite)        │
└────────────────┬────────────────────┘
                 │ HTTP/WebSocket
                 ▼
┌─────────────────────────────────────┐
│     FastAPI Application             │
│  ├─ Routes (REST API)               │
│  ├─ WebSocket (Real-time chat)      │
│  └─ Middleware (CORS, Auth)         │
└────────────────┬────────────────────┘
                 │ SQLAlchemy ORM
                 ▼
┌─────────────────────────────────────┐
│      Database                       │
│  ├─ PostgreSQL (Production)         │
│  └─ SQLite (Development)            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      External Services              │
│  ├─ AWS Bedrock (AI)                │
│  ├─ GitHub (Integrations)           │
│  └─ Redis (Caching)                 │
└─────────────────────────────────────┘
```

---

## 📂 Directory Structure Explained

```
app/
├── core/              # Configuration & security utilities
│   ├── config.py      # Settings from environment variables
│   └── security.py    # JWT tokens & password hashing
│
├── db/                # Database setup
│   ├── database.py    # SQLAlchemy connection & session
│   └── base.py        # Base class for ORM models
│
├── models/            # SQLAlchemy ORM models (database schema)
│   ├── user.py        # Users table
│   ├── agent.py       # Agents table
│   ├── project.py     # Projects table
│   └── chat.py        # Chat messages table
│
├── schemas/           # Pydantic models (API validation)
│   ├── user_schema.py       # Request/response validation
│   ├── agent_schema.py      # Agent validation
│   ├── project_schema.py    # Project validation
│   └── chat_schema.py       # Chat validation
│
├── services/          # Business logic layer
│   ├── auth_service.py      # User auth operations
│   ├── agent_service.py     # Agent CRUD operations
│   ├── project_service.py   # Project CRUD operations
│   └── chat_service.py      # Chat operations
│
├── routes/            # API endpoint handlers
│   ├── auth_routes.py       # /api/v1/auth/*
│   ├── user_routes.py       # /api/v1/user/*
│   ├── agent_routes.py      # /api/v1/agents/*
│   ├── project_routes.py    # /api/v1/projects/*
│   ├── chat_routes.py       # /api/v1/chat/*
│   └── response_model.py    # Standard response format
│
└── main.py           # FastAPI application entry point
```

---

## 🔐 Security Features

✅ **JWT Authentication**: Token-based user authentication  
✅ **Password Hashing**: Bcrypt with 12 rounds  
✅ **Protected Routes**: Dependency injection for auth verification  
✅ **CORS**: Cross-origin requests from frontend  
✅ **Input Validation**: Pydantic schemas for all inputs  
✅ **Error Handling**: Proper HTTP status codes  

---

## 🎯 API v1 Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|-------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login user | No |
| POST | `/api/v1/auth/refresh` | Refresh token | Yes |
| GET | `/api/v1/user/me` | Get current user | Yes |
| PUT | `/api/v1/user/me` | Update user | Yes |
| GET | `/api/v1/agents` | List agents | Yes |
| POST | `/api/v1/agents` | Create agent | Yes |
| PUT | `/api/v1/agents/{id}` | Update agent | Yes |
| DELETE | `/api/v1/agents/{id}` | Delete agent | Yes |
| GET | `/api/v1/projects` | List projects | Yes |
| POST | `/api/v1/projects` | Create project | Yes |
| PUT | `/api/v1/projects/{id}` | Update project | Yes |
| DELETE | `/api/v1/projects/{id}` | Delete project | Yes |
| GET | `/api/v1/chat` | Chat history | Yes |
| POST | `/api/v1/chat` | Create message | Yes |
| GET | `/api/v1/chat/{id}` | Get message | Yes |
| WS | `/ws` | WebSocket chat | No |

---

## 🔄 Request Flow

```
1. Frontend sends HTTP/WebSocket request
   ↓
2. FastAPI receives and routes to handler
   ↓
3. Authentication middleware checks JWT token
   ↓
4. Route handler receives request
   ↓
5. Service layer processes business logic
   ↓
6. Database operations via SQLAlchemy ORM
   ↓
7. Response formatted to standard format
   ↓
8. Frontend receives JSON response
```

---

## 🌍 Database Relationships

```
┌─────────┐
│  User   │
└────┬────┘
     │ (1:N)
     ├──────────────────┬──────────────────┬──────────────────┐
     ▼                  ▼                  ▼                  ▼
┌────────┐        ┌─────────┐        ┌────────┐        ┌──────┐
│ Agent  │        │ Project │        │  Chat  │        │ Menu │
└────────┘        └─────────┘        └────────┘        └──────┘
```

Each user can have:
- Many agents
- Many projects
- Many chat messages

---

## 📖 Documentation URLs

- **Swagger UI**: http://localhost:8000/api/v1/docs
- **ReDoc**: http://localhost:8000/api/v1/redoc
- **OpenAPI JSON**: http://localhost:8000/api/v1/openapi.json

---

## 🔄 Development Workflow

```bash
# 1. Make changes to code
vim app/routes/auth_routes.py

# 2. Server auto-reloads (--reload flag)
# No need to restart!

# 3. Test in browser or with curl
curl http://localhost:8000/health

# 4. Check logs for errors
# Terminal shows detailed error info
```

---

## ⚙️ Common Tasks

### Add New Endpoint

1. Create schema in `schemas/`
2. Create service method in `services/`
3. Create route handler in `routes/`
4. Include router in `main.py`

### Add New Table

1. Create ORM model in `models/`
2. Create Pydantic schema in `schemas/`
3. Create service class in `services/`
4. Create routes in `routes/`

### Modify Database

1. Update ORM model in `models/`
2. Database auto-initializes with new schema
3. For migrations: use Alembic (setup guide in docs)

---

## 🧪 Testing

```bash
# Run all tests
pytest

# Run specific test file
pytest app/tests/test_auth.py

# Run with coverage
pytest --cov=app
```

---

## 📊 Response Format Examples

### Success
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Test Agent",
    "status": "active"
  },
  "message": "Agent created successfully"
}
```

### Error
```json
{
  "success": false,
  "data": null,
  "message": "Email already registered"
}
```

---

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 8000 already in use | `lsof -i :8000` then kill process |
| Module not found | Run `pip install -r requirements.txt` |
| Database error | Check `DATABASE_URL` in `.env` |
| Auth not working | Verify `SECRET_KEY` in `.env` |
| CORS error | Check `CORS_ORIGINS` in `.env` |

---

## 🔗 Frontend Integration

From React frontend:

```javascript
// Login
const response = await fetch('http://localhost:8000/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com', password: 'pass' })
});
const data = await response.json();
const token = data.data.access_token;

// Protected request
const userResponse = await fetch('http://localhost:8000/api/v1/user/me', {
  headers: { 'Authorization': `Bearer ${token}` }
});

// WebSocket
const ws = new WebSocket('ws://localhost:8000/ws');
ws.onmessage = (event) => {
  console.log(JSON.parse(event.data));
};
```

---

## 📚 Next Steps

1. ✅ [x] Review this document
2. ✅ [x] Start the server
3. ✅ [x] Test endpoints with curl
4. [ ] Read [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed docs
5. [ ] Review code comments for implementation details
6. [ ] Add custom business logic as needed

---

**Happy Coding!** 🎉

For detailed documentation, see [BACKEND_SETUP.md](./BACKEND_SETUP.md)
