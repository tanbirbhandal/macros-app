# llm.py -- Groq LLM integration
# sends meal descriptions to the Groq API and returns macro estimates as a JSON string
# used by: main.py in both /upload and /analyze-text endpoints

import os
from typing import Final
from groq import Groq

# initialize Groq client -- reads API key from environment variable set in .env
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# llm model to query for macro estimation
MODEL_NAME: Final[str] = "openai/gpt-oss-20b"

# system prompt sent to the llm prior to every request
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
            # system sets the llm's role and output format
            {"role": "system", "content": PROMPT},
            
            # user message contains meal info input from user
            {"role": "user", "content": f"Estimate macros for: {ingredients}"}
        ],
        model=MODEL_NAME,
        # low temperature ensures consistency of json format for each response
        temperature=0.1,
        #response's token limit, only need 30-40 tokens
        max_tokens=100,
    )

    # extract text from llm's response
    response_text = chat_completion.choices[0].message.content.strip()
    print(f"[LLM] Groq response: {response_text}")
    return response_text