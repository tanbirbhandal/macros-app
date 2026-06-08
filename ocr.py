# ocr.py -- Tesseract OCR service
# converts uploaded image bytes into a text string
# used by: main.py in the /upload endpoint before calling the LLM

import pytesseract
import io
from PIL import Image
from PIL.Image import Image as PILImage
from typing import Final

DEFAULT_LANG: Final[str] = "eng"

# convert raw image bytes into text using Tesseract OCR
# arg: image bytes and language for ocr
# return: extracted text as string, or empty string if extraction fails
def extract_text_from_bytes(image_bytes: bytes, lang: str = DEFAULT_LANG) -> str:
    try:
        # wrap raw bytes in a BytesIO buffer so PIL can read it like a file
        buffer: io.BytesIO = io.BytesIO(image_bytes)
        
        # open buffer as PIL image object
        image: PILImage = Image.open(buffer)
        
        # run Tesseract OCR on image -- return text as string
        text: str = pytesseract.image_to_string(image, lang=lang)
        return text
    except Exception as e:
        # log error and return empty string -- main.py handles empty text case
        print(f"[OCR] Error extracting text: {e}")
        return ""