import { StarRounded } from "@material-ui/icons";
import {
  Box,
  Card,
  Container,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import { useState } from "react";
import { useSnapCarousel } from "react-snap-carousel";

const RateCard = (props) => {
  return (
    <Card sx={{ minWidth: "295px" }}>
      <Box display="flex" justifyContent="center">
        <Rating value={5} />
      </Box>
      <Box padding={3}>
        <Box>
          <Typography>
            Amet adipisicing voluptate laboris nisi mollit.Pariatur non est esse
            irure consectetur. Duis magna ea id cupidatat ullamco pariatur est
            eiusmod et ullamco excepteur exercitation. Id laborum irure esse
            irure duis reprehenderit est duis nostrud.
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2} mt={2}>
          <Box
            width="30px"
            sx={{
              aspectRatio: "1/1",
              backgroundColor: "black",
              color: "white",
            }}
            display="flex"
            alignItems=" center"
            justifyContent="center"
            border="1px solid black"
            borderRadius="50%"
          >
            <Typography>K</Typography>
          </Box>
          <Typography>DOK, Dev</Typography>
        </Box>
      </Box>
    </Card>
  );
};

const Rate = () => {
  const [test, setTest] = useState(6);
  const { scrollRef, prev, next } = useSnapCarousel();

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h2">Đánh giá từ khách hàng</Typography>
          <Box width="60%" border="1px solid black" mt={1}></Box>
        </Box>
      </Box>
      <Box position="relative" display="flex" mt={3}>
        <Box
          width="40px"
          sx={{ transform: "translate(-50%, 0)", aspectRatio: "1/1" }}
          position="absolute"
          top="50%"
          zIndex={9999}
          backgroundColor="white"
          borderRadius="50%"
          border="1px solid black"
        >
          <Button
            sx={{ width: "100%", height: "100%", borderRadius: "50%" }}
            onClick={() => prev()}
          >
            prev
          </Button>
        </Box>
        <Box
          display="flex"
          overflow="auto"
          gap={2}
          sx={{ scrollSnapType: "x mandatory" }}
          ref={scrollRef}
        >
          {Array.from({ length: test }).map((_, idx) => {
            return <RateCard key={idx} />;
          })}
        </Box>
        <Box position="absolute" right="0" top="50%">
          <Button onClick={() => next()}>next</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Rate;
