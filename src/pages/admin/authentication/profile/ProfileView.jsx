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
    Username: "",
    Role: "",
    Birthday: "",
    Email: "",
    Fullname: "",
    Phone: "",
    Address: "",
    CreateDate: "",
  });

  useEffect(() => {
    async function getInfo() {
      const response = await authApi.getCurrentInfo();
      if (response.Birthday) {
        response.Birthday = response.Birthday.substring(0, 10);

        //temp
        // response.CreateDate = response.CreateDate.substring(0, 10);
        response.CreateDate = "2023-12-12";
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PersonIcon /> {currentInfo.Fullname}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EmailIcon /> {currentInfo.Email}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PhoneIcon /> {currentInfo.Phone}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <HomeIcon /> {currentInfo.Address}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CakeIcon /> {currentInfo.Birthday}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTimeFilledRoundedIcon /> {currentInfo.CreateDate}
        </Typography>
      </Box>
    </>
  );
};

export default ProfileView;
