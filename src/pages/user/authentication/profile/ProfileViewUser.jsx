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
import authUserApi from "api/user/authenticate/authUserApi";
import typeForConverting from "assets/data/typeForConverting";
import FavoriteIcon from "@mui/icons-material/Favorite";
import userApi from "api/user/user/userApi";

// ==============================|| PROFILE - VIEW ||============================== //

const ProfileViewUser = (props) => {
  const [currentInfo, setCurrentInfo] = useState({
    username: "",
    role: "",
    birthday: "",
    email: "",
    fullname: "",
    phone: "",
    address: "",
    createDate: "",
    userInterestList: [],
  });

  useEffect(() => {
    async function getInfo() {
      const response = await authUserApi.getCurrentInfo();
      if (response.birthday) {
        response.birthday = response.birthday.substring(0, 10);
        response.createDate = response.createDate.substring(0, 10);
      }

      const convertedInterests = response.userInterestList.map((interest) => {
        const matchingConversion = typeForConverting.find(
          (conversion) => conversion.name === interest.interest
        );
        return matchingConversion
          ? { ...interest, interest: matchingConversion.code }
          : interest;
      });

      response.userInterestList = convertedInterests;
      setCurrentInfo(response);
    }
    getInfo();
  }, []);

  const handleDeleteInterest = async (index) => {
    const updatedInterests = [...currentInfo.userInterestList];
    await userApi.deleteInterestByInterestId(
      currentInfo.userInterestList[index].interestId
    );
    updatedInterests.splice(index, 1); // Remove the element at the specified index
    setCurrentInfo({ ...currentInfo, userInterestList: updatedInterests });
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Ảnh đại diện</Typography>
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
        <Typography variant="h5">Chỉnh sửa thông tin của bạn</Typography>
        <Button onClick={() => props.handleCallback(true)} variant="outlined">
          Chỉnh sửa
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
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {currentInfo.userInterestList.length > 0 && (
            <FavoriteIcon sx={{ width: "24px", height: "24px" }} />
          )}{" "}
          {currentInfo.userInterestList.map((item, index) => (
            <Box
              key={index}
              sx={{
                mt: 0.5,
                p: 0.5,
                pl: "12px",
                backgroundColor: "#f3f4f5",
                borderRadius: 10,
                mr: 0.5,
                mb: 1,
              }}
            >
              {item.interest}{" "}
              <button
                style={{ border: "none", paddingRight: "12px" }}
                onClick={() => handleDeleteInterest(index)}
              >
                x
              </button>
            </Box>
          ))}
        </Typography>
      </Box>
    </>
  );
};

export default ProfileViewUser;
