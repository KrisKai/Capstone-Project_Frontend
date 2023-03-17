import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { forwardRef, useEffect, useCallback, ReactNode } from 'react';
// material
import { Box, BoxProps } from '@mui/material';
import { React } from "react";

// ----------------------------------------------------------------------


const Page = forwardRef<HTMLDivElement>(
  (
    { children, title = 'Nền tảng gọi vốn cộng đồng cho doanh nghiệp nhỏ | Krowd', ...other },
    ref
  ) => {
    const { pathname } = useLocation();


    return (
      <Box ref={ref} {...other}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {children}
      </Box>
    );
  }
);

export default Page;
