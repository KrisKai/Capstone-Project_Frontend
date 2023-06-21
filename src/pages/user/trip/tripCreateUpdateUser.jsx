import { Box, Button, Card, FormHelperText, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { tripApi, userApi } from "api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import MapUser from "pages/map/user/MapUser";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import { GOOGLE_MAP_API, PLACE_API } from "config";
import axios from "axios";

import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Preparation from "components/Home/TripCreateUser/Preparation";
import ElementMaker from "components/Home/TripCreateUser/ElementMakerForTripName";
import ElementMakerForSDate from "components/Home/TripCreateUser/ElementMakerForSDate";
import ElementMakerForEDate from "components/Home/TripCreateUser/ElementMakerForEDate";
import Plan from "components/Home/TripCreateUser/Plan";
import { getPlacesData } from "api/user/travelAdvisorAPI";
import { getPlacesDataByGoogleMap } from "api/user/googleMapAPI";

import { useAppSelector } from "redux/hooks";
import { selectCurrentUser } from "redux/modules/user/authenticate/authUserSlice";


import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

dayjs.extend(utc);

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function TripCreate() {
  const [open, setOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState();

  // show input
  const [showInputTripName, setShowInputTripName] = useState(false);
  const [showInputSDate, setShowInputSDate] = useState(false);
  const [showInputEDate, setShowInputEDate] = useState(false);

  let navigate = useNavigate();
  const { tripId } = useParams();
  const location = useLocation();

  const currentUser = useAppSelector(selectCurrentUser);
  const char = currentUser.name.toString().substring(0, 1).toUpperCase();

  const { placesService } = usePlacesService({
    apiKey: GOOGLE_MAP_API,
  });

  const [trip, setTrip] = useState({
    tripName: "",
    tripDescription: "",
    estimateStartDate: "",
    estimateEndDate: "",
    startLocationName: "",
    endLocationName: "",
    startLocationName: "",
    startLatitude: "",
    startLongitude: "",
    endLocationName: "",
    endLatitude: "",
    endLongitude: "",
    distance: "",
    tripStatus: "ACTIVE",
    tripId: "",
    estimateEndDateStr: "",
    estimateStartDateStr: "",
    listOfDate: [],
    listOfDateTime: [],
  });
  const [plans, setPlans] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [attractionList, setAttractionList] = useState([]);

  useEffect(() => {
    // IFFE
    (async () => {
      if (!tripId) return;
      try {
        const data = await tripApi.getByIdUser(tripId);
        if (data != null && data != "") {
          setTrip(data);
        } else {
          navigate("/tripList");
        }

        //call api
        // getPlacesData("hotels", data.endLatitude, data.endLongitude).then(
        //   (data) => {
        //     setHotelList(data);
        //   }
        // );
        // getPlacesData("restaurants", data.endLatitude, data.endLongitude).then(
        //   (data) => {
        //     setRestaurantList(data);
        //   }
        // );
        // getPlacesData("attractions", data.endLatitude, data.endLongitude).then(
        //   (data) => {
        //     setAttractionList(data);
        //   }
        // );
        // getPlacesDataByGoogleMap(
        //   "restaurant",
        //   data.endLatitude,
        //   data.endLongitude
        // ).then((data) => {
        //   console.log(data);
        // });
      } catch (error) {
        console.log("Failed to fetch trip details", error);
        if (error.response.status == 401) {
          localStorage.removeItem("access_token");
          navigate("/login");
        }
      }
    })();
  }, []);

  const getLocationData = (data) => {
    const type = "restaurant";
    var url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      trip.endLatitude +
      "%2C" +
      trip.endLatitude +
      "&radius=1500&type=" +
      type +
      "&key=" +
      GOOGLE_MAP_API;
    var config = {
      method: "get",
      url: url,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPlanData = (plan) => {
    setPlans(plan);
  };

  const onClickData = (data) => {
    console.log(data);
    setSelectedPlace(data);
  };

  const getReturnData = (returnData) => {
    setTrip({
      ...trip,
      distance: returnData.distance.toString(),
      endLatitude: returnData.endLatitude.toString(),
      endLocationName: returnData.endLocationName,
      endLongitude: returnData.endLongitude.toString(),
      startLatitude: returnData.startLatitude.toString(),
      startLocationName: returnData.startLocationName,
      startLongitude: returnData.startLongitude.toString(),
    });
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} color="default">
          <Toolbar>
            <Button
              variant="h6"
              noWrap
              component="div"
              onClick={() => {
                navigate("/");
              }}
            >
              Journey Sick
            </Button>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Grid container>
            <Grid
              item
              xs={12}
              sm={5}
              sx={{
                backgroundImage: `url(https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60)`,
              }}
            >
              <Card sx={{ padding: 4, gap: 2, margin: 7, borderRadius: 5 }}>
                <Typography variant="h4">
                  <ElementMaker
                    value={trip.tripName}
                    handleChange={(e) => {
                      const newTrip = { ...trip, tripName: e.target.value };
                      setTrip(newTrip);
                    }}
                    handleDoubleClick={() => (
                      setShowInputTripName(true),
                      (trip["tripName"] = trip.tripName),
                      setTrip(trip)
                    )}
                    handleBlur={async () => {
                      const newTrip = {
                        ...trip,
                        tripName: trip.tripName,
                      };
                      setTrip(newTrip);
                      setShowInputTripName(false);
                      await tripApi.updateUser(trip);
                    }}
                    showInputTripName={showInputTripName}
                  />
                </Typography>
                <br />
                <br />
                <Grid container>
                  <Grid item xs={12} sm={11}>
                    <CalendarMonthIcon />
                    <ElementMakerForSDate
                      value={trip.estimateStartDate}
                      handleChange={(e) => {
                        const newTrip = { ...trip, estimateStartDate: e };
                        setTrip(newTrip);
                      }}
                      handleDoubleClick={() => (
                        setShowInputSDate(true),
                        (trip["estimateStartDate"] = trip.estimateStartDate),
                        setTrip(trip)
                      )}
                      handleBlur={async () => {
                        const newTrip = {
                          ...trip,
                          estimateStartDate: trip.estimateStartDate,
                        };
                        setTrip(newTrip);
                        setShowInputSDate(false);
                        await tripApi.updateUser(trip);
                      }}
                      showInputSDate={showInputSDate}
                    />{" "}
                    -{" "}
                    <ElementMakerForEDate
                      value={trip.estimateEndDate}
                      handleChange={(e) => {
                        const newTrip = { ...trip, estimateEndDate: e };
                        setTrip(newTrip);
                      }}
                      handleDoubleClick={() => (
                        setShowInputEDate(true),
                        (trip["estimateEndDate"] = trip.estimateEndDate),
                        setTrip(trip)
                      )}
                      handleBlur={async () => {
                        const newTrip = {
                          ...trip,
                          estimateEndDate: trip.estimateEndDate,
                        };
                        setTrip(newTrip);
                        setShowInputEDate(false);
                        await tripApi.updateUser(trip);
                      }}
                      showInputEDate={showInputEDate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={1}>
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
                  </Grid>
                </Grid>
              </Card>
              <Card sx={{ padding: 6, gap: 2 }}>
                <Box paddingBottom={2}>
                  <Typography sx={{ fontSize: "2rem", fontWeight: 700 }}>
                    Thông tin cơ bản
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Preparation item={trip} />
                  </Grid>
                  <Grid item xs={12}>
                    <Plan
                      item={trip}
                      hotels={hotelList}
                      restaurants={restaurantList}
                      attractions={attractionList}
                      onClickData={onClickData}
                      getPlanData={getPlanData}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} sm={7} paddingLeft={1}>
              <MapUser
                getReturnData={getReturnData}
                passToProps={trip}
                selectedData={selectedPlace}
                plans={plans}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
