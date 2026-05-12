import GymLogo from '../assets/GYM.png';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 1, borderRadius: 4 }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={GymLogo} alt="GYM logo" width={100} height={100} />
        </Box>
        <Typography variant="h5" sx={{ color: 'black', fontWeight: 600 }}>
          Get Your Macros
        </Typography>
        <Box sx={{ minWidth: 60, textAlign: 'right' }}>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            Date & Time
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}