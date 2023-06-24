import {
  UserHeader,
  UserSuggest,
  FormCreateTrip,
  Footer,
} from "components/Home/HomeUser";
import { Box } from "@mui/material";
import History from "components/Home/HomeUser/History";

const HomeUser = () => {
  return (
    <Box>
      <UserHeader />
      <Box sx={{ paddingLeft:"20%", paddingRight:"20%" }}>
        <Box mt={10}>
          <UserSuggest />
        </Box>
        <Box mt={15}>
          <History />
        </Box>
        <Box mt={5}>
          <FormCreateTrip />
        </Box>
      </Box>
      <Box mt={10}>
        <Footer />
      </Box>
    </Box>
  );
};
export default HomeUser;
