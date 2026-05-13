import { Card, CardContent, Typography } from '@mui/material';

export default function DailyMacros() {
    return (
        <Card sx={{ width: '50%', borderRadius: 4, border: '1px solid #ddd' }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Daily Macros
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                    daily macros will appear here
                </Typography>
            </CardContent>
        </Card>
    );
}