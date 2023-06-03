import { Box, Card, Container, Rating, Typography } from "@mui/material";
import { feedbackApi, tripApi } from "api";
import { Carousel } from "components/Extend";
import { useEffect, useState } from "react";

const HistoryCard = (props) => {
  return (
    <Card sx={{ width: "300px" }}>
      <Box display="flex" justifyContent="center" paddingTop={2}>
        <Rating value={props.item.rate} readOnly />
      </Box>
      <Box padding={3}>
        <Box>
          <Typography>{props.item.feedbackDescription}</Typography>
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
          <Typography> {props.item.estimateStartDateStr} - {props.item.estimateEndDateStr}</Typography>
        </Box>
      </Box>
    </Card>
  );
};

const History = () => {
  const [history, setHistory] = useState([
    {
      estimateStartDate: "",
      estimateEndDate: "",
      estimateStartDateStr: "",
      estimateEndDateStr: "",
      tripId: "",
      tripName: "",
    },
  ]);

  useEffect(() => {
    // IFFE
    (async () => {
      try {
        const response = await tripApi.tripHistory();
        if (response !== "" && response !== null) {
          setHistory(response);
        }
      } catch (error) {
        console.log("Failed to fetch feedback", error);
      }
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h2">Chuyến đi của bạn</Typography>
          <Box width="60%" border="1px solid black" mt={1}></Box>
        </Box>
      </Box>
      <Carousel>
        {history.map((item) => {
          return <HistoryCard key={item.tripId} item={item} />;
        })}
      </Carousel>
    </Container>
  );
};

export default History;
