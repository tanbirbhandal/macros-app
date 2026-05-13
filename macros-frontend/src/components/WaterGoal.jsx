import { Card, CardContent, Typography } from '@mui/material';

export default function WaterGoal() {
    return (
        <Card sx={{ width: '12%', borderRadius: 4, border: '1 px solid #ddd' }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Water Goal
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                    ____ oz
                </Typography>
            </CardContent>
        </Card>
    );
}