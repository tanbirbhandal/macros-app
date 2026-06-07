import { useState, useEffect } from 'react';
import Header from './components/Header';
import { uploadMenuImage, analyzeText } from './api/upload.js';
import Box from '@mui/material/Box';
import DailyMacros from './components/DailyMacros';
import MacrosGoal from './components/MacrosGoal';
import PreviewArea from './components/PreviewArea';
import ChatInput from './components/ChatInput';

// localStorage key used to track the last active date for midnight reset logic
const STORAGE_KEY = 'lastActiveDate';

// default empty macro state -- used on fresh load and after midnight reset
const EMPTY_MACROS = { calories: 0, protein: 0, fat: 0, carbs: 0 };

export default function App() {
  // true while API call is in progress
  const [isLoading, setIsLoading] = useState(false);

  // macro result from last API call
  const [result, setResult] = useState(null);

  // error message to display if API fails
  const [error, setError] = useState('');

  // object URL for uploaded image preview
  const [previewUrl, setPreviewUrl] = useState(null);

  // text entered by user for preview
  const [previewText, setPreviewText] = useState(null);

  // daily macro totals
  const [dailyMacros, setDailyMacros] = useState(EMPTY_MACROS);

  // daily macro goals
  const [macrosGoal, setMacrosGoal] = useState(EMPTY_MACROS);

  // returns today's date ('YYYY-MM-DD') as a string for localStorage comparison
  function getCurrDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // compares today's date to the last stored date in localStorage
  // if they differ, reset daily macros and update stored date
  function checkAndResetDay() {
    const storedDate = localStorage.getItem(STORAGE_KEY);
    const currDate = getCurrDate();

    if (storedDate !== currDate) {
      setDailyMacros(EMPTY_MACROS);
      localStorage.setItem(STORAGE_KEY, currDate);
    }
  }

  // on first render, check if the day has changed since the last session
  useEffect(() => {
    checkAndResetDay();

  }, []);

  // checks every 60 seconds if new day has begun while the app is open
  // returns cleanup function to stop the interval when the component unmounts
  useEffect(() => {
    const timer = setInterval(checkAndResetDay, 60000);

    return () => clearInterval(timer);
  }, []);

  // creates a local preview URL, sends the image to backend
  async function handleUpload(file) {
    if (!file) return;

    // create a local URL to display the image immediately
    setPreviewUrl(URL.createObjectURL(file));
    setIsLoading(true);
    setError('');
    setResult(null);
    
    try {
      // POST image to FastAPI /upload
      const data = await uploadMenuImage(file);

      // store macro result to display in PreviewArea
      setResult(data);
    }
    catch (e) {
      setError(e.message || 'Image Upload Failed');
    }
    finally {
      setIsLoading(false);
    }
  }

  // sends the text to backend
  async function handleTextSubmit(text) {
    if (!text.trim()) return;

    // display the typed text in the preview area
    setPreviewText(text);

    // clear any previous image preview
    setPreviewUrl(null);

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      // POST text to FastAPI /analyze-text
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
    // adds the current meal's macros to the daily total
    setDailyMacros(prev => ({
      calories: prev.calories + result.calories,
      protein: prev.protein + result.protein,
      fat: prev.fat + result.fat,
      carbs: prev.carbs + result.carbs,
    }));
    setResult(null);
  }
  
  // discards the result without updating daily totals
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