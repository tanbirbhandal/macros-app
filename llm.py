import os
from typing import Final
from groq import Groq

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

MODEL_NAME: Final[str] = "llama-3.1-8b-instant"
PROMPT: Final[str] = """You are a nutrition assistant. Given a meal description or menu item, 
estimate its macros.

            Your task:
            - Output EXACTLY one valid JSON object.
            - Include ONLY these keys: calories, protein, fat, carbs.
            - All values (macros) must be INTEGERS. No units, no extra text, no markdown, no commentary.
            - No labels outside the JSON object.
            - Do not use percentages or words like "grams" or "kcal".
            - If you see a range, use the midpoint. If you are unsure, make your best single estimate.
            - Example format: {"calories": 450, "protein": 35, "fat": 12, "carbs": 55}
            
            Meal Description or Menu item:\n
         """

def get_macros_from_text(ingredients: str) -> str:
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": PROMPT},
            {"role": "user", "content": f"Estimate macros for: {ingredients}"}
        ],
        model=MODEL_NAME,
        temperature=0.1,
        max_tokens=100,
    )

    response_text = chat_completion.choices[0].message.content.strip()
    print(f"[LLM] Groq response: {response_text}")
    return response_text