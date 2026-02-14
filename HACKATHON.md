# CodeSherpa - Hackathon Submission 🇮🇳

## Project: CodeSherpa (Track: Developer Productivity)
**A Multi-Agent AI Platform for Indian Developers**

### 🚀 Elevator Pitch
CodeSherpa handles the boring parts of coding so developers can focus on building. It features specialized AI agents designed for the Indian context (Hindi support, WhatsApp integration, and cost optimization).

### 🏗️ Architecture
- **Orchestrator Agent**: Routes tasks to specialists.
- **Review Monk**: Code Review Agent (GitHub Integration).
- **Codebase Sherpa**: Learning Agent (Hindi/English).
- **Tech Stack**: Python FastAPI, React, AWS Bedrock (Claude 3.5 Sonnet), Redis, Docker.

### 🌟 Key Differentiators
1.  **Multilingual Support**: Explains complex code in Hindi/Hinglish.
2.  **WhatsApp Integration**: Code on the go (Mobile-first for India).
3.  **Context Aware**: Knows about Indian timezones (IST) and AWS Asia-Pacific regions.

### 🛠️ Setup Instructions

**Prerequisites**: Docker & Docker Compose

1.  **Clone the Repo**
    ```bash
    git clone https://github.com/yourusername/codesherpa.git
    cd codesherpa
    ```

2.  **Configure Environment**
    ```bash
    cp backend/.env.example backend/.env
    # Add your AWS_ACCESS_KEY and GITHUB_TOKEN in backend/.env
    ```

3.  **Run with Docker**
    ```bash
    docker-compose up --build
    ```
    - Frontend: `http://localhost:3000`
    - Backend: `http://localhost:8000`

### 📱 Demo Walkthrough
1.  Open Frontend.
2.  Type **"Namaste demo"** to see Hindi explanation mode.
3.  Type **"Review demo"** to see a sample PR analysis.
4.  (Optional) Send a GitHub Webhook to `http://localhost:8000/api/github/webhook`.

### 🔮 Future Roadmap
- Voice interaction via AWS Polly.
- IDE Extension (VS Code).
- Jira Integration for project management.
