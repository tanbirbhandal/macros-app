import { Box, Typography } from "@mui/material";
import MacrosCard from './MacrosCard';

export default function PreviewArea({ result, previewUrl }) {
    return (
        <Box sx={{
            border: '1px solid #ddd',
            borderRadius: 4,
            p: 2,
            mx: 2,
            mb: 2,
            minHeight: '700px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            <Box sx= {{
                borderRadius: 2,
                p: 2,
                flex: 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt="Uploaded preview"
                        style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }}
                    />
                ) : (
                    <Typography variant="body2" sx={{ color: 'gray '}}>
                        Image or text preview will appear here
                    </Typography>
                )}
            </Box>

            {result && <MacrosCard data={result} />}
        </Box>
    );
}