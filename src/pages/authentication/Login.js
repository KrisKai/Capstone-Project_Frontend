// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Container, Typography } from '@mui/material';

// components
import Page from '../../components/Page';
import { LoginForm } from '../../components/authentication/login';
import { React } from "react";

const RootStyle = styled(Page)(({ theme }) => ({
  backgroundImage: 'url(/static/overlay.svg), url(/static/logo-image-login.jpg)',
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

export default function Login() {
  return (
    <RootStyle title="Login | Krowd">
      

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack
            direction="column"
            justifyContent="space-between"
            spacing={3}
            sx={{
              height: 250,
              backgroundColor: 'rgb(114 114 114 / 3%)',
              mb: 3,
              borderRadius: '17%'
            }}
          >
            <LoginForm />
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}