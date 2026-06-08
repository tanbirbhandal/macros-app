// MealConsumed.jsx -- yes/no prompt shown after macro results are displayed
// yes: adds the meal's macros to the daily total via App.jsx
// no: discards the result without logging
// used by: PreviewArea.jsx

import { Box, Typography, Button } from '@mui/material';

export default function MealConsumed({ onYes, onNo }) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            p: 2,
        }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Did you consume this meal?
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>

                {/* triggers handleMealConsumed in App.jsx -- adds macros to daily total */}
                <Button
                    variant="contained"
                    onClick={onYes}
                    sx={{ backgroundColor: '1a1a1a', '&:hover': { backgroundColor: '#333' } }}
                >
                    Yes
                </Button>

                {/* triggers handleMealNotConsumed in App.jsx -- discards the result */}
                <Button
                    variant="outlined"
                    onClick={onNo}
                    sx={{ borderColor: '#1a1a1a', color: '#1a1a1a' }}
                >
                    No
                </Button>
            </Box>
        </Box>
    );
}