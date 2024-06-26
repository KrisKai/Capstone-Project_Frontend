import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  IconButton,
  Rating,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "redux/hooks";
import { selectCurrentUser } from "redux/modules/user/authenticate/authUserSlice";
import { toast } from "react-toastify";
import userFeedbackApi from "api/user/feedback/userFeedbackApi";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userTripApi from "api/user/trip/userTripApi";

const HistoryCard = (props) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const char = currentUser.name.toString().substring(0, 1).toUpperCase();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState({
    feedbackId: props.item.feedbackId,
    feedbackDescription: props.item.feedbackDescription,
    rate: props.item.rate,
    locationName: props.item.endLocationName,
    tripId: props.item.tripId,
    userId: currentUser.userId,
  });
  useEffect(() => {
    // IFFE
    if (props.item.feedbackId !== null) {
      const newFeedback = {
        ...feedback,
        rate: props.item.rate,
        feedbackDescription: props.item.feedbackDescription,
        feedbackId: props.item.feedbackId,
        locationName: props.item.endLocationName,
        tripId: props.item.tripId,
      };
      setFeedback(newFeedback);
    } else {
      const newFeedback = {
        ...feedback,
        rate: props.item.rate,
        feedbackDescription: props.item.feedbackDescription,
        feedbackId: 0,
        locationName: props.item.endLocationName,
        tripId: props.item.tripId,
      };
      setFeedback(newFeedback);
    }
  }, [props.item.tripId]);

  const gotoTrip = (id) => {
    navigate(`/tripUpdate/${id}`);
  };
  const openFeedback = () => {
    setOpen(true);
  };
  const handleDelete = async () => {
    try {
      // Remove trip API
      const data = await userTripApi.delete(props.item.tripId || "");
      switch (data.Code) {
        case "G001":
          return toast.error(data.Message);
        case "D001":
          return toast.error(data.Message);
        default:
          toast.success("Bạn đã xóa chuyến đi thành công!");

          props.handleAfterDelete(props.index, props.childIndex);
      }
    } catch (error) {
      // Toast error
      console.log("Failed to fetch trip", error);
      if (error.response.status == 401) {
        localStorage.removeItem("access_token");
        navigate("/auth/login");
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSudmit = async () => {
    setOpen(false);
    let response;
    if (feedback.feedbackId === 0) {
      response = await userFeedbackApi.createUser(feedback);
    } else {
      response = await userFeedbackApi.updateUser(feedback);
    }
    switch (response.Code) {
      case "G001":
        return toast.error(response.Message);
      case "U001":
        return toast.error(response.Message);
      case "I001":
        return toast.error(response.Message);
      case "V001":
        return toast.error(response.Message);
      default: {
        if (response > 0) {
          toast.success("Cảm ơn bạn đã đánh giá!");
        }
      }
    }
  };
  return (
    <>
      <Card
        sx={{
          width: "360px",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
        }}
      >
        <CardActionArea>
          <Button
            sx={{
              alignSelf: "flex-end",
              marginTop: 0,
              position: "absolute",
              left: 0,
              width: "15px",
              minWidth: "140px",
              backgroundColor: "#168843",
            }}
            variant="contained"
            disableElevation
          >
            {props.item.tripStatus === "ACTIVE" && "Đang hoạt động"}
            {props.item.tripStatus === "CLOSED" && "Hoàn thành"}
          </Button>
          <IconButton
            onClick={handleDelete}
            sx={{
              alignSelf: "flex-end",
              marginTop: 0,
              position: "absolute",
              right: 0,
              height: "30px",
              width: "30px",
              margin: 1,
              aspectRatio: "1/1",
              backgroundColor: "rgba(33,37,41,.502)",
              color: "white",
              borderRadius: "50%",
              alignItems: " center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>

          <img
            src={
              props.item.tripThumbnail === null
                ? "https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                : props.item.tripThumbnail
            }
            style={{ width: "100%", borderRadius: 10, height: "250px" }}
            onClick={() => gotoTrip(props.item.tripId)}
          />
        </CardActionArea>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            onClick={() => gotoTrip(props.item.tripId)}
          >
            Chuyến đi tới {props.item.endLocationName}
          </Typography>

          <Box display="flex" alignItems="center" gap={2} mt={2}>
            <Box
              width="25px"
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
            <Typography onClick={() => gotoTrip(props.item.tripId)}>
              {props.item.estimateStartDateStr} -{" "}
              {props.item.estimateEndDateStr}
            </Typography>
            {props.item.tripStatus === "CLOSED" &&
              props.item.feedbackDescription === null && (
                <Button
                  sx={{
                    right: 0,
                    marginLeft: 2,
                  }}
                  variant="outlined"
                  onClick={openFeedback}
                >
                  Đánh giá
                </Button>
              )}
            {props.item.tripStatus === "CLOSED" &&
              props.item.feedbackDescription !== null && (
                <Button
                  sx={{
                    right: 0,
                    marginLeft: 2,
                  }}
                  variant="outlined"
                  onClick={openFeedback}
                >
                  Đã đánh giá
                </Button>
              )}
          </Box>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiDialog-paper": { width: "450px" } }}
      >
        <DialogTitle sx={{ fontSize: "30px", fontWeight: 700 }}>
          Đánh giá
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cảm ơn bạn đã trải nghiệm chuyến đi cùng chúng tôi. Liệu bạn có thể
            chia sẻ cảm nghĩ về chuyến đi vừa rồi được không?
          </DialogContentText>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={2}
          >
            <Rating
              value={feedback.rate}
              onChange={(event, newValue) => {
                const newFeedback = { ...feedback, rate: newValue };
                setFeedback(newFeedback);
              }}
            />
          </Box>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cảm nghĩ của bạn"
            fullWidth
            multiline
            rows={3}
            variant="standard"
            value={feedback.feedbackDescription}
            onChange={(event) => {
              const newFeedback = {
                ...feedback,
                feedbackDescription: event.target.value,
              };
              setFeedback(newFeedback);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSudmit}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const History = () => {
  const [history, setHistory] = useState([
    [
      {
        estimateStartDate: "",
        estimateEndDate: "",
        estimateStartDateStr: "May 1",
        estimateEndDateStr: "May 5",
        tripId: "0",
        tripName: "",
        endLocationName: "",
        tripStatus: "",
        feedbackId: 0,
        feedbackDescription: "",
        rate: 5,
      },
    ],
  ]);
  const [groupedHistory, setGroupedHistory] = useState([
    [
      {
        estimateStartDate: "",
        estimateEndDate: "",
        estimateStartDateStr: "May 1",
        estimateEndDateStr: "May 5",
        tripId: "0",
        tripName: "",
        endLocationName: "",
        tripStatus: "",
        feedbackId: 0,
        feedbackDescription: "",
        rate: 5,
      },
    ],
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // IFFE
    (async () => {
      try {
        const response = await userTripApi.tripHistory();
        if (response !== "" && response !== null) {
          const groupedTrips = [];
          for (let i = 0; i < response.length; i += 3) {
            const group = response.slice(i, i + 3);
            groupedTrips.push(group);
          }
          setHistory(response);
          setGroupedHistory(groupedTrips);
        }
      } catch (error) {
        console.log("Failed to fetch trip", error);
      }
    })();
  }, []);
  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % groupedHistory.length);
  };

  const goToPrevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? groupedHistory.length - 1 : prevIndex - 1
    );
  };

  const handleAfterDelete = (index, childIndex) => {
    history.splice(index * 3 + childIndex, 1);
    setHistory(history);
    const groupedTrips = [];
    for (let i = 0; i < history.length; i += 3) {
      const group = history.slice(i, i + 3);
      groupedTrips.push(group);
    }
    setGroupedHistory(groupedTrips);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h2" sx={{ fontSize: 36 }}>
            Chuyến đi của bạn
          </Typography>
          <Box width="60%" border="1px solid black" mt={1}></Box>
        </Box>
      </Box>
      <Grid container>
        <Grid item sx={12} sm={0.5} marginTop="220px">
          <Button
            onClick={goToPrevSlide}
            sx={{
              width: "45px",
              minWidth: "45px",
              padding: "0",
            }}
          >
            <ArrowBackIosNewIcon sx={{ width: "100%" }} />
          </Button>
        </Grid>
        <Grid item sx={12} sm={11}>
          <Carousel
            sx={{
              height: "500px",
            }}
            index={activeIndex}
            autoPlay={false}
            navButtonsAlwaysInvisible={true}
          >
            {groupedHistory.map((slide, index) => {
              return (
                <>
                  <Box display="flex" key={index} gap={3}>
                    {slide.map((item, childIndex) => {
                      return (
                        <HistoryCard
                          key={childIndex}
                          item={item}
                          index={index}
                          childIndex={childIndex}
                          handleAfterDelete={handleAfterDelete}
                        />
                      );
                    })}
                  </Box>
                </>
              );
            })}
          </Carousel>
        </Grid>
        <Grid item sx={12} sm={0.5} marginTop="220px">
          <Button
            onClick={goToNextSlide}
            sx={{
              width: "45px",
              minWidth: "45px",
              padding: "0",
            }}
          >
            <ArrowForwardIosIcon sx={{ width: "100%" }} />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default History;
