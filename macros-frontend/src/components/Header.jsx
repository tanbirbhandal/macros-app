import GymLogo from '../assets/GYM.png';
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
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={GymLogo} alt="GYM logo" width={100} height={100} />
        </Box>
        <Typography variant="h5" sx={{ color: 'black', fontWeight: 600 }}>
          Get Your Macros
        </Typography>
        <Box sx={{ minWidth: 120, textAlign: 'right' }}>
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