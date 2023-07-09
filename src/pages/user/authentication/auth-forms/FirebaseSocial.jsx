import React from "react";
// material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Button, Stack } from "@mui/material";

// assets
import Google from "assets/images/icons/google.svg";
import Twitter from "assets/images/icons/twitter.svg";
import Facebook from "assets/images/icons/facebook.svg";
import { auth, google, facebook, twitter } from "utils/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

import { GOOGLE_CLIENT_ID } from "config";
import authUserApi from "api/user/authenticate/authUserApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const loginHandler = async (provider) => {
    const result = await signInWithPopup(auth, provider);
    const response = await authUserApi.loginWithSocial(
      result.user.accessToken.toString()
    );
    if (response.Code != "L001") {
      localStorage.setItem("access_token_user", response.token);
      navigate("/dashboard");
    } else {
      toast.error(response.Message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const responseGoogle = async (response) => {
    if (response.accessToken) {
      // User is logged in successfully. You can perform further actions.
      console.log("Logged in successfully.");
      console.log(response.profileObj);
    } else {
      // Login failed. Handle the error.
      console.log("Login failed.");
      console.log(response.error);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? "space-around" : "space-between"}
      sx={{
        "& .MuiButton-startIcon": {
          mr: matchDownSM ? 0 : 1,
          ml: matchDownSM ? 0 : -0.5,
        },
      }}
    >
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={() => loginHandler(google)}
      >
        {!matchDownSM && "Google"}
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Twitter} alt="Twitter" />}
        onClick={() => loginHandler(twitter)}
      >
        {!matchDownSM && "Twitter"}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Facebook} alt="Facebook" />}
        onClick={() => loginHandler(facebook)}
      >
        {!matchDownSM && "Facebook"}
      </Button>
    </Stack>
  );
};

export default FirebaseSocial;
