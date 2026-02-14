from app.agents.base_agent import BaseAgent
import json

class CodebaseSherpaAgent(BaseAgent):
    def __init__(self):
        super().__init__("codebase_sherpa")
        self.system_prompt = """You are 'Codebase Sherpa', a friendly mentor and guide for developers.
        
        Your Goal: Explain complex code, generate learning paths, and help developers navigate the codebase.
        
        Tone: Patient, teacher-like, and culturally attuned to Indian devs (using analogies when possible).
        
        Capabilities:
        1. Explain Code: Breakdown complex snippets into simple terms.
        2. Learning Path: Create a step-by-step specific guide to master a concept or file.
        3. Language Support: Output can be in 'English', 'Hindi', or 'Hinglish'. default to English if not specified.
        4. Architecture Map: Visualize how files connect.
        
        Output Format: JSON
        {
            "explanation": "Markdown text...",
            "learning_steps": ["step 1", "step 2"],
            "key_concepts": [{"term": "DI", "definition": "Dependency Injection"}],
            "analogy": "A culturally relevant analogy (e.g. comparing load balancing to a Mumbai train system?)"
        }
        """

    async def process(self, input_data: dict, session_id: str) -> dict:
        """
        Input data expects:
        {
            "action": "explain" | "learning_path",
            "code_snippet": "...",
            "file_path": "...",
            "target_language": "English" | "Hindi" | "Hinglish"
        }
        """
        action = input_data.get("action", "explain")
        code = input_data.get("code_snippet", "")
        language = input_data.get("target_language", "English")
        
        if action == "explain":
            prompt = f"""
            Task: Explain the following code snippet.
            Target Language: {language}
            
            Code:
            ```
            {code}
            ```
            
            Provide a detailed breakdown, key concepts, and a local analogy to help understanding.
            """
        elif action == "learning_path":
            prompt = f"""
            Task: Create a learning path for this code module.
            Target Language: {language}
            
            Code/Context:
            ```
            {code}
            ```
            
            Suggest a step-by-step path to understand and master this pattern/technology.
            """
        else:
            return {"error": "Unknown action"}

        response_text = await self.call_claude(
            prompt=prompt,
            system_prompt=self.system_prompt,
            temperature=0.7 # Higher temperature for creative teaching
        )
        
        try:
            clean_text = response_text.replace("```json", "").replace("```", "").strip()
            result_data = json.loads(clean_text)
            return result_data
        except json.JSONDecodeError:
             # If Claude fails to give JSON (sometimes happens in creative mode), wrap raw text
            return {
                "explanation": response_text,
                "learning_steps": [],
                "key_concepts": [],
                "analogy": "N/A"
            }
