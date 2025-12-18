from typing import Final, Dict, Any
import requests

OLLAMA_URL: Final[str] = "http://localhost:11434/api/generate"
MODEL_NAME: Final[str] = "gemma2:2b"
PROMPT: Final[str] = """You are a nutrition assistant. Read the menu item text and estimate its macros.

            Your task:
            - Output EXACTLY one valid JSON object.
            - Include ONLY these keys: calories, protein, fat, carbs.
            - All values must be numbers (no units, no extra text).
            - Example format: {"calories": 450, "protein": 35, "fat": 12, "carbs": 55}
            - Macros must be INTEGERS.
            - No commentary, no labels outside the JSON object.
            - If you see a range, use the midpoint. If you are unsure, make your best single estimate.
            - Do not use percentages or words like "grams" or "kcal".
            
            Menu item:\n
         """

def get_macros_from_text(ingredients: str) -> str:
    
    prompt: str = PROMPT + ingredients
    
    body_parameters: Dict[str, Any] = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False,
    }
    
    response: requests.Response = requests.post(OLLAMA_URL, json=body_parameters)
    data: Dict[str, Any] = response.json()
    
    response_text: str = str(data["response"])
    
    print(response_text)
    print(type(response_text))
    
    return response_text