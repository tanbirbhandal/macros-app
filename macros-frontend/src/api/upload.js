/**
 * API helper module -- all HTTP calls from the React frontend to the FastAPI backend live here
 */

// read backend URL from Vite environment variable
// falls back to local dev URL if variable is not set
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// send an image file to the backend /upload endpoint
// arg: image file uploaded
// return: parsed json { calories, protein, fat, carbs }
export async function uploadMenuImage(file) {

    // handle edge case -- fail immediately if no file provided
    if (!file) throw new Error('No file provided');

    // FormData builds a multipart/form-data request body.
    // the key name  matches the FastAPI parameter name: `file: UploadFile = File(...)`
    const form = new FormData();
    form.append('file', file);

    // POST the image to the backend
    const res = await fetch(`${API_URL}/upload`, {
        method: 'POST', 
        body: form
    });

    // throw error if server returns status that is not 2xx
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
    }

    // parse and return json response { calories, protein, fat, carbs }
    return await res.json();
}

// send a text meal description to the backend /analyze-text endpoint
// arg: text meal description
// return: parsed json { calories, protein, fat, carbs }
export async function analyzeText(text) {

    // handle edge case -- fail immediately if no text provided
    if (!text) throw new Error('No text provided');

    // POST the text as json to the backend
    const res = await fetch(`${API_URL}/analyze-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });

    // throw error if server returns status that is not 2xx
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
    }

    // parse and return json response { calories, protein, fat, carbs }
    return await res.json();
}