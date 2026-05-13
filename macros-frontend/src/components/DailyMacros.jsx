import { Card, CardContent, Typography, Box } from '@mui/material';

export default function DailyMacros({ dailyMacros }) {
    const macros= [
        { label: 'Calories', value: dailyMacros?.calories ?? 0, unit: '', color: '#FFF3E0', textColor: '#E65100' },
        { label: 'Protein', value: dailyMacros?.protein ?? 0, unit: 'g', color: '#E3F2FD', textColor: '#0D47A1' },
        { label: 'Fat', value: dailyMacros?.fat ?? 0, unit: 'g', color: '#FFEBEE', textColor: '#B71C1C' },
        { label: 'Carbs', value: dailyMacros?.carbs ?? 0, unit: 'g', color: '#E8F5E9', textColor: '#1B5E20' },
    ]

    return (
        <Card sx={{ width: '50%', borderRadius: 4, border: '1px solid #ddd' }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
                    Daily Macros
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {macros.map((macro) => (
                        <Box
                            key={macro.label}
                            sx={{ 
                                flex: 1,
                                bgcolor: macro.color,
                                borderRadius: 2,
                                p: 2,
                                textAlign: 'center',
                            }}
                        >
                        <Typography variant="h6" sx={{ color: macro.textColor, fontWeight: 500 }}>
                            {macro.value}{macro.unit}
                        </Typography>
                        <Typography variant="caption" sx={{ color: macro.textColor }}>
                            {macro.label}
                        </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}