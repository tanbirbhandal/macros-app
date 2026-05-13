import { useState } from 'react';
import Header from './components/Header';
import { uploadMenuImage, analyzeText } from './api/upload.js';
import Box from '@mui/material/Box';
import DailyMacros from './components/DailyMacros';
import MacrosGoal from './components/MacrosGoal';
import PreviewArea from './components/PreviewArea';
import ChatInput from './components/ChatInput';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewText, setPreviewText] = useState(null);

  async function handleUpload(file) {
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    setIsLoading(true);
    setError('');
    setResult(null);
    
    try {
      const data = await uploadMenuImage(file);    // POST to FastAPI
      setResult(data);         // show result later 
    }
    catch (e) {
      setError(e.message || 'Image Upload Failed');
    }
    finally {
      setIsLoading(false);
    }
  }

  async function handleTextSubmit(text) {
    if (!text.trim()) return;
    setPreviewText(text);
    setPreviewUrl(null);
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await analyzeText(text);
      setResult(data);
    }
    catch (e) {
      setError(e.message || 'Text analysis failed');
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <>
    <Header />
      <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
        <DailyMacros />
        <MacrosGoal />
      </Box>
      <main style={{ paddingBottom: '100px' }}>
        <PreviewArea result={ result } previewUrl={previewUrl} previewText={previewText} />
        {error && <p style={{ marginTop:12, color: 'crimson' }}>Error: {error}</p>}
      </main>
      <ChatInput onUpload={handleUpload} onTextSubmit={handleTextSubmit} isLoading={isLoading} />
    </>
  );
}