import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { openDrawer } from "../../redux/modules/menu/menuSlice";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Toolbar, useMediaQuery } from "@mui/material";

// project import
import Drawer from "./Drawer";
import Header from "./Header";
import navigation from "../../menu-items";
import { Breadcrumbs } from "components/Extend";

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down("xl"));
  const dispatch = useAppDispatch();
  const test = useAppSelector((state) => state.menu.drawerOpen);
  const { drawerOpen } = useAppSelector((state) => state.menu);

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{ width: "100%", flexGrow: 1, p: { xs: 2, sm: 3 } }}
      >
        <Toolbar />
        <Breadcrumbs
          navigation={navigation}
          title
          titleBottom
          card={false}
          divider={false}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
