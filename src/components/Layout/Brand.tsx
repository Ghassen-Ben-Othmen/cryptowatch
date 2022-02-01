import React from 'react';
import { Typography, useTheme } from '@mui/material';

function Brand() {
    const theme = useTheme();
    return (
        <Typography variant="h5" noWrap component="h1" style={{ fontWeight: 800, marginRight: '1.5rem' }}>
            <span style={{ color: theme.palette.secondary.dark }}>Crypto</span><span style={{ color: theme.palette.primary.light }}>Watch</span>
        </Typography>
    );
}

export default Brand;
