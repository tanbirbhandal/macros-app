import { useState } from 'react';
import Header from './components/Header';
import Upload from './components/UploadButton';
import { uploadMenuImage } from './api/upload.js';
import MacrosCard from './components/MacrosCard';
import Box from '@mui/material/Box';
import DailyMacros from './components/DailyMacros';
import WaterCard from './components/WaterCard';
import MacrosGoal from './components/MacrosGoal';
import WaterGoal from './components/WaterGoal';

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
      setResult(data);         // show result later 
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
      <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
        <DailyMacros />
        <WaterCard />
        <MacrosGoal />
        <WaterGoal />
      </Box>
      {/* Main content area that pushes children toward the bottom */}
      <main>
        <Upload onClick={handleUpload} disabled={isLoading} />

        {isLoading && <p style={{ marginTop: 12 }}>Uploading...</p>}
        {error && <p style={{ marginTop:12, color: 'crimson' }}>Error: {error}</p>}

        {result && 
          <Box sx ={{ mt: 2 }}>
            <MacrosCard data={result} />
          </Box>
        }
      </main>
    </>
  );
}