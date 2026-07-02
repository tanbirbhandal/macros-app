# Get Your Macros (GYM)

A full-stack nutrition tracking web app that estimates meal macros from a photo or text 
description using OCR and an LLM, then tracks daily intake against personal goals.

## Features

- Upload a meal photo or type ingredients to get macro estimates
- AI-powered macro analysis via Groq API (Llama 3.1)
- OCR via Tesseract to extract text from menu item photos
- Log consumed meals to your running daily macro total
- Set and track daily macro goals
- Auto-resets daily totals at midnight
- Fully responsive UI -- mobile, tablet, and desktop

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Material UI |
| Backend | FastAPI (Python) |
| OCR | Tesseract / pytesseract |
| LLM | Groq API (Llama 3.1 8B Instant) |
| Containerization | Docker |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

## Project Structure

```
macros-app/
├── main.py
├── llm.py
├── ocr.py
├── requirements.txt
├── Dockerfile
├── .env.example
└── macros-frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── api/upload.js
    │   └── components/
    │       ├── ChatInput.jsx
    │       ├── DailyMacros.jsx
    │       ├── Header.jsx
    │       ├── MacrosCard.jsx
    │       ├── MacrosGoal.jsx
    │       ├── MealConsumed.jsx
    │       └── PreviewArea.jsx
    └── .env.local
```

## Local Development

### Prerequisites
- Python 3.9.6
- Node.js 25.6.1
- Docker
- Groq API key

### Backend
```bash
cd macros-app
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# add your GROQ_API_KEY to .env
uvicorn main:app --reload
```
Backend runs at `https://macros-app.onrender.com`

### Frontend
```bash
cd macros-frontend
npm install
# create .env.local with: VITE_API_URL=http://localhost:8000
npm run dev
```
Frontend runs at `https://macros-app-steel.vercel.app`

### Docker (backend)
```bash
docker build -t macros-backend .
docker run -p 8000:8000 -e GROQ_API_KEY=your_key macros-backend
```

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `GROQ_API_KEY` | backend `.env` | Groq API key for LLM calls |
| `VITE_API_URL` | frontend `.env.local` | Backend URL the frontend calls |

## Deployment

- Backend → Render
- Frontend → Vercel
