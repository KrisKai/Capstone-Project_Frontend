import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { feedbackApi, tripApi } from "api";
import { Carousel } from "components/Extend";
import { useEffect, useState } from "react";

const HistoryCard = (props) => {
  const gotoTrip = () => {
    console.log(1);
    // props.history.push(`/trip/${props.trip.id}`);
  };
  return (
    <Card sx={{ width: "300px" }}>
      <CardActionArea onClick={gotoTrip}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="200"
          image="https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            Chuyến đi tới {props.item.endLocationName}
          </Typography>
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
            <Typography>
              {props.item.estimateStartDateStr} -{" "}
              {props.item.estimateEndDateStr}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const History = () => {
  const [history, setHistory] = useState([
    {
      estimateStartDate: "",
      estimateEndDate: "",
      estimateStartDateStr: "May 1",
      estimateEndDateStr: "May 5",
      tripId: "0",
      tripName: "",
      endLocationName: "",
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
