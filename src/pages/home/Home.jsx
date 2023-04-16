import { Header, Rate, Schedule } from "components/Home";
import { Container } from "@mui/material";

const Home = () => {
  return (
    <div>
      <Header />
      <Container>
        <Rate />
        <Schedule />
      </Container>
    </div>
  );
};

export default Home;
