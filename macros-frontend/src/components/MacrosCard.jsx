import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

export default function MacrosCard({ data }) {
  const macros = [
    { label: 'Calories', value: data.calories, unit: '',  color: '#FFF3E0', textColor: '#E65100' },
    { label: 'Protein',  value: data.protein,  unit: 'g', color: '#E3F2FD', textColor: '#0D47A1' },
    { label: 'Fat',      value: data.fat,     unit: 'g', color: '#FFEBEE', textColor: '#B71C1C' },
    { label: 'Carbs',    value: data.carbs,   unit: 'g', color: '#E8F5E9', textColor: '#1B5E20' },
  ];

  return (
    <Card sx={{ borderRadius: 10, p: 1, maxWidth: 600, mx: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          Macros breakdown
        </Typography>

        <Grid container spacing={2}>
          {macros.map((macro) => (
            <Grid item xs={6} sm={3} key={macro.label}>
              <Box sx={{
                bgcolor: macro.color,
                borderRadius: 4,
                p: 2,
                textAlign: 'center'
              }}>
                <Typography variant="h4" sx={{ color: macro.textColor, fontWeight: 500 }}>
                  {macro.value}{macro.unit}
                </Typography>
                <Typography variant="body1" sx={{ color: macro.textColor }}>
                  {macro.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}