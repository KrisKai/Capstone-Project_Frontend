import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from 'themes/overrides/Link';

export default function ConfirmPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid>
            <Typography variant="h1">
              Bạn được trở thành viên của chuyến đi này.
            </Typography>
            <Link to="/">
                Bấm vào đây trở về chuyến đi.
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}