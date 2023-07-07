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
import { authApi, userApi } from "api";
import { useRef } from "react";

// ==============================|| PROFILE - VIEW ||============================== //

const ProfileView = (props) => {
  const [currentInfo, setCurrentInfo] = useState({
    username: "",
    role: "",
    birthday: "",
    email: "",
    fullname: "",
    phone: "",
    address: "",
    createDate: "",
    avatar: "",
    avatarFile: "",
  });

  const fileInputRef = useRef(null);
  useEffect(() => {
    async function getInfo() {
      const response = await authApi.getCurrentInfo();
      if (response.birthday) {
        response.birthday = response.birthday.substring(0, 10);

        //temp
        response.createDate = response.createDate.substring(0, 10);
        // response.CreateDate = "2023-12-12";
      }
      setCurrentInfo(response);
    }
    getInfo();
  }, []);

  function handleAvavtarClick() {
    fileInputRef.current.click();
  }

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    let updatedInfo = currentInfo;
    updatedInfo.avatarFile = file;
    const response = await userApi.updateAvatar(updatedInfo);
    updatedInfo.avatar = response;
    setCurrentInfo(updatedInfo);
  }
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Profile picture</Typography>
        <Button variant="outlined" onClick={handleAvavtarClick}>
          Upload Avatar
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </Box>

      <Avatar
        alt="profile user"
        src={currentInfo.avatar === null ? avatar1 : currentInfo.avatar}
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
          <PersonIcon /> {currentInfo.fullname}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EmailIcon /> {currentInfo.email}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PhoneIcon /> {currentInfo.phone}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <HomeIcon /> {currentInfo.address}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CakeIcon /> {currentInfo.birthday}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTimeFilledRoundedIcon /> {currentInfo.createDate}
        </Typography>
      </Box>
    </>
  );
};

export default ProfileView;
