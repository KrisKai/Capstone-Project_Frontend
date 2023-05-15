import React, { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from 'themes/overrides/Link';
import { useNavigate, useParams } from 'react-router-dom';
import { tripMemberApi } from "api";

export default function ConfirmPage() {
  let navigate = useNavigate();
  let {  memberId } = useParams();
  useEffect(() => {
    // IFFE
    (async () => {
      if (!memberId) return;
      try {
        const data = await tripMemberApi.con(memberId);
        // if (data != null && data != "") {
        //   // setMember(data);
        //   // setName(data.fldFullname);
        //   // setEmail(data.fldEmail);
        // } else {
        // }
      } catch (error) {
        console.log("Failed to fetch trip member", error);
        if (error.response.status == 401) {
          localStorage.removeItem("access_token");
          navigate("/auth/login");
        }
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
              Bạn đã trở thành viên của chuyến đi này.
            </Typography>
            {/* <Link href="#">
                Bấm vào đây trở về chuyến đi.
            </Link> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}