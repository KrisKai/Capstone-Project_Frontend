import React, { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from 'themes/overrides/Link';
import { useNavigate, useParams } from 'react-router-dom';
import { userApi } from "api";
import { toast } from "react-toastify";

export default function ConfirmPageUser() {
  let navigate = useNavigate();
  let {  userId } = useParams();
  useEffect(() => {
    // IFFE
    (async () => {
      if (!userId) return;
      try {
        const data = await userApi.confirm(userId);
        switch (data.Code) {
          case "G001":
            return toast.error(data.Message);
          case "U001":
            return toast.error(data.Message);
          default:
            navigate("/");
            // toast.success("Remove trip successfully!");
        }
      } catch (error) {
      }
    })();
  }, []);
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
              Chào mừng bạn tới JourneySick
            </Typography>
            <a href="http://localhost:3000/">
                Bấm vào đây trở về trang chủ.
            </a>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}