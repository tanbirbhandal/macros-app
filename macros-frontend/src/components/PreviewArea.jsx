import { Box, Typography } from "@mui/material";
import MacrosCard from './MacrosCard';

export default function PreviewArea({ result }) {
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
                border: '1px dashed #aaa',
                borderRadius: 2,
                p: 2,
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                    Image or text preview will appear here
                </Typography>
            </Box>

            {result && <MacrosCard data={result} />}
        </Box>
    );
}