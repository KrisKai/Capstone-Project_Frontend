import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { tripApi } from "api";
import { Carousel } from "components/Extend";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HistoryCard = (props) => {
  const char = "Khai".toString().substring(0, 1).toUpperCase();
  const navigate = useNavigate();
  const gotoTrip = (id) => {
    navigate(`/tripUpdate/${id}`);
  };
  const openFeedback = () => {
    console.log(1)
  };
  return (
    <Card sx={{ width: "300px" }}>
      <CardActionArea onClick={() => gotoTrip(props.item.tripId)}>
        <Button
          sx={{
            alignSelf: "flex-end",
            marginTop: 0,
            position: "absolute",
            right: 0,
            width: "15px",
            zIndex: 999999,
            minWidth: "140px",
          }}
          variant="contained"
          disableElevation
          color="info"
        >
          {props.item.tripStatus === "ACTIVE" && "Đang hoạt động"}
          {props.item.tripStatus === "CLOSED" && "Hết hạn"}
        </Button>
        <Box
          sx={{
            backgroundImage: `url(https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60)`,
          }}
        >
          {props.item.tripStatus === "CLOSED" && (
            <Button
              sx={{
                position: "absolute",
                alignContent: "center",
                top: "100px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "140px",
                zIndex: 999999,
              }}
              variant="contained"
              onClick={openFeedback}
            >
              Phản hồi
            </Button>
          )}
        </Box>
        <img
          src="https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          style={{ width: "100%" }}
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
              <Typography>{char}</Typography>
            </Box>
            <Typography>
              {props.item.estimateStartDateStr} -{props.item.estimateEndDateStr}
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
      tripStatus: "",
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
