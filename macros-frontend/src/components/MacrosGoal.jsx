import { 
    Card, Typography, Box, Button, 
    Dialog, DialogTitle, DialogContent, DialogActions, TextField
 } from '@mui/material';
import { useState } from 'react';

export default function MacrosGoal({ macrosGoal, onSaveGoal }) {
    const [open, setOpen] = useState(false);
    const [localGoal, setLocalGoal] = useState({ calories: 0, protein: 0, fat: 0, carbs: 0 });

    const macros = [
        { label: 'Calories', key: 'calories', unit: '', color: '#FFF3E0', textColor: '#E65100' },
        { label: 'Protein', key: 'protein', unit: 'g', color: '#E3F2FD', textColor: '#0D47A1' },
        { label: 'Fat', key: 'fat', unit: 'g', color: '#FFEBEE', textColor: '#B71C1C' },
        { label: 'Carbs', key: 'carbs', unit: 'g', color: '#E8F5E9', textColor: '#1B5E20' },
    ];

    function handleOpen() {
        setLocalGoal(macrosGoal);
        setOpen(true);
    }

    function handleCancel() {
        setOpen(false);
    }

    function handleSave() {
        onSaveGoal(localGoal);
        setOpen(false);
    }

    return (
        <>
            <Card sx = {{ width: { xs: '100%', md: '50%' }, borderRadius: 4, border: '1px solid #ddd' }}>
                <Box sx={{ p: '12px' }}>
                    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Macros Goal
                        </Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={handleOpen}
                            sx={{ 
                                position: 'absolute',
                                right: 0,
                                borderColor: '#ebebeb',
                                color: '#555',
                                backgroundColor: '#ebebeb',
                                borderRadius: 3,
                                textTransform: 'none',
                                '&: hover': { borderColor: '#d9d9d9', backgroundColor: '#d9d9d9' }
                             }}
                        >
                            Edit Goal
                        </Button>
                    </Box>
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
                                {macrosGoal?.[macro.key] ?? 0}{macro.unit}
                            </Typography>
                            <Typography variant="caption" sx={{ color: macro.textColor }}>
                                {macro.label}
                            </Typography>
                    </Box>
                    ))}
                </Box>
                </Box>
                </Card>

                <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
                    <DialogTitle>Enter Macros Goal</DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
                            {macros.map((macro) => (
                                <TextField
                                    key={macro.key}
                                    label={`${macro.label}${macro.unit ? ` (${macro.unit})` : ''}`}
                                    type="number"
                                    value={localGoal[macro.key]}
                                    onChange={(e) => setLocalGoal({
                                        ...localGoal,
                                        [macro.key]: e.target.value === '' ? 0 : Number(e.target.value)
                                    })}
                                    onFocus={(e) => e.target.select()}
                                    variant="outlined"
                                    size="small"
                                    sx={{ flex: 1 }}
                                />
                            ))}
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} sx={{ color: '#555' }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            variant="contained"
                            sx={{ backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#333' } }}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
        </>
    );
}