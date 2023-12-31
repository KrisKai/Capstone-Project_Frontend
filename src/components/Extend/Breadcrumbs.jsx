import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// material-ui
import { Grid, Typography } from "@mui/material";

// project imports
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAppSelector } from "redux/hooks";
import MainCard from "../Layout/MainCard.jsx";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({ navigation, title, ...others }) => {
  const location = useLocation();
  const [main, setMain] = useState();
  const [item, setItem] = useState();
  const menu = useAppSelector((state) => state.menu);
  const { errorMsg, open } = menu;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  // set active item state
  const getCollapse = (menu) => {
    if (menu.children) {
      menu.children.filter((collapse) => {
        if (collapse.type && collapse.type === "collapse") {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === "item") {
          if (location.pathname === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    navigation.items.forEach((menu) => {
      if (menu.type && menu.type === "group") {
        getCollapse(menu);
      }
    });
  }, []);

  // only used for component demo breadcrumbs
  if (location.pathname === "/breadcrumbs") {
    location.pathname = "/dashboard/analytics";
  }

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = "";

  // collapse item
  if (main && main.type === "collapse") {
    mainContent = (
      <Typography
        component={Link}
        to={document.location.pathname}
        variant="h6"
        sx={{ textDecoration: "none" }}
        color="textSecondary"
      >
        {main.title}
      </Typography>
    );
  }

  // items
  if (item && item.type === "item") {
    itemTitle = item.title;
    itemContent = (
      <Typography variant="subtitle1" color="textPrimary">
        {itemTitle}
      </Typography>
    );

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <MainCard
          border={false}
          sx={{ mb: 3, bgcolor: "transparent" }}
          {...others}
          content={false}
        >
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            {/* <Grid item>
                            <MuiBreadcrumbs aria-label="breadcrumb">
                                <Typography component={Link} to="/" color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
                                    Home
                                </Typography>
                                {mainContent}
                                {itemContent}
                            </MuiBreadcrumbs>
                        </Grid> */}
            {/* {title && (
              <Grid item sx={{ mt: 2 }}>
                <Typography variant="h5">{item.title}</Typography>
              </Grid>
            )} */}
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                {errorMsg}
              </Alert>
            </Snackbar>
          </Grid>
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
};

Breadcrumbs.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.bool,
};

export default Breadcrumbs;
