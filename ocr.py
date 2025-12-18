import pytesseract
import io
from PIL import Image
from PIL.Image import Image as PILImage
from typing import Final

DEFAULT_LANG: Final[str] = "eng"

# convert raw image bytes into text using OCR service 
def extract_text_from_bytes(image_bytes: bytes, lang: str = DEFAULT_LANG) -> str:
    try:
        buffer: io.BytesIO = io.BytesIO(image_bytes)
        image: PILImage = Image.open(buffer)
        
        # extract text from image
        text: str = pytesseract.image_to_string(image, lang=lang)
        return text
    except Exception as e:
        print(f"[OCR] Error extracting text: {e}")
        return ""