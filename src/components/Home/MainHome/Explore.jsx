import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Image1 from "assets/images/unsplash_1.png";
import Image2 from "assets/images/unsplash_2.png";
import Image3 from "assets/images/unsplash_3.png";
import Image4 from "assets/images/unsplash_4.png";
import { useState } from "react";
import { useSnapCarousel } from "react-snap-carousel";

const list = [Image1, Image2, Image3, Image4];

const RateCard = (props) => {
  return (
    <Card sx={{ minWidth: "295px", minHeight: "200px" }}>
      <CardMedia image={props.data} sx={{ height: "100%" }}></CardMedia>
    </Card>
  );
};

const Explore = () => {
  const [test, setTest] = useState(6);
  const { scrollRef, prev, next } = useSnapCarousel();

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h2">
            Khám phá điểm đến ngẫu hứng của bạn
          </Typography>
          <Typography fontSize="20px">
            Những điểm du lịch lấy cảm hứng từ các hướng dẫn trên khắp thế giới
          </Typography>
          <Box width="60%" border="1px solid black" mt={1}></Box>
        </Box>
      </Box>
      <Box position="relative" display="flex" mt={3}>
        <Box position="absolute" top="50%">
          <Button onClick={() => prev()}>prev</Button>
        </Box>
        <Box
          display="flex"
          overflow="auto"
          gap={2}
          sx={{ scrollSnapType: "x mandatory" }}
          ref={scrollRef}
        >
          {list.map((data, idx) => {
            return <RateCard key={idx} data={data} />;
          })}
        </Box>
        <Box position="absolute" right="0" top="50%">
          <Button onClick={() => next()}>next</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Explore;
