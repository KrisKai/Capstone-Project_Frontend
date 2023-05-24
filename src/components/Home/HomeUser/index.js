import FormCreateTrip from "./FormCreateTrip";
import Suggest from "./Suggest";
import Header from "./Header";
import { Footer } from "..";

const HomeUser = () => {
  return (
    <Box>
      <Header />
      <Container>
        <Box mt={10}>
          <Suggest />
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
