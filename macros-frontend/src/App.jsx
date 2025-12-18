import { useState } from 'react';
import Header from './components/Header';
import Upload from './components/UploadButton';
import { uploadMenuImage } from './api/upload.js';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function handleUpload(file) {
    if (!file) return;
    setIsLoading(true);
    setError('');
    setResult(null);
    
    try {
      const data = await uploadMenuImage(file);    // POST to FastAPI
      setResult(data);         // show JSON later 
    }
    catch (e) {
      setError(e.message || 'Image Upload Failed');
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <>
    <Header />

      {/* Main content area that pushes children toward the bottom */}
      <main
        style={{
          // Make main roughly fill the viewport height minus the header.
          // Adjust 180px if your header becomes taller/shorter.
          minHeight: 'calc(100dvh - 180px)',

          // Use flexbox to place children
          display: 'flex',
          flexDirection: 'column',     // stack vertically
          justifyContent: 'flex-end',  // push content to the bottom
          alignItems: 'center',        // center horizontally
          padding: 24,                 // page padding
          paddingBottom: '10vh',
          fontFamily:
            'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
          textAlign: 'center',
        }}
      >
        <Upload onClick={handleUpload} disabled={isLoading} />

        {isLoading && <p style={{ marginTop: 12 }}>Uploading...</p>}
        {error && <p style={{ marginTop:12, color: 'crimson' }}>Error: {error}</p>}

        {result && (
          <div style={{ marginTop: 16 }}>
            <h2 style={{ fontSize: '1.1rem', margin: '0 0 8px 0' }}>Estimated Macros</h2>
            <pre
              style={{
                display: 'inline-block',
                textAlign: 'left',
                background: 'f8fafc',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                padding: '12px 16px',
                fontFamily:
                  'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
              }}
            >
{JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </>
  );
}