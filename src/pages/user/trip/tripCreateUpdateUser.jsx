import { Box, Button, Card, FormHelperText, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { tripApi, userApi } from "api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Formik } from "formik";
import MapUser from "pages/map/user/MapUser";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import * as yup from "yup";
import { GOOGLE_MAP_API, PLACE_API } from "config";
import axios from "axios";

import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Preparation from "components/Home/TripCreateUser/Preparation";

const center = { lat: 16.0545, lng: 108.22074 };

dayjs.extend(utc);

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function TripCreate() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let navigate = useNavigate();
  const { tripId } = useParams();
  const isEdit = Boolean(tripId);
  const location = useLocation();

  const [trip, setTrip] = useState({
    tripName: "",
    tripDescription: "",
    estimateStartDate: "",
    estimateEndDate: "",
    estimateStartTime: "",
    estimateEndTime: "",
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
  });
  const [user, setUser] = useState([
    {
      userId: "",
      email: "",
      fullname: "",
    },
  ]);

  useEffect(() => {
    // IFFE
    (async () => {
      if (!tripId) return;
      try {
        const data = await tripApi.getByIdUser(tripId);
        if (data != null && data != "") {
          data.estimateEndDate = dayjs.utc(data.estimateEndDate);
          data.estimateStartDate = dayjs.utc(data.estimateStartDate);
          setTrip(data);
        } else {
          navigate("/tripList");
        }
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

  const validationSchema = yup.object().shape({
    tripName: yup.string("Enter Trip Name").required("Trip Name is required"),
    // TripBudget: yup.number().required("Trip Budget is required"),
    tripDescription: yup
      .string("Enter Trip Description")
      .required("Trip Description is required"),
    estimateStartDate: yup
      .string("Enter Estimate Start Time")
      .required("Estimate Start Time is required"),
    estimateEndDate: yup
      .string("Enter Estimate End Time")
      .required("Estimate End Time is required"),
  });

  let hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }

  return (
    <>
      {/* <Typography variant="h4" gutterBottom color="primary">
        {location.state.destination}
      </Typography> */}
      <Formik
        initialValues={trip}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors, setStatus }) => {
          try {
            setStatus({ success: false });
            let reponse;
            if (isEdit) {
              reponse = await tripApi.update(values);
            } else {
              reponse = await tripApi.create(values);
            }

            switch (reponse.Code) {
              case "G001":
                return toast.error(reponse.Message);
              case "U001":
                return toast.error(reponse.Message);
              case "I001":
                return toast.error(reponse.Message);
              default: {
                navigate("/admin/tripList");
                if (isEdit) {
                  toast.success("Update Trip Successed!");
                } else {
                  toast.success("Create Trip Successed!");
                }
              }
            }
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
          }
        }}
      >
        {({
          errors,
          touched,
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <AppBar position="fixed" open={open} color="secondary">
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                      marginRight: 5,
                      ...(open && { display: "none" }),
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div">
                    Journey Sick
                  </Typography>
                </Toolbar>
              </AppBar>
              <Drawer variant="permanent" open={open}>
                <Divider />
                <List>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {open === false && (
                        <IconButton
                          color="inherit"
                          aria-label="open drawer"
                          onClick={handleDrawerOpen}
                          edge="start"
                          sx={{
                            ...(open && { display: "none" }),
                          }}
                        >
                          <MenuIcon />
                        </IconButton>
                      )}
                      {open === true && (
                        <IconButton onClick={handleDrawerClose}>
                          <ChevronLeftIcon />
                        </IconButton>
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary="test"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  {["Inbox", "Starred", "Send email", "Drafts"].map(
                    (text, index) => (
                      <ListItem
                        key={text}
                        disablePadding
                        sx={{ display: "block" }}
                      >
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                          </ListItemIcon>
                          <ListItemText
                            primary={text}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </ListItem>
                    )
                  )}
                </List>
                <Divider />
                <List>
                  {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem
                      key={text}
                      disablePadding
                      sx={{ display: "block" }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText
                          primary={text}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <Card sx={{ padding: 4, gap: 2, margin: 7 }}>
                      <Typography variant="h4">
                        Chuyến đi tới {values.endLocationName}
                      </Typography>
                      <br />
                      <br />
                      <Grid>
                        <CalendarMonthIcon /> {values.estimateEndDateStr} -{" "}
                        {values.estimateEndDateStr}
                      </Grid>
                    </Card>
                    <Card sx={{ padding: 2, gap: 2 }}>
                      <Box paddingBottom={2}>
                        <Typography variant="h5">Thông tin cơ bản</Typography>
                      </Box>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            id="tripName"
                            name="tripName"
                            label="Trip Name"
                            fullWidth
                            variant="outlined"
                            value={values.tripName}
                            onChange={handleChange}
                            error={Boolean(touched.tripName && errors.tripName)}
                          />
                          {touched.tripName && errors.tripName && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-TripName"
                            >
                              {errors.tripName}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="tripDescription"
                            name="tripDescription"
                            label="Trip Description"
                            fullWidth
                            autoComplete=""
                            variant="outlined"
                            value={values.tripDescription}
                            onChange={handleChange}
                            error={Boolean(
                              touched.tripDescription && errors.tripDescription
                            )}
                          />
                          {touched.tripDescription &&
                            errors.tripDescription && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-TripDescription"
                              >
                                {errors.tripDescription}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                          <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            dateLibInstance={dayjs.utc}
                          >
                            <DatePicker
                              required
                              sx={{
                                "& .MuiInputBase-root": {
                                  paddingY: 1,
                                  paddingX: 3,
                                },
                                "& .MuiFormLabel-root": {
                                  paddingY: 1,
                                },
                              }}
                              label="Estimate Start Date"
                              id="estimateStartDate"
                              name="estimateStartDate"
                              fullWidth
                              value={values.estimateStartDate}
                              onChange={(value) => {
                                setFieldValue("estimateStartDate", value);
                              }}
                              error={Boolean(
                                touched.estimateStartDate &&
                                  errors.estimateStartDate
                              )}
                            />
                          </LocalizationProvider>
                          {touched.estimateStartDate &&
                            errors.estimateStartDate && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-EstimateStartDate"
                              >
                                {errors.estimateStartDate}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl sx={{ minWidth: 250 }}>
                            <InputLabel id="EstimateStartTime">
                              Estimate Start Time
                            </InputLabel>
                            <Select
                              labelId="EstimateStartTime"
                              id="estimateStartTime"
                              value={values.estimateStartTime}
                              label="EstimateStartTime"
                              onChange={handleChange}
                              name="estimateStartTime"
                            >
                              {hours.map((item) => (
                                <MenuItem value={item}>{item}</MenuItem>
                              ))}
                            </Select>

                            {touched.estimateStartTime &&
                              errors.estimateStartTime && (
                                <FormHelperText
                                  error
                                  id="standard-weight-helper-EstimateStartTime"
                                >
                                  {errors.estimateStartTime}
                                </FormHelperText>
                              )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            dateLibInstance={dayjs.utc}
                          >
                            <DatePicker
                              required
                              sx={{
                                "& .MuiInputBase-root": {
                                  paddingY: 1,
                                  paddingX: 3,
                                },
                                "& .MuiFormLabel-root": {
                                  paddingY: 1,
                                },
                              }}
                              id="estimateEndDate"
                              name="estimateEndDate"
                              label="Estimate End Date"
                              fullWidth
                              value={values.estimateEndDate}
                              onChange={(value) =>
                                setFieldValue("estimateEndDate", value)
                              }
                              error={Boolean(
                                touched.estimateEndDate &&
                                  errors.estimateEndDate
                              )}
                            />
                            {touched.estimateEndDate &&
                              errors.estimateEndDate && (
                                <FormHelperText
                                  error
                                  id="standard-weight-helper-estimateEndDate"
                                >
                                  {errors.estimateEndDate}
                                </FormHelperText>
                              )}
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl sx={{ minWidth: 250 }}>
                            <InputLabel id="EstimateEndTime">
                              Estimate End Time
                            </InputLabel>
                            <Select
                              labelId="EstimateEndTime"
                              id="estimateEndTime"
                              value={values.estimateEndTime}
                              label="estimateEndTime"
                              onChange={handleChange}
                              name="estimateEndTime"
                            >
                              {hours.map((item) => (
                                <MenuItem value={item}>{item}</MenuItem>
                              ))}
                            </Select>

                            {touched.estimateEndTime &&
                              errors.estimateEndTime && (
                                <FormHelperText
                                  error
                                  id="standard-weight-helper-EstimateEndTime"
                                >
                                  {errors.estimateEndTime}
                                </FormHelperText>
                              )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Preparation item={trip} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="startLocationName"
                            name="startLocationName"
                            label="Trip Start Location Name"
                            fullWidth
                            variant="outlined"
                            value={values.startLocationName}
                            onChange={handleChange}
                            InputProps={{
                              readOnly: true,
                            }}
                            error={Boolean(
                              touched.startLocationName &&
                                errors.startLocationName
                            )}
                          />
                          {touched.startLocationName &&
                            errors.startLocationName && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-StartLocationName"
                              >
                                {errors.startLocationName}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="endLocationName"
                            name="endLocationName"
                            label="Trip Destination Location Name"
                            fullWidth
                            variant="outlined"
                            value={values.endLocationName}
                            onChange={handleChange}
                            InputProps={{
                              readOnly: true,
                            }}
                            error={Boolean(
                              touched.endLocationName && errors.endLocationName
                            )}
                          />
                          {touched.endLocationName &&
                            errors.endLocationName && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-EndLocationName"
                              >
                                {errors.endLocationName}
                              </FormHelperText>
                            )}
                        </Grid>
                      </Grid>
                      <Button onClick={() => getLocationData("test")}>
                        test
                      </Button>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={8} paddingLeft={1}>
                    <MapUser getReturnData={getReturnData} passToProps={trip} />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}
