import GymLogo from '../assets/gym_full_logo.png'
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';

export default function Header() {
  // stores current Date object -- updates every second
  const [now, setNow] = useState(new Date());

  // starts 1-second interval when the app opens -- displays current time
  // returns cleanup function to stop the interval when the component unmounts
  useEffect (() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // formats date -- i.e. 'Sun, June 7'
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  // formats time -- i.e. '03:48 PM'
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    // sticky AppBar stays at top of viewport when user scrolls
    <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 1, borderRadius: 4 }}>

      {/* relative position on ToolBar makes it the anchor for absolutely positioned children */}
      <Toolbar sx={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>

        {/* absolutely centered logo -- left: 50% moves it to midpoint, 
        translateX(-50%) shifts it left by half its own width (corrects for logo width) */}
        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <img src={GymLogo} alt="GYM logo" style={{ width: 'clamp(150px, 20vw, 300px)', height: 'auto' }} />
        </Box>

        {/* date and time pinned to the left -- marginRight: auto pushes it to the far left */}
        <Box sx={{ minWidth: 120, textAlign: 'left', marginRight: 'auto' }}>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            {dateStr}
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            {timeStr}
          </Typography>
        </Box>

      </Toolbar>
    </AppBar>
  );
}