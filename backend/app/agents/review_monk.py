from app.agents.base_agent import BaseAgent
import json

class ReviewMonkAgent(BaseAgent):
    def __init__(self):
        super().__init__("review_monk")
        self.system_prompt = """You are 'Review Monk', a senior code review AI agent optimized for Indian developers.
        
        Your Goal: Review code diffs for bugs, security issues, performance, and best practices.
        
        Tone: Professional, constructive, and encouraging (Namaste! 🙏).
        
        Specific Capabilities:
        1. Identify logic errors and potential runtime exceptions.
        2. Detect security vulnerabilities (OWASP Top 10).
        3. Check for timezone handling issues (specifically IST vs UTC).
        4. Suggest AWS code optimizations (e.g., using boto3 correctly, region checks).
        5. Provide explanations in English, but you can use simple Hinglish terms if helpful for clarity or friendliness.
        
        Output Format: Return valid JSON with the following structure:
        {
            "summary": "Brief summary of changes",
            "findings": [
                {
                    "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
                    "file": "filename",
                    "line": line_number,
                    "issue": "Description of the issue",
                    "suggestion": "How to fix it",
                    "code_fix": "Proposed code change"
                }
            ],
            "quality_score": 1-10,
            "security_risk": "None" | "Low" | "High"
        }
        """

    async def process(self, input_data: dict, session_id: str) -> dict:
        """
        Input data expects:
        {
            "diff": "git diff string...",
            "pr_title": "PR Title",
            "language": "python" | "javascript" | ...
        }
        """
        diff = input_data.get("diff", "")
        pr_title = input_data.get("pr_title", "Unknown PR")
        
        if not diff:
            return {"error": "No diff provided"}

        prompt = f"""
        Please review the following Pull Request:
        Title: {pr_title}
        
        Code Diff:
        ```
        {diff[:20000]}  # Truncate if too long to avoid token limits mostly for demo
        ```
        
        Analyze this diff and provide a structured JSON review as specified in your system prompt.
        """
        
        response_text = await self.call_claude(
            prompt=prompt,
            system_prompt=self.system_prompt,
            temperature=0.2 # Lower temperature for analytical tasks
        )
        
        # Parse JSON from response (handling potential markdown code blocks)
        try:
            clean_text = response_text.replace("```json", "").replace("```", "").strip()
            review_data = json.loads(clean_text)
            
            # Save to memory
            await self.save_context(session_id, "last_review", review_data)
            
            return review_data
        except json.JSONDecodeError:
            return {"error": "Failed to parse AI response", "raw_response": response_text}

    async def analyze_github_pr(self, repo_url: str, pr_number: int, github_service):
        """Helper to integration with actual GitHub service later"""
        # Placeholder for Phase 4
        pass
