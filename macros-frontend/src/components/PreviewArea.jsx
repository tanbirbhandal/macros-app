// PreviewArea.jsx -- main content area between the header cards and the chat input
// shows uploaded image preview, typed text preview, or a placeholder
// renders MacrosCard and MealConsumed after analysis completes
// used by: App.jsx

import { Box, Typography } from "@mui/material";
import MacrosCard from './MacrosCard';
import MealConsumed from './MealConsumed';

export default function PreviewArea({ result, previewUrl, previewText, onMealConsumed, onMealNotConsumed }) {
    return (
        <Box sx={{
            border: '1px solid #ddd',
            borderRadius: 4,
            p: 2,
            mx: 2,
            mb: 2,
            // scales with screen height
            minHeight: { xs: '300px', sm: '350px', md: '45vh' },
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            {/* preview section shows uploaded image, typed text, or placeholder */}
            <Box sx= {{
                borderRadius: 2,
                p: 2,
                flex: 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {previewUrl ? (
                    // shows the uploaded image using the local object URL
                    <img
                        src={previewUrl}
                        alt="Uploaded preview"
                        style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }}
                    />
                ) : previewText ? (
                    // displays the text entered -- typed meal description
                    <Typography variant="body1" sx={{ textAlign: 'center', color: '#333' }}>
                        {previewText}
                    </Typography>
                ) : (
                    // shows placeholder prompt
                    <Typography variant="body2" sx={{ color: 'gray'}}>
                        Image or text preview will appear here
                    </Typography>
                )}
            </Box>

            {/* only renders macro results and consumed prompt after analysis completes */}
            {result && <MacrosCard data={result} />}
            {result && <MealConsumed onYes={onMealConsumed} onNo={onMealNotConsumed} />}
        </Box>
    );
}