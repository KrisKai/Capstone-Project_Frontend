import { useEffect } from "react";
import {
  UserHeader,
  UserSuggest,
  FormCreateTrip,
  Footer,
} from "components/Home/HomeUser";
import { Box, Container } from "@mui/material";
import authUserApi from "api/user/authenticate/authUserApi";

import { useNavigate } from "react-router-dom";
import History from "components/Home/HomeUser/History";

const HomeUser = () => {
  let navigate = useNavigate();
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await authUserApi.getCurrentUser();
  //     } catch (error) {
  //       console.log("Authenticate!", error);
  //       if (error.response.status == 401) {
  //         localStorage.removeItem("access_token_user");
  //         navigate("/");
  //       }
  //     }
  //   })();
  // },[]);
  return (
    <Box>
      <UserHeader />
      <Container>
        <Box mt={10}>
          <UserSuggest />
        </Box>
        <Box mt={10}>
          <History />
        </Box>
        <Box mt={10}>
          <FormCreateTrip />
        </Box>
      </Container>
      <Box mt={10}>
        <Footer />
      </Box>
    </Box>
  );
};
export default HomeUser;
