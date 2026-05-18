import { Box, TextField, IconButton, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {useRef, useState} from 'react';

export default function ChatInput({ onUpload, onTextSubmit, isLoading }) {
    const fileInputRef = useRef(null);
    const [text, setText] = useState('');

    function handleFileUpload(e) {
        const file = e.target.files[0];
        if (file) onUpload(file);
    }

    function handleTextSubmit() {
        if (!text.trim()) return;
        onTextSubmit(text);
        setText('');
    }

    function handleKeySubmit(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleTextSubmit();
        }
    }
    
    return (
        <Box sx={{
            position: 'fixed',
            bottom: 50,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '55%',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}>
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
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />
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
                <IconButton sx={{ color: '#555' }} onClick={() => fileInputRef.current.click()}>
                    <UploadFileIcon />
                </IconButton>
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