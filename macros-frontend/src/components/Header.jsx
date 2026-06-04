import GymLogo from '../assets/gym_full_logo.png'
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';

export default function Header() {
  const [now, setNow] = useState(new Date());

  useEffect (() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 1, borderRadius: 4 }}>
      <Toolbar sx={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <img src={GymLogo} alt="GYM logo" style={{ width: 'clamp(150px, 20vw, 300px)', height: 'auto' }} />
        </Box>
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