import React from "react";
// material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Button, Stack } from "@mui/material";

// assets
import Google from "../../../../assets/images/icons/google.svg";
import Twitter from "../../../../assets/images/icons/twitter.svg";
import Facebook from "../../../../assets/images/icons/facebook.svg";

import { GoogleLogin } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "config";

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const googleHandler = async () => {
    // login || singup
  };

  const twitterHandler = async () => {
    // login || singup
  };

  const facebookHandler = async () => {
    // login || singup
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
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        // render={(renderProps) => (
        //   <Button
        //     variant="outlined"
        //     color="secondary"
        //     fullWidth={!matchDownSM}
        //     startIcon={<img src={Google} alt="Google" />}
        //     // onClick={googleHandler}
        //     onClick={renderProps.onClick}
        //   >
        //     {!matchDownSM && "Google"}
        //   </Button>
        // )}
      />

      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Twitter} alt="Twitter" />}
        onClick={twitterHandler}
      >
        {!matchDownSM && "Twitter"}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Facebook} alt="Facebook" />}
        onClick={facebookHandler}
      >
        {!matchDownSM && "Facebook"}
      </Button>
    </Stack>
  );
};

export default FirebaseSocial;
