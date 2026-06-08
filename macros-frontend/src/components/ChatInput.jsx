// ChatInput.jsx -- fixed input bar at the bottom of the screen
// supports image upload via file picker and text entry via keyboard
// calls onUpload or onTextSubmit in App.jsx depending on input type
// used by: App.jsx

import { Box, TextField, IconButton, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {useRef, useState} from 'react';

export default function ChatInput({ onUpload, onTextSubmit, isLoading }) {
    // ref to the hidden file input element
    const fileInputRef = useRef(null);

    // controlled state for the text field
    const [text, setText] = useState('');

    // called when user selects a file -- passes the file up to App.jsx
    function handleFileUpload(e) {
        const file = e.target.files[0];
        if (file) onUpload(file);
    }

    // called when user clicks the send button or presses Enter
    function handleTextSubmit() {
        if (!text.trim()) return;
        onTextSubmit(text);
        setText('');
    }

    // submit on Enter key press
    function handleKeySubmit(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleTextSubmit();
        }
    }
    
    return (
        // fixed positioning keeps the input bar at the bottom of the viewport
        // responsive width and bottom spacing adjust for different screen sizes
        <Box sx={{
            position: 'fixed',
            bottom: { xs: 16, sm: 24, md: 50 },
            left: '50%',
            transform: 'translateX(-50%)',
            width: { xs: '92%', sm: '75%', md: '55%' },
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}>
            {/* uploading indicator shown above the input bar while API call is in progress */}
            {isLoading && (
              <Typography variant="body2" sx={{ color: 'gray', fontSize: '1rem', fontWeight: 500 }}>
                Uploading...
              </Typography>
            )}
            <Box sx={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                p: 1.5,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1,
            }}>
                {/* hidden file input */}
                <input
                    type="file"
                    // restrict to image files only
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />
                
                {/* text field for typing meal ingredients */}
                <TextField
                    fullWidth
                    multiline
                    maxRows={6}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeySubmit}
                    placeholder="Enter your meal's ingredients..."
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    sx={{
                        px: 1,
                        '& .MuiInput-underline:before': { display: 'none' },
                        '& .MuiInput-underline:after': { display: 'none' },
                    }}
                />

                {/* upload icon opens the file picker when clicked */}
                <IconButton sx={{ color: '#555' }} onClick={() => fileInputRef.current.click()}>
                    <UploadFileIcon />
                </IconButton>

                {/* send button submits the typed text */}
                <IconButton
                    onClick={(handleTextSubmit)}
                    sx={{
                        backgroundColor: '#1a1a1a',
                        color: 'white',
                        '&:hover': { backgroundColor: '#333' },
                    }}
                >
                    <ArrowUpwardIcon />
                </IconButton>
            </Box>
        </Box>
    );
}