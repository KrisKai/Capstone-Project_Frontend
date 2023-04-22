import { Header, Rate, Schedule } from "components/Home";
import { Container, Box } from "@mui/material";

const Home = () => {
  return (
    <div>
      <Header />
      <Container>
        <Rate />
        <Box mt={10}>
          <Schedule />
        </Box>
      </Container>
    </div>
  );
};

export default Home;
