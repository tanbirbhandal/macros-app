# main.py -- FastAPI backend server
# exposes two endpoints: /upload (image) and /analyze-text (text)
# both endpoints run the input through the LLM and return macro estimates
# used by: the React frontend via fetch calls in upload.js

from fastapi import FastAPI, File, UploadFile, HTTPException
from typing import  Dict, Any
from typing_extensions import TypedDict
import json
from fastapi.middleware.cors import CORSMiddleware
from  pydantic import BaseModel
from dotenv import load_dotenv

# load environment variables from .env into os.environ
load_dotenv()

import llm, ocr

# request body model for /analyze-text endpoint
class TextRequest(BaseModel):
    text: str

# response shape returned by both /upload and /analyze-text endpoints
class MacrosResponse(TypedDict):
    calories: int
    protein: int
    fat: int
    carbs: int

app = FastAPI()

# CORS middleware -- allows the React frontend to make requests to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # local Vite dev server
        "http://localhost:5173",
        
        # alternate local address
        "http://127.0.0.1:5173",
        
        # TODO: add deployed Vercel URL here after frontend deployment
    ],
    
    allow_credentials=True,
    
    allow_methods=["*"],
    
    allow_headers=["*"]
)

# health check endpoint -- used by AWS EC2 to verify the server is running
@app.get("/health")
def health_check() -> Dict[str, str]:
    return {"status": "ok"}

# accept an uploaded image, extract text via ocr, estimate macros via llm
# arg: image file uploaded via multipart/form-data
# return: macros response with calories, protein, fat, carbs as integers
@app.post("/upload")
async def post_image(file: UploadFile = File(...)) -> MacrosResponse:
    
    print(f"Received file: {file.filename}, type: {file.content_type}")
    
    # read all bytes from uploaded file into memory
    contents: bytes = await file.read()
    print(f"File size: {len(contents)} bytes")
    
    # convert image bytes to text using ocr
    text: str = ocr.extract_text_from_bytes(contents, lang="eng")
    
    # handle edge case if nothing is returned
    if not text.strip():
        raise HTTPException(status_code=422, detail="Unable to extract text from the image.")

    # send ocr text to llm to estimate macros
    try:
        res_text: str = llm.get_macros_from_text(text)
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Error accessing LLM backend: {e}")
    
    # parse llm's json response string into a python dict
    try:
        res: Dict[str, Any] = json.loads(res_text)
    except json.JSONDecodeError:
        raise HTTPException(status_code=502, detail="LLM returned invalid output.")
    
    # extract individual macro value -- default to 0 if key is missing
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
    
# accept text description of meal and estimate macros via llm
# arg: json body with a 'text' field containing the meal description
# return: macros response with calories, protein, fat, carbs as integers
@app.post("/analyze-text")
async def analyze_text(body: TextRequest) -> MacrosResponse:
    if not body.text.strip():
        raise HTTPException(status_code=422, detail="No text provided.")
    
    # send meal description to llm
    try:
        res_text: str = llm.get_macros_from_text(body.text)
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Error accessing LLM backend: {e}")
    
    # parse llm's json response string into a python dict
    try:
        res: Dict[str, Any] = json.loads(res_text)
    except json.JSONDecodeError:
        raise HTTPException(status_code=502, detail="LLM returned invalid output.")
    
    # extract individual macro value -- default to 0 if key is missing
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