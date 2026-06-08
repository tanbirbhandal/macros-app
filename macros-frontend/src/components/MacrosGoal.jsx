import { 
    Card, Typography, Box, Button, 
    Dialog, DialogTitle, DialogContent, DialogActions, TextField
 } from '@mui/material';
import { useState } from 'react';

export default function MacrosGoal({ macrosGoal, onSaveGoal }) {

    // controls whether the Edit Goal dialog is open
    const [open, setOpen] = useState(false);

    // local copy of goal values while the dialog is open -- only saved to parent on confirm
    const [localGoal, setLocalGoal] = useState({ calories: 0, protein: 0, fat: 0, carbs: 0 });

    // display config for each macro -- key matches the field name in the goal object
    const macros = [
        { label: 'Calories', key: 'calories', unit: '', color: '#FFF3E0', textColor: '#E65100' },
        { label: 'Protein', key: 'protein', unit: 'g', color: '#E3F2FD', textColor: '#0D47A1' },
        { label: 'Fat', key: 'fat', unit: 'g', color: '#FFEBEE', textColor: '#B71C1C' },
        { label: 'Carbs', key: 'carbs', unit: 'g', color: '#E8F5E9', textColor: '#1B5E20' },
    ];

    function handleOpen() {
        // pre-populate dialog fields with current goal values before opening
        setLocalGoal(macrosGoal);
        setOpen(true);
    }

    function handleCancel() {
        // close dialog without saving -- localGoal changes are discarded
        setOpen(false);
    }

    function handleSave() {
        // pass the updated goals up to App.jsx and close the dialog
        onSaveGoal(localGoal);
        setOpen(false);
    }

    return (
        <>
            {/* card takes full width on mobile, 50% on desktop -- aligns side-by-side with DailyMacros */}
            <Card sx = {{ width: { xs: '100%', md: '50%' }, borderRadius: 4, border: '1px solid #ddd' }}>
                <Box sx={{ p: '12px' }}>

                    {/* relative position in title row makes it the anchor for the absolutely positioned button */}
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
                                '&:hover': { borderColor: '#d9d9d9', backgroundColor: '#d9d9d9' }
                             }}
                        >
                            Edit Goal
                        </Button>
                    </Box>

                    {/* flex row of 4 colored goal boxes */}
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

                {/* Edit Goal dialog -- rendered outside the Card so it overlays the whole page */}
                <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
                    <DialogTitle>Enter Macros Goal</DialogTitle>
                    <DialogContent>

                         {/* flexWrap allows inputs to wrap to a second line */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
                            {macros.map((macro) => (
                                <TextField
                                    key={macro.key}
                                    label={`${macro.label}${macro.unit ? ` (${macro.unit})` : ''}`}
                                    type="number"
                                    value={localGoal[macro.key]}
                                    onChange={(e) => setLocalGoal({
                                        // spread existing values to avoid overwriting other fields
                                        ...localGoal,
                                        [macro.key]: e.target.value === '' ? 0 : Number(e.target.value)
                                    })}
                                    // select all text on focus
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