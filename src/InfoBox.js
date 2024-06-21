// src/InfoBox.js
import React from 'react';
import { Box, Container, Typography, Button, CssBaseline, TextField, Paper, ClickAwayListener } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function InfoBox({ content }) {
  return (
    <Paper
    sx={{
        padding: 2,
        backgroundColor: '#424242',
        color: 'white',
        borderRadius: 2,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    }}
    >
    <Typography variant="body2">{content} Philadelphia Waterdogs (2020 - Present)</Typography>
    </Paper>
  );
}
