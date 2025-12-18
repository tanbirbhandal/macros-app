/* 
* 'upload.js' -- API helper that React code can call to upload file to FastAPI 
*/

// pull backend base URL from 'env.local' -- if it's missing, then fallback to manually typed URL 
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';


/* 
* upload one image file to FastAPI /upload endpoint 
* return parsed JSON { calories, protein, fat, carbs }
*/
export async function uploadMenuImage(file) {

    // if nothing provided -- fail early
    if (!file) throw new Error('No file provided');

    // FormData builds a multipart/form-data request body.
    // The key name MUST match your FastAPI parameter name: `file: UploadFile = File(...)`
    const form = new FormData();
    form.append('file', file);

    // send the POST to FastAPI 
    const res = await fetch(`${API_URL}/upload`, {
        method: 'POST', 
        body: form
    });

    // if server responds with error
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
    }

    // FastAPI returns JSON --  parse and hand it back to the caller
    return await res.json();
}