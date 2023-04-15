import React, { useRef, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Typography, useMediaQuery, Avatar } from "@mui/material";

import avatar1 from "assets/images/users/avatar-1.png";

// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

const actionSX = {
  mt: "6px",
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",

  transform: "none",
};

// ==============================|| PROFILE - VIEW ||============================== //

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProfileView = () => {
  return (
    <>
      <Typography variant="h5">Profile picture</Typography>
      <Avatar
        alt="profile user"
        src={avatar1}
        sx={{
          height: "200px",
          width: "200px",
          margin: "auto",
          marginTop: 3,
          marginBottom: 3,
        }}
      />
    </>
  );
};

export default ProfileView;
