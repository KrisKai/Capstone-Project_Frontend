import { useEffect, useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Carousel from "react-bootstrap/Carousel";

import TrangAn from "assets/images/TrangAn-unsplash.jpg";
import HaLong from "assets/images/HaLong-unsplash.jpg";
import HoiAn from "assets/images/HoiAn-unsplash.jpg";
import BaNa from "assets/images/BaNa-unsplash.jpg";
import KhauPha from "assets/images/KhauPha-unsplash.jpg";
import PhuQuoc from "assets/images/PhuQuoc-unsplash.jpg";
import PhongNha from "assets/images/PhongNha-unsplash.jpg";
import DaLat from "assets/images/DaLat-unsplash.jpg";

dayjs.extend(utc);
const placeList = [
  { endLongitude: "107.2015491196586", endLatitude: "21.03847461081573", endLocationName: "Vịnh Hạ Long" },
  { endLongitude: "106.011700", endLatitude: "20.550880", endLocationName: "Tràng An" },
  { endLongitude: "108.33798252345753", endLatitude: "15.880285411158878", endLocationName: "Phố cổ Hội An" },
  { endLongitude: "107.99625661367183", endLatitude: "15.995372994342235", endLocationName: "Bà Nà Hills" },
  { endLongitude: "104.27170954723914", endLatitude: "21.775755718283964", endLocationName: "Đèo Khẩu Phạ" },
  { endLongitude: "103.994150", endLatitude: "10.102260", endLocationName: "Đảo Phú Quốc" },
  { endLongitude: "106.13402876766693", endLatitude: "17.47789388740063", endLocationName: "Vườn quốc gia Phong Nha – Kẻ Bàng" },
  { endLongitude: "108.454473", endLatitude: "11.941634", endLocationName: "Đà Lạt" },
];
const UserSuggest = () => {
  const [open, setOpen] = useState(false);
  const [trip, setTrip] = useState({
    estimateStartDate: dayjs(),
    estimateEndDate: dayjs().add(1, "day"),
    endLongitude: "",
    endLatitude: "",
    endLocationName: "",
  });

  const handleClick = () => {};
  const openCreateForm = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSudmit = async () => {
    setOpen(false);
    // if (locationRef1.current.value !== "") {
    //   const data = await getPlacesProps(locationRef1.current.value);
    //   const id = await tripApi.createUser({
    //     ...trip,
    //     endLocationName: data.name,
    //     endLongitude: data.lon.toString(),
    //     endLatitude: data.lat.toString(),
    //   });
    //   if (id !== null) {
    //     navigate(`/tripUpdate/` + id);
    //   }
    // }
  };
  return (
    <Box width="100%">
      <Box display="flex" alignItems="center" gap={5} width="100%">
        <Box width="30%">
          <Typography variant="h2" marginLeft={10}>
            Gợi ý địa điểm
          </Typography>
          <Box
            width="40%"
            border="1px solid black"
            mt={1}
            marginLeft={13}
          ></Box>
        </Box>
        <Box width="70%">
          <Box sx={{ backgroundColor: "#D1D1D1" }} width="100%">
            <Carousel>
              <Carousel.Item onClick={handleClick}>
                <div style={{ position: "relative" }}>
                  <img
                    src={HaLong}
                    alt="Ha Long Bay"
                    style={{ width: "100%" }}
                  />
                  <Typography
                    variant="h3"
                    component="div"
                    style={{
                      position: "absolute",
                      bottom: 2,
                      left: 0,
                      width: "100%",
                      color: "white",
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    Vịnh Hạ Long
                  </Typography>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div style={{ position: "relative" }}>
                  <img
                    src={TrangAn}
                    alt="Ha Long Bay"
                    style={{ width: "100%" }}
                  />
                  <Typography
                    variant="h3"
                    component="div"
                    style={{
                      position: "absolute",
                      bottom: 2,
                      left: 0,
                      width: "100%",
                      color: "white",
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    Tràng An
                  </Typography>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div style={{ position: "relative" }}>
                  <img src={HoiAn} style={{ width: "100%" }} />
                  <Typography
                    variant="h3"
                    component="div"
                    style={{
                      position: "absolute",
                      bottom: 2,
                      left: 0,
                      width: "100%",
                      color: "white",
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    Phố cổ Hội An
                  </Typography>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div style={{ position: "relative" }}>
                  <img src={BaNa} style={{ width: "100%" }} />
                  <Typography
                    variant="h3"
                    component="div"
                    style={{
                      position: "absolute",
                      bottom: 2,
                      left: 0,
                      width: "100%",
                      color: "white",
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    Bà Nà Hills
                  </Typography>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div style={{ position: "relative" }}>
                  <img src={KhauPha} style={{ width: "100%" }} />
                  <Typography
                    variant="h3"
                    component="div"
                    style={{
                      position: "absolute",
                      bottom: 2,
                      left: 0,
                      width: "100%",
                      color: "white",
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    Đèo Khẩu Phạ
                  </Typography>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div style={{ position: "relative" }}>
                  <img src={PhuQuoc} style={{ width: "100%" }} />
                  <Typography
                    variant="h3"
                    component="div"
                    style={{
                      position: "absolute",
                      bottom: 2,
                      left: 0,
                      width: "100%",
                      color: "white",
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    Đảo Phú Quốc
                  </Typography>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div style={{ position: "relative" }}>
                  <img src={PhongNha} style={{ width: "100%" }} />
                  <Typography
                    variant="h3"
                    component="div"
                    style={{
                      position: "absolute",
                      bottom: 2,
                      left: 0,
                      width: "100%",
                      color: "white",
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    Vườn quốc gia Phong Nha – Kẻ Bàng
                  </Typography>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div style={{ position: "relative" }}>
                  <img src={DaLat} style={{ width: "100%" }} />
                  <Typography
                    variant="h3"
                    component="div"
                    style={{
                      position: "absolute",
                      bottom: 2,
                      left: 0,
                      width: "100%",
                      color: "white",
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    Đà Lạt
                  </Typography>
                </div>
              </Carousel.Item>
            </Carousel>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiDialog-paper": { width: "450px" } }}
      >
        <DialogTitle>Đánh giá</DialogTitle>
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
            {/* <Rating
              value={feedback.rate}
              onChange={(event, newValue) => {
                const newFeedback = { ...feedback, rate: newValue };
                setFeedback(newFeedback);
              }}
            /> */}
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
            // value={feedback.feedbackDescription}
            // onChange={(event) => {
            //   const newFeedback = {
            //     ...feedback,
            //     feedbackDescription: event.target.value,
            //   };
            //   setFeedback(newFeedback);
            // }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSudmit}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserSuggest;
