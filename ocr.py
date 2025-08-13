import pytesseract
from PIL import Image


# Load image
img = Image.open("./menutest1.jpg")

# Convert to text
text = pytesseract.image_to_string(img, lang="eng")

print(text)