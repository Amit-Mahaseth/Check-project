import httpx
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

class GitHubService:
    def __init__(self):
        self.headers = {
            "Authorization": f"Bearer {settings.GITHUB_TOKEN}",
            "Accept": "application/vnd.github.v3.diff",
            "X-GitHub-Api-Version": "2022-11-28"
        }
        self.api_url = "https://api.github.com"

    async def get_pr_diff(self, repo_full_name: str, pr_number: int) -> str:
        """Fetching the raw diff of a Pull Request"""
        url = f"{self.api_url}/repos/{repo_full_name}/pulls/{pr_number}"
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(url, headers=self.headers)
                response.raise_for_status()
                return response.text
            except httpx.HTTPStatusError as e:
                logger.error(f"GitHub API Error: {e.response.text}")
                return None
            except Exception as e:
                logger.error(f"Error fetching PR diff: {e}")
                return None

    async def post_comment(self, repo_full_name: str, pr_number: int, body: str):
        """Posting a comment on the PR"""
        url = f"{self.api_url}/repos/{repo_full_name}/issues/{pr_number}/comments"
        
        # Override Accept header for JSON interactions
        json_headers = self.headers.copy()
        json_headers["Accept"] = "application/vnd.github.v3+json"
        
        async with httpx.AsyncClient() as client:
            try:
                await client.post(url, headers=json_headers, json={"body": body})
                return True
            except Exception as e:
                logger.error(f"Error posting comment: {e}")
                return False

github_service = GitHubService()
