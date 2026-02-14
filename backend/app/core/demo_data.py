from datetime import datetime

DEMO_PR_REVIEW = {
    "summary": "This PR refactors the authentication logic but introduces a potential security risk in token validation.",
    "findings": [
        {
            "severity": "CRITICAL",
            "file": "auth/token.py",
            "line": 45,
            "issue": "Hardcoded secret key in token validation",
            "suggestion": "Use environment variables for secrets",
            "code_fix": "secret = os.getenv('JWT_SECRET')"
        },
        {
            "severity": "MEDIUM",
            "file": "utils/date.py",
            "line": 12,
            "issue": "Date handling is not timezone aware (IST issue)",
            "suggestion": "Use pytz to handle Asia/Kolkata timezone explicitly",
            "code_fix": "datetime.now(pytz.timezone('Asia/Kolkata'))"
        }
    ],
    "quality_score": 6,
    "security_risk": "High"
}

DEMO_HINDI_EXPLANATION = {
    "explanation": "नमस्ते! 🙏 इस कोड में हम React `useEffect` हुक का उपयोग कर रहे हैं। यह तब चलता है जब component लोड होता है।",
    "learning_steps": [
        "Step 1: Understand Component Lifecycle",
        "Step 2: Learn Dependency Array []",
        "Step 3: Cleanup functions"
    ],
    "key_concepts": [
        {"term": "Hook", "definition": "A function that lets you hook into React state"},
        {"term": "Side Effect", "definition": "Operations like fetching data"}
    ],
    "analogy": "Sochna jaise ghar mein bijli aati hai (Mounting), aur jab jaati hai (Unmounting). useEffect switch ki tarah kaam karta hai."
}
