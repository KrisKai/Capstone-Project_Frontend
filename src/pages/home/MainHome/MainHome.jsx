import {
  Header,
  Schedule,
  Rate,
  Explore,
  Footer,
} from "components/Home/MainHome";
import { Container, Box } from "@mui/material";

const MainHome = () => {
  return (
    <Box>
      <Header />
      <Container>
        <Box mt={10}>
          <Schedule />
        </Box>
        <Box mt={10}>
          <Rate />
        </Box>
        <Box mt={10}>
          <Explore />
        </Box>
      </Container>
      <Box mt={10}>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainHome;
