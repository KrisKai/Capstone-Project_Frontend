// material

import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/path';
// hooks
import useAuth from '../../../hooks/useAuth';
//
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import { React } from "react";

// ----------------------------------------------------------------------
export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginGoogle = async () => {
    try {
      await login();
    } catch (error) {
      navigate(PATH_PAGE.page500);
    }
  };

  return (
    <>
      Test
    </>
  );
}
