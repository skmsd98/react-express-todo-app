import * as React from 'react';
import {
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    Box
} from '@mui/material';

export default function SelectMenu({ label, values, currentValue, handleValueChange }) {
    const handleChange = (event) => {
        handleValueChange(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentValue}
                    label={label}
                    onChange={handleChange}
                    required
                >
                    {
                        values.map(value =>
                            <MenuItem
                                value={value}
                                key={value}
                            >
                                {value}
                            </MenuItem>)
                    }
                </Select>
            </FormControl>
        </Box>
    );
}
