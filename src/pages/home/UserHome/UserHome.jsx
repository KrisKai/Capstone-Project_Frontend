import {
  UserHeader,
  UserSuggest,
  FormCreateTrip,
  Footer,
} from "components/Home/HomeUser";
import { Box, Container } from "@mui/material";
import History from "components/Home/HomeUser/History";

const HomeUser = () => {
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
