import { Box, Card, Container, Rating, Typography } from "@mui/material";
import { feedbackApi } from "api";
import { Carousel } from "components/Extend";
import { useEffect, useState } from "react";

const RateCard = (props) => {
  console.log(props.item.rate)
  return (
    <Card sx={{ width: "300px" }}>
      <Box display="flex" justifyContent="center" paddingTop={2}>
        <Rating value={props.item.rate} />
      </Box>
      <Box padding={3}>
        <Box>
          <Typography>
            {props.item.feedbackDescription}
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
          <Typography> {props.item.fullname}</Typography>
        </Box>
      </Box>
    </Card>
  );
};

const Rate = () => {
  const [test, setTest] = useState(6);
  const [feedback, setFeedbback] = useState([{
    fullname: "",
    email: "",
    feedbackDescription: "",
    rate: "",
    like: "",
    dislike: "",
    createDate: "",
  }]);

  useEffect(() => {
    // IFFE
    (async () => {
      try {
        const response = await feedbackApi.getTopFeedback();
        setFeedbback(response.listOfFeedback);
      } catch (error) {
        console.log("Failed to fetch feedback", error);
      }
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h2">Đánh giá từ khách hàng</Typography>
          <Box width="60%" border="1px solid black" mt={1}></Box>
        </Box>
      </Box>
      <Carousel>
        {feedback.map((item) => {
          return <RateCard key={item.fullname} item={item} />;
        })}
      </Carousel>
    </Container>
  );
};

export default Rate;
