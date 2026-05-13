import { Box, TextField, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function ChatInput() {
    return (
        <Box sx={{
            position: 'fixed',
            bottom: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '55%',
            backgroundColor: 'white',
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            p: 1.5,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            zIndex: 100,
        }}>
            <TextField
                fullWidth
                multiline
                maxRows={6}
                placeholder="Enter your meal's ingredients..."
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{
                    px: 1,
                    '& .MuiInput-underline:before': { display: 'none' },
                    '& .MuiInput-underline:after': { display: 'none' },
                  }}
            />
            <IconButton sx={{ color: '#555' }}>
                <PhotoCameraIcon />
            </IconButton>
            <IconButton sx={{ color: '#555' }}>
                <UploadFileIcon />
            </IconButton>
        </Box>
    );
}