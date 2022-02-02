import React from 'react';
import { ButtonBase, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

function Brand() {
    const theme = useTheme();
    return (
        <ButtonBase component={Link} to={''}>
            <Typography variant="h5" noWrap component="h1" style={{ fontWeight: 800, marginRight: '1.5rem' }}>
                <span style={{ color: theme.palette.secondary.dark }}>Crypto</span><span style={{ color: theme.palette.primary.light }}>Watch</span>
            </Typography>
        </ButtonBase>
    );
}

export default Brand;
