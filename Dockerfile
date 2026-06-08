# Dockerfile -- defines the backend container for deployment
# installs Tesseract OCR at the OS level (required by pytesseract)
# installs Python dependencies and copies source files
# runs the FastAPI server on port 8000
# used by: Railway for backend deployment

# base image -- Python 3.11, slim keeps the container size small
FROM python:3.11-slim

# install Tesseract OCR and required system libraries
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-eng \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    # clean up installer cache to keep image size small
    && rm -rf /var/lib/apt/lists/*

# set working directory inside the container
WORKDIR /app

# copy requirements before source code -- Docker caches this layer
# skips pip install on rebuild if only source code changed
COPY requirements.txt .

# install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# copy source files into the container
COPY main.py llm.py ocr.py ./

#port the app listens on
EXPOSE 8000

# start the FastAPI server -- 0.0.0.0 accepts connections from outside the container
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]