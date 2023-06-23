import { Box, Card, CardMedia, Container, Typography } from "@mui/material";
import Image1 from "assets/images/unsplash_1.png";
import Image2 from "assets/images/unsplash_2.png";
import Image3 from "assets/images/unsplash_3.png";
import Image4 from "assets/images/unsplash_4.png";
import Image5 from "assets/images/TrangAn-unsplash.jpg";
import { Carousel } from "components/Extend";

const list = [Image1, Image2, Image3, Image4, Image5];

const ExploreCard = (props) => {
  return (
    <Card sx={{ minWidth: "295px", minHeight: "200px" }}>
      <CardMedia image={props.data} sx={{ height: "100%" }}></CardMedia>
    </Card>
  );
};

const Explore = () => {
  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h2">
            Khám phá điểm đến ngẫu hứng dành cho bạn
          </Typography>
          <Box width="60%" border="1px solid black" mt={1}></Box>
        </Box>
      </Box>
      <Carousel>
        {list.map((data, idx) => {
          return <ExploreCard key={idx} data={data} />;
        })}
      </Carousel>
    </Container>
  );
};

export default Explore;
