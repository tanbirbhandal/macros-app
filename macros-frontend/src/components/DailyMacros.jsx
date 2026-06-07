import { Card, Typography, Box } from '@mui/material';

export default function DailyMacros({ dailyMacros }) {

    // macro display config -- label, current value, unit, and color scheme for each box
    // macro value defaults to 0 if the value is missing
    const macros= [
        { label: 'Calories', value: dailyMacros?.calories ?? 0, unit: '', color: '#FFF3E0', textColor: '#E65100' },
        { label: 'Protein', value: dailyMacros?.protein ?? 0, unit: 'g', color: '#E3F2FD', textColor: '#0D47A1' },
        { label: 'Fat', value: dailyMacros?.fat ?? 0, unit: 'g', color: '#FFEBEE', textColor: '#B71C1C' },
        { label: 'Carbs', value: dailyMacros?.carbs ?? 0, unit: 'g', color: '#E8F5E9', textColor: '#1B5E20' },
    ]

    return (
        // card takes full width on mobile, 50% on desktop -- aligns side-by-side with MacrosGoal
        <Card sx={{ width: { xs: '100%', md: '50%' }, borderRadius: 4, border: '1px solid #ddd' }}>

            {/* Box is used instead of CardContent for control over padding */}
            <Box sx={{ p: '12px' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
                    Daily Macros
                </Typography>

                {/* flex row of 4 colored macro boxes */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {macros.map((macro) => (
                        <Box
                            key={macro.label}
                            sx={{ 
                                flex: 1,
                                bgcolor: macro.color,
                                borderRadius: 2,
                                p: { xs: 2, md: 1.2 },
                                textAlign: 'center',
                            }}
                        >
                        <Typography variant="h6" sx={{ color: macro.textColor, fontWeight: 500, fontSize: { xs: '1rem', md: '0.95rem' } }}>
                            {macro.value}{macro.unit}
                        </Typography>
                        <Typography variant="caption" sx={{ color: macro.textColor }}>
                            {macro.label}
                        </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Card>
    );
}