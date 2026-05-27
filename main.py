from fastapi import FastAPI, File, UploadFile, HTTPException
from typing import  Dict, Any
from typing_extensions import TypedDict
import json
from fastapi.middleware.cors import CORSMiddleware
from  pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

import llm, ocr

class TextRequest(BaseModel):
    text: str

class MacrosResponse(TypedDict):
    calories: int
    protein: int
    fat: int
    carbs: int

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    
    allow_credentials=True,
    
    allow_methods=["*"],
    
    allow_headers=["*"]
)

@app.get("/health")
def health_check() -> Dict[str, str]:
    return {"status": "ok"}

@app.post("/upload")
async def post_image(file: UploadFile = File(...)) -> MacrosResponse:
    
    # make the api request to open ai
    # get the macros for calories, protein, fat, carbs
    print(f"Received file: {file.filename}, type: {file.content_type}")
    
    contents: bytes = await file.read()
    print(f"File size: {len(contents)} bytes")
    
    # image bytes to text using ocr service 
    text: str = ocr.extract_text_from_bytes(contents, lang="eng")
    
    if not text.strip():
        raise HTTPException(status_code=422, detail="Unable to extract text from the image.")

    # call llm
    try:
        res_text: str = llm.get_macros_from_text(text)
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Error accessing LLM backend: {e}")
    
    # parse json
    try:
        res: Dict[str, Any] = json.loads(res_text)
    except json.JSONDecodeError:
        raise HTTPException(status_code=502, detail="LLM returned invalid output.")
    
    # macros keys and values 
    calories: int = int (res.get("calories", 0))
    protein: int = int (res.get("protein", 0))
    fat: int = int (res.get("fat", 0))
    carbs: int = int(res.get("carbs", 0))
    
    return MacrosResponse(
        calories=calories,
        protein=protein,
        fat=fat,
        carbs=carbs
    )

@app.post("/analyze-text")
async def analyze_text(body: TextRequest) -> MacrosResponse:
    if not body.text.strip():
        raise HTTPException(status_code=422, detail="No text provided.")

    # call llm
    try:
        res_text: str = llm.get_macros_from_text(body.text)
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Error accessing LLM backend: {e}")
    
    # parse json
    try:
        res: Dict[str, Any] = json.loads(res_text)
    except json.JSONDecodeError:
        raise HTTPException(status_code=502, detail="LLM returned invalid output.")
    
    # macros keys and values 
    calories: int = int (res.get("calories", 0))
    protein: int = int (res.get("protein", 0))
    fat: int = int (res.get("fat", 0))
    carbs: int = int(res.get("carbs", 0))
    
    return MacrosResponse(
        calories=calories,
        protein=protein,
        fat=fat,
        carbs=carbs
    )