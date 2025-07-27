from typing import Union
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.post("/image")
def post_image():
    
    # how to use fast api to make post requests
    # how to send image data in post request
    # 
    
    # make api request to OCR service
    # get the extracted text from the image
    
    
    # make the api request to open ai
    # get the macros for calories, protein, fat, carbs
    
    return {"calories": 0, "protein": 0, "fat": 0, "carbs": 0}