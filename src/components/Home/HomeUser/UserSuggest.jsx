import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Carousel from "react-bootstrap/Carousel";
import SearchIcon from "@mui/icons-material/Search";

import TrangAn from "assets/images/TrangAn-unsplash.jpg";
import HaLong from "assets/images/HaLong-unsplash.jpg";
import HoiAn from "assets/images/HoiAn-unsplash.jpg";
import BaNa from "assets/images/BaNa-unsplash.jpg";
import KhauPha from "assets/images/KhauPha-unsplash.jpg";
import PhuQuoc from "assets/images/PhuQuoc-unsplash.jpg";
import PhongNha from "assets/images/PhongNha-unsplash.jpg";
import DaLat from "assets/images/DaLat-unsplash.jpg";
import { useNavigate } from "react-router-dom";
import userTripApi from "api/user/trip/userTripApi";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    borderRadius: theme.spacing(), // Adjust the value as needed
  },
}));

dayjs.extend(utc);
const placeList = [
  {
    endLongitude: "107.2015491196586",
    endLatitude: "21.03847461081573",
    endLocationName: "Vịnh Hạ Long",
  },
  {
    endLongitude: "106.011700",
    endLatitude: "20.550880",
    endLocationName: "Tràng An",
  },
  {
    endLongitude: "108.33798252345753",
    endLatitude: "15.880285411158878",
    endLocationName: "Phố cổ Hội An",
  },
  {
    endLongitude: "107.99625661367183",
    endLatitude: "15.995372994342235",
    endLocationName: "Bà Nà Hills",
  },
  {
    endLongitude: "104.27170954723914",
    endLatitude: "21.775755718283964",
    endLocationName: "Đèo Khẩu Phạ",
  },
  {
    endLongitude: "103.994150",
    endLatitude: "10.102260",
    endLocationName: "Đảo Phú Quốc",
  },
  {
    endLongitude: "106.13402876766693",
    endLatitude: "17.47789388740063",
    endLocationName: "Vườn quốc gia Phong Nha – Kẻ Bàng",
  },
  {
    endLongitude: "108.454473",
    endLatitude: "11.941634",
    endLocationName: "Đà Lạt",
  },
];
const UserSuggest = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [trip, setTrip] = useState({
    estimateStartDate: dayjs().add(1, "day"),
    estimateEndDate: dayjs().add(2, "day"),
    endLongitude: "",
    endLatitude: "",
    endLocationName: "",
    placeId: "",
  });

  const openCreateForm = (index) => {
    let updatedTrip = trip;
    updatedTrip.endLocationName = placeList[index].endLocationName;
    updatedTrip.endLatitude = placeList[index].endLatitude;
    updatedTrip.endLongitude = placeList[index].endLongitude;
    setTrip(updatedTrip);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSudmit = async () => {
    if (trip.endLocationName !== "") {
      const id = await userTripApi.create(trip);
      if (id !== null) {
        navigate(`/tripUpdate/` + id);
      }
    }
  };
  return (
    <Box width="100%">
      <Box alignItems="center" gap={5} width="100%">
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h2" sx={{ fontSize: 36 }}>Gợi ý địa điểm</Typography>
            <Box width="60%" border="1px solid black" mt={1}></Box>
          </Box>
        </Box>
        <Box width="100%" pl="10%" pr="10%">
          <Box
            sx={{ backgroundColor: "#D1D1D1", borderRadius: 10 }}
            width="100%"
          >
            <Carousel>
              <Carousel.Item onClick={() => openCreateForm(0)}>
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
              <Carousel.Item onClick={() => openCreateForm(1)}>
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
              <Carousel.Item onClick={() => openCreateForm(2)}>
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
              <Carousel.Item onClick={() => openCreateForm(3)}>
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
              <Carousel.Item onClick={() => openCreateForm(4)}>
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
              <Carousel.Item onClick={() => openCreateForm(5)}>
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
              <Carousel.Item onClick={() => openCreateForm(6)}>
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
              <Carousel.Item onClick={() => openCreateForm(7)}>
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
        sx={{
          "& .MuiDialog-paper": {
            width: "500px",
            borderRadius: "24px",
            padding: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: "24px",
            marginBottom: 3,
          }}
        >
          Tạo chuyến đi mới
        </DialogTitle>
        <DialogContent>
          <Box
            width="100%"
            sx={{
              borderRadius: "8px",
            }}
          >
            <TextField
              fullWidth
              color="secondary"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                classes: {
                  root: classes.inputRoot,
                },
              }}
              sx={{ backgroundColor: "#f3f4f5" }}
              value={trip.endLocationName}
            />
          </Box>
          <Box display="flex" gap={1} marginTop={2}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              dateLibInstance={dayjs.utc}
            >
              <DatePicker
                sx={{
                  background: "white",
                  borderRadius: "8px",
                  backgroundColor: "#f3f4f5",
                }}
                name="startDate"
                label="Ngày đi"
                value={dayjs.utc(trip.estimateStartDate)}
                onChange={(e) => {
                  const newTrip = { ...trip, estimateStartDate: e };
                  setTrip(newTrip);
                }}
                InputProps={{
                  classes: {
                    root: classes.inputRoot,
                  },
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              dateLibInstance={dayjs.utc}
            >
              <DatePicker
                sx={{
                  background: "white",
                  borderRadius: "8px",
                  backgroundColor: "#f3f4f5",
                }}
                name="endDate"
                label="Ngày đến"
                value={dayjs.utc(trip.estimateEndDate)}
                onChange={(e) => {
                  const newTrip = { ...trip, estimateEndDate: e };
                  setTrip(newTrip);
                }}
                InputProps={{
                  classes: {
                    root: classes.inputRoot,
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button
            type="button"
            variant="contained"
            sx={{
              padding: "10px 30px",
              fontSize: "20px",
              backgroundColor: "#168843",
              borderRadius: 80,
            }}
            onClick={() => handleSudmit()}
          >
            Bắt Đầu
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UserSuggest;
