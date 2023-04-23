import { Explore, Header, Rate, Schedule, Footer } from "components/Home";
import { Container, Box } from "@mui/material";

const Home = () => {
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

export default Home;
