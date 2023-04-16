import React, { useEffect, useState } from "react";

// material-ui
import { Box, Typography, useMediaQuery, Avatar, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import CakeIcon from "@mui/icons-material/Cake";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";

import avatar1 from "assets/images/users/avatar-1.png";
import { authApi } from "api";

// ==============================|| PROFILE - VIEW ||============================== //

const ProfileView = (props) => {
  const [currentInfo, setCurrentInfo] = useState({
    fldUsername: "",
    fldRole: "",
    fldBirthday: "",
    fldEmail: "",
    fldFullname: "",
    fldPhone: "",
    fldAddress: "",
    fldCreateDate: "",
  });

  useEffect(() => {
    async function getInfo() {
      const response = await authApi.getCurrentInfo();
      if (response.fldBirthday) {
        response.fldBirthday = response.fldBirthday.substring(0, 10);
        response.fldCreateDate = response.fldCreateDate.substring(0, 10);
      }
      setCurrentInfo(response);
    }
    getInfo();
  }, []);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Profile picture</Typography>
        <Button variant="outlined">Upload Avatar</Button>
      </Box>

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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Customize your intro</Typography>
        <Button onClick={() => props.handleCallback(true)} variant="outlined">
          Edit info
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PersonIcon /> {currentInfo.fldFullname}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EmailIcon /> {currentInfo.fldEmail}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PhoneIcon /> {currentInfo.fldPhone}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <HomeIcon /> {currentInfo.fldAddress}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CakeIcon /> {currentInfo.fldBirthday}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTimeFilledRoundedIcon /> {currentInfo.fldCreateDate}
        </Typography>
      </Box>
    </>
  );
};

export default ProfileView;
