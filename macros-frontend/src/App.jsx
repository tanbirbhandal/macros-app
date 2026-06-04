import { useState, useEffect } from 'react';
import Header from './components/Header';
import { uploadMenuImage, analyzeText } from './api/upload.js';
import Box from '@mui/material/Box';
import DailyMacros from './components/DailyMacros';
import MacrosGoal from './components/MacrosGoal';
import PreviewArea from './components/PreviewArea';
import ChatInput from './components/ChatInput';

const STORAGE_KEY = 'lastActiveDate';
const EMPTY_MACROS = { calories: 0, protein: 0, fat: 0, carbs: 0 };

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewText, setPreviewText] = useState(null);
  const [dailyMacros, setDailyMacros] = useState(EMPTY_MACROS);
  const [macrosGoal, setMacrosGoal] = useState(EMPTY_MACROS);

  // return string value of current date
  function getCurrDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // check and reset if new day
  function checkAndResetDay() {
    const storedDate = localStorage.getItem(STORAGE_KEY);
    const currDate = getCurrDate();

    if (storedDate !== currDate) {
      setDailyMacros(EMPTY_MACROS);
      localStorage.setItem(STORAGE_KEY, currDate);
    }
  }

  // runs once on mount, resets day if needed
  useEffect(() => {
    checkAndResetDay();

  }, []);

  // runs once on mount, checks if new day every minute -- resets if new day
  useEffect(() => {
    const timer = setInterval(checkAndResetDay, 60000);

    // stops timer when app unmounts
    return () => clearInterval(timer);
  }, []);

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

  function handleMealConsumed() {
    setDailyMacros(prev => ({
      calories: prev.calories + result.calories,
      protein: prev.protein + result.protein,
      fat: prev.fat + result.fat,
      carbs: prev.carbs + result.carbs,
    }));
    setResult(null);
  }

  function handleMealNotConsumed() {
    setResult(null);
  }

  function handleSaveGoal(goal) {
    setMacrosGoal(goal);
  }

  return (
    <>
    <Header />
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1.5, p: { xs: 2, md: 1 } }}>
        <DailyMacros dailyMacros={dailyMacros}/>
        <MacrosGoal macrosGoal={macrosGoal} onSaveGoal={handleSaveGoal} />
      </Box>
      <main style={{ paddingBottom: '80px' }}>
        <PreviewArea
        result={result}
        previewUrl={previewUrl}
        previewText={previewText}
        onMealConsumed={handleMealConsumed}
        onMealNotConsumed={handleMealNotConsumed}
        />
        {error && <p style={{ marginTop:12, color: 'crimson' }}>Error: {error}</p>}
      </main>
      <ChatInput onUpload={handleUpload} onTextSubmit={handleTextSubmit} isLoading={isLoading} />
    </>
  );
}