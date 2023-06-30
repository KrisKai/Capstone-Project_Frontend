import { Box, Button, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import MapUser from "pages/map/user/MapUser";
import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  Link as RouterLink,
} from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { GOOGLE_MAP_API } from "config";

import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Preparation from "components/Home/TripCreateUser/Preparation";
import ElementMaker from "components/Home/TripCreateUser/ElementMakerForTripName";
import ElementMakerForSDate from "components/Home/TripCreateUser/ElementMakerForSDate";
import ElementMakerForEDate from "components/Home/TripCreateUser/ElementMakerForEDate";
import Plan from "components/Home/TripCreateUser/Plan";

import { useAppSelector } from "redux/hooks";
import { selectCurrentUser } from "redux/modules/user/authenticate/authUserSlice";

import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

import Logo from "assets/images/logo.png";
import userTripRouteApi from "api/user/trip/route/userTripRouteApi";
import userTripApi from "api/user/trip/userTripApi";
import typeForConverting from "assets/data/typeForConverting";
import authUserApi from "api/user/authenticate/authUserApi";
import { toast } from "react-toastify";
import { useRef } from "react";

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
  const [selectedPlace, setSelectedPlace] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [selectedChildIndex, setSelectedChildIndex] = useState();
  const [placeStatus, setPlaceStatus] = useState();
  const [placeData, setPlaceData] = useState();
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
    endLocationName: "",
    endLatitude: "",
    endLongitude: "",
    distance: "",
    tripStatus: "ACTIVE",
    tripId: tripId,
    estimateEndDateStr: "",
    estimateStartDateStr: "",
    tripThumbnail: "",
    listOfDate: [],
    listOfDateTime: [],
  });
  const [plans, setPlans] = useState([
    {
      planDate: trip.listOfDate[0] ? trip.listOfDate[0] : "",
      routeId: 0,
      open: false,
      tripRoute: [
        {
          planDateTime: trip.listOfDate[0] ? trip.listOfDate[0] : "",
          routeId: 0,
          tripId: tripId,
          longitude: "",
          latitude: "",
          locationName: "",
          priority: 1,
          showNote: false,
          note: "",
          placeId: "",
        },
      ],
    },
  ]);
  const [currentInfo, setCurrentInfo] = useState({
    username: "",
    role: "",
    birthday: "",
    email: "",
    fullname: "",
    phone: "",
    address: "",
    createDate: "",
    userInterestList: [],
  });

  const fileInputRef = useRef(null);

  // useEffect(() => {
  //   getPlanData(plans);
  // }, [plans]);

  useEffect(() => {
    // IFFE
    (async () => {
      if (!tripId) return;
      try {
        const data = await userTripApi.getById(tripId);
        if (data != null && data != "") {
          switch (data.Code) {
            case "G001":
              navigate("/");
              return toast.error(data.Message);
            case "U001":
              navigate("/");
              return toast.error(data.Message);
            default:
              setTrip(data);
          }
        } else {
          navigate("/tripList");
        }
        const response = await authUserApi.getCurrentInfo();
        setCurrentInfo(response);
      } catch (error) {
        console.log("Failed to fetch trip details", error);
        if (error.response.status == 401) {
          localStorage.removeItem("access_token");
          navigate("/login");
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (trip.listOfDateTime) {
      const tmp = trip.listOfDateTime.map((date, index) => {
        const newPlan = {
          planDate: trip.listOfDate[index],
          routeId: 0,
          open: false,
          tripRoute: [
            {
              planDateTime: date,
              routeId: 0,
              tripId: trip.tripId,
              longitude: "",
              latitude: "",
              locationName: "",
              priority: 1,
              showNote: false,
              note: "",
              placeId: "",
            },
          ],
        };
        userTripRouteApi
          .getAll({
            pageIndex: 0,
            pageSize: 9999,
            planName: "",
            tripId: tripId,
            planDateTime: date,
          })
          .then((data) => {
            if (data.numOfRoute !== 0) {
              newPlan.tripRoute = data.listOfRoute;
              const newTripRoute = {
                planDateTime: date,
                routeId: 0,
                tripId: tripId,
                longitude: "",
                latitude: "",
                locationName: "",
                priority: 1,
                showNote: false,
                note: "",
                placeId: "",
              };

              newPlan.tripRoute.push(newTripRoute);
            }
          })
          .catch((error) => {
            // Handle the error here if needed
          });

        return newPlan;
      });
      setPlans(tmp);
    }
  }, [trip, trip.listOfDate]);

  const getPlanData = (plan) => {
    setPlans(plan);
  };

  const onClickData = (data) => {
    if (data.place_id !== "") {
      const request = {
        placeId: data.place_id,
        fields: [
          "name",
          "formatted_address",
          "opening_hours",
          "website",
          "rating",
          "photos",
          "types",
          "user_ratings_total",
          "formatted_phone_number",
          "url",
          "geometry",
          "place_id",
        ],
        language: "vi",
      };

      placesService.getDetails(request, (place, status) => {
        // eslint-disable-next-line no-undef
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          let data = place;

          const convertedTypes = data.types.map((type) => {
            const matchingType = typeForConverting.find(
              (data) => data.name === type
            );
            return matchingType ? matchingType.code : type;
          });

          data.types = convertedTypes;

          setSelectedPlace(data);
          // Access the detailed place information here
        } else {
          console.error("Error:", status);
        }
      });
    }
  };

  const onClickAutocomplete = (index, childIndex) => {
    if (plans[index].tripRoute[childIndex].placeId !== "") {
      const request = {
        placeId: plans[index].tripRoute[childIndex].placeId,
        fields: [
          "name",
          "formatted_address",
          "opening_hours",
          "website",
          "rating",
          "photos",
          "types",
          "user_ratings_total",
          "formatted_phone_number",
          "url",
          "geometry",
          "place_id",
        ],
        language: "vi",
      };

      placesService.getDetails(request, (place, status) => {
        // eslint-disable-next-line no-undef
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // console.log(place);
          let data = place;

          const convertedTypes = data.types.map((type) => {
            const matchingType = typeForConverting.find(
              (data) => data.name === type
            );
            return matchingType ? matchingType.code : type;
          });

          data.types = convertedTypes;

          setSelectedPlace(data);
          setSelectedIndex(index);
          setSelectedChildIndex(childIndex);
          setPlaceStatus(status);
          // Access the detailed place information here
        } else {
          console.error("Error:", status);
        }
      });
    }
  };

  const handleClickData = (index, childIndex, place_id, status) => {
    if (place_id !== "") {
      const request = {
        placeId: place_id,
        fields: [
          "name",
          "formatted_address",
          "opening_hours",
          "website",
          "rating",
          "photos",
          "types",
          "user_ratings_total",
          "formatted_phone_number",
          "url",
          "geometry",
          "place_id",
        ],
        language: "vi",
      };

      placesService.getDetails(request, (place, status) => {
        // eslint-disable-next-line no-undef
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          let data = place;

          const convertedTypes = data.types.map((type) => {
            const matchingType = typeForConverting.find(
              (data) => data.name === type
            );
            return matchingType ? matchingType.code : type;
          });

          data.types = convertedTypes;

          setSelectedPlace(data);
          setSelectedIndex(index);
          setSelectedChildIndex(childIndex);
          // Access the detailed place information here
        } else {
          console.error("Error:", status);
        }
      });

      setPlaceStatus(status);
    }
  };

  function handleAddPlaces(selectedIndex, data) {
    setPlaceData(data);
  }

  function handleGridClick() {
    fileInputRef.current.click();
  }

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    let updatedTrip = trip;
    updatedTrip.tripThumbnail = file;
    const response = await userTripApi.update(trip);
    updatedTrip.tripThumbnail = response;
    setTrip(updatedTrip);
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" color="default">
          <Toolbar>
            <img
              src={Logo}
              alt="Logo"
              style={{ marginRight: "10px", height: "30px" }}
            />
            <Typography
              variant="h4"
              noWrap
              onClick={() => {
                navigate("/");
              }}
            >
              Journey Sick
            </Typography>
            <div style={{ marginRight: "auto" }}>
              <Button
                color="inherit"
                component={RouterLink}
                to="/"
                sx={{ fontWeight: 600 }}
              >
                Trang chủ
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/maintenance"
                sx={{ fontWeight: 600 }}
              >
                Điểm dừng chân
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/maintenance"
                sx={{ fontWeight: 600 }}
              >
                Cẩm nang đi phượt
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/tripManagement"
                sx={{ fontWeight: 600 }}
              >
                Quản lí chuyến đi
              </Button>
            </div>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <DrawerHeader />
          <Grid container>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <Grid
              item
              xs={12}
              sm={5}
              sx={{
                backgroundImage: `url(${
                  trip.tripThumbnail !== null
                    ? trip.tripThumbnail
                    : "https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                })`,
              }}
            >
              <Card sx={{ padding: 4, gap: 2, margin: 7, borderRadius: 3 }}>
                <Typography sx={{ fontSize: "2.25rem", fontWeight: 700 }}>
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
                      await userTripApi.update(trip);
                    }}
                    showInputTripName={showInputTripName}
                  />
                </Typography>
                <br />
                <br />
                <Grid container>
                  <Grid item xs={12} sm={5}>
                    <CalendarMonthIcon
                      sx={{ marginRight: 1, marginBottom: 0.75 }}
                    />
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
                        await userTripApi.update(trip);
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
                        await userTripApi.update(trip);
                      }}
                      showInputEDate={showInputEDate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}></Grid>
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
                  <Grid item xs={12} sm={6}>
                    <Button
                      onClick={handleGridClick}
                      variant="outlined"
                      sx={{ marginTop: 2 }}
                    >
                      Đổi ảnh bìa
                    </Button>
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
                      plans={plans}
                      setPlans={setPlans}
                      item={trip}
                      placeData={placeData}
                      selectedIndex={selectedIndex}
                      placeStatus={placeStatus}
                      currentInfo={currentInfo}
                      onClickData={onClickData}
                      getPlanData={getPlanData}
                      onClickAutocomplete={onClickAutocomplete}
                      handleClickData={handleClickData}
                      setPlaceStatus={setPlaceStatus}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} sm={7} paddingLeft={1}>
              <MapUser
                passToProps={trip}
                plans={plans}
                selectedData={selectedPlace}
                selectedIndex={selectedIndex}
                selectedChildIndex={selectedChildIndex}
                placeStatus={placeStatus}
                handleAddPlaces={handleAddPlaces}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
