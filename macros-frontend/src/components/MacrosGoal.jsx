import { Card, CardContent, Typography } from '@mui/material';

export default function MacrosGoal() {
    return (
        <Card sx={{ width: '50%', borderRadius: 4, border: '1 px solid #ddd' }}>
        <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Macros Goal
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>
                macros goal will appear here
            </Typography>
        </CardContent>
    </Card>
    );
}