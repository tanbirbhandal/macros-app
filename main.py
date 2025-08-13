from typing import Union
from fastapi import FastAPI
import pytesseract
from PIL import Image
import io
import json

import llm

from fastapi import FastAPI, File, UploadFile

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/upload")
async def post_image(file: UploadFile = File(...)):
    
    # make the api request to open ai
    # get the macros for calories, protein, fat, carbs
    print(f"Received file: {file.filename}, type: {file.content_type}")
    contents = await file.read()
    print(f"File size: {len(contents)} bytes")
    
    img = Image.open(io.BytesIO(contents))

    # extract text from image
    text = pytesseract.image_to_string(img, lang="eng")
    
    # call llm
    res_text = llm.get_macros_from_text(text)
    
    try:
        res = json.loads(res_text)
    except json.JSONDecodeError:
        return -1
    
    calories = res.get("calories", 0)
    protein = res.get("protein", 0)
    fat = res.get("fat", 0)
    carbs = res.get("carbs", 0)
    
    return {
        "calories": calories,
        "protein": protein,
        "fat": fat,
        "carbs": carbs,
    }
