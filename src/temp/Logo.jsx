// material
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------

export default function Logo({ sx }) {
  const theme = useTheme();

  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src="/static/home/logo.png" />
    </Box>
  );
}
