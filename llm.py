import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3.1:8b"
PROMPT = """You are a nutrition assistant. Read the menu item text and estimate its macros.

            Your task:
            - Output EXACTLY one valid JSON object.
            - Include ONLY these keys: calories, protein, fat, carbs.
            - All values must be numbers (no units, no extra text).
            - Example format: {"calories": 450, "protein": 35, "fat": 12, "carbs": 55}
            - No commentary, no labels outside the JSON object.
            - If you see a range, use the midpoint. If you are unsure, make your best single estimate.
            - Do not use percentages or words like "grams" or "kcal".
            
            Menu item:\n
         """


def get_macros_from_text(ingredients: str):
    
    prompt = PROMPT + ingredients
    
    body_parameters = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False
    }
    
    response = requests.post(OLLAMA_URL, json=body_parameters)
    print(response.json()["response"])
    print(type(response.json()["response"]))
    
    return response.json()["response"]