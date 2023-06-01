import { Box, Card, Container, Rating, Typography } from "@mui/material";
import { Carousel } from "components/Extend";
import { useState } from "react";

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

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h2">Đánh giá từ khách hàng</Typography>
          <Box width="60%" border="1px solid black" mt={1}></Box>
        </Box>
      </Box>
      <Carousel>
        {Array.from({ length: test }).map((_, idx) => {
          return <RateCard key={idx} />;
        })}
      </Carousel>
    </Container>
  );
};

export default Rate;
