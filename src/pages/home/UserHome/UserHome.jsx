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

const HomeUser = () => {
  let navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await authUserApi.getCurrentUser();
        if (response === null && response === "") {
          navigate("/");
        }
      } catch (error) {
        console.log("Authenticate!", error);
        if (error.response.status == 401) {
          localStorage.removeItem("access_token_user");
          navigate("/");
        }
      }
    })();
  },[]);
  return (
    <Box>
      <UserHeader />
      <Container>
        <Box mt={10}>
          <UserSuggest />
        </Box>
        {/* <Box mt={10}>
          <Rate />
        </Box> */}
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
