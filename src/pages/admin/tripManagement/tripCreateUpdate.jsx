import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
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
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import * as yup from "yup";

// import gg map api

dayjs.extend(utc);

const center = { lat: 48.8584, lng: 2.2945 };

export default function TripCreate() {
  let navigate = useNavigate();
  const { tripId } = useParams();
  const isEdit = Boolean(tripId);

  // using for map
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  const [trip, setTrip] = useState({
    tripName: "",
    tripBudget: null,
    tripDescription: "",
    estimateStartDate: null,
    estimateEndDate: null,
    estimateStartTime: null,
    estimateEndTime: null,
    tripMember: "",
    tripPresenter: "",
    startLocationName: "",
    endLocationName: "",
    tripStatus: "ACTIVE",
  });
  const [user, setUser] = useState([
    {
      userId: "",
      email: "",
      fullname: "",
    },
  ]);
  const [openView, setOpenView] = useState(false);
  const handleOpenView = () => setOpenView(true);
  const handleCloseView = () => setOpenView(false);

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: ,
  //   libraries: ['places'],
  // })

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiPaper-root": {
      minWidth: "1350px",
    },
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
      width: "100%",
      position: "relative",
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  }));
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  useEffect(() => {
    // IFFE
    (async () => {
      const response = await userApi.getAll({
        pageIndex: 0,
        pageSize: 99999999,
        userName: "",
      });
      setUser(response.listOfUser);
      if (!tripId) return;
      try {
        const data = await tripApi.getById(tripId);
        if (data != null && data != "") {
          data.estimateEndDate = dayjs.utc(data.estimateEndDate);
          data.estimateStartDate = dayjs.utc(data.estimateStartDate);
          setTrip(data);
        } else {
          navigate("/admin/tripList");
        }
      } catch (error) {
        console.log("Failed to fetch trip details", error);
        if (error.response.status == 401) {
          localStorage.removeItem("access_token");
          navigate("/auth/login");
        }
      }
    })();
  }, [tripId]);

  function gotoList() {
    navigate("/admin/tripList");
  }

  const getReturnData = (returnData) => {
    console.log(returnData);
  };

  const validationSchema = yup.object().shape({
    tripName: yup
      .string("Enter Trip Name")
      .required("Trip Name is required"),
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
    tripMember: yup.number().min(1).required("Trip Member is required"),
    tripPresenter: yup
      .string("Enter Trip Presenter")
      .required("Trip Presenter is required"),
    startLocationName: yup
      .string("Enter Trip Start Location Name")
      .required("Trip Start Location Name is required"),
    tripStartLocationAddress: yup
      .string("Enter Trip Start Location Address")
      .required("Trip Start Location Address is required"),
    endLocationName: yup
      .string("Enter Trip Destination Location Name")
      .required("Trip Destination Location Name is required"),
    tripDestinationLocationAddress: yup
      .string("Enter Trip Destination Location Address")
      .required("Trip Destination Location Address is required"),
  });

  let hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    // const directionsService = new google.maps.DirectionsService()
    // const results = await directionsService.route({
    //   origin: originRef.current.value,
    //   destination: destiantionRef.current.value,
    //   // eslint-disable-next-line no-undef
    //   travelMode: google.maps.TravelMode.DRIVING,
    // })
    // setDirectionsResponse(results)
    // setDistance(results.routes[0].legs[0].distance.text)
    // setDuration(results.routes[0].legs[0].duration.text)
  }

  return (
    <>
      <Typography variant="h4" gutterBottom color="primary">
        {isEdit ? "Update Trip" : "Create Trip"}
      </Typography>
      <Container>
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
              <Card sx={{ padding: 8, gap: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="TripName"
                      name="TripName"
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
                  {/* <Grid item xs={12} sm={6}>
                <TextField
                  id="TripBudget"
                  name="TripBudget"
                  label="Trip Budget"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">VND</InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  value={values.TripBudget}
                  onChange={handleChange}
                  error={Boolean(touched.TripBudget && errors.TripBudget)}
                />
                {touched.TripBudget && errors.TripBudget && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-TripName"
                  >
                    {errors.TripBudget}
                  </FormHelperText>
                )}
              </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: 530 }}>
                      <InputLabel id="TripPresenter">
                        Trip Presenter
                      </InputLabel>
                      <Select
                        labelId="TripPresenter"
                        id="TripPresenter"
                        value={values.tripPresenter}
                        label="Role"
                        onChange={handleChange}
                        name="TripPresenter"
                      >
                        {user.map((item) => (
                          <MenuItem value={item.userId}>
                            {item.fullname} ({item.email})
                          </MenuItem>
                        ))}
                      </Select>

                      {touched.tripPresenter && errors.tripPresenter && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-TripPresenter"
                        >
                          {errors.tripPresenter}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="TripMember"
                      name="TripMember"
                      label="Trip Member"
                      type="number"
                      fullWidth
                      variant="outlined"
                      value={values.tripMember}
                      onChange={handleChange}
                      error={Boolean(
                        touched.tripMember && errors.tripMember
                      )}
                    />
                    {touched.tripMember && errors.tripMember && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-TripMember"
                      >
                        {errors.tripMember}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="TripDescription"
                      name="TripDescription"
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
                    {touched.tripDescription && errors.tripDescription && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-TripDescription"
                      >
                        {errors.tripDescription}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                        id="EstimateStartDate"
                        name="EstimateStartDate"
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
                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: 530 }}>
                      <InputLabel id="EstimateStartTime">
                        Estimate Start Time
                      </InputLabel>
                      <Select
                        labelId="EstimateStartTime"
                        id="EstimateStartTime"
                        value={values.estimateStartTime}
                        label="EstimateStartTime"
                        onChange={handleChange}
                        name="EstimateStartTime"
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
                  <Grid item xs={12} sm={6}>
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
                        id="EstimateEndDate"
                        name="EstimateEndDate"
                        label="Estimate End Date"
                        fullWidth
                        value={values.estimateEndDate}
                        onChange={(value) =>
                          setFieldValue("EstimateEndDate", value)
                        }
                        error={Boolean(
                          touched.estimateEndDate &&
                            errors.estimateEndDate
                        )}
                      />
                      {touched.estimateEndDate && errors.estimateEndDate && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-EstimateEndDate"
                        >
                          {errors.estimateEndDate}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: 530 }}>
                      <InputLabel id="EstimateEndTime">
                        Estimate End Time
                      </InputLabel>
                      <Select
                        labelId="EstimateEndTime"
                        id="EstimateEndTime"
                        value={values.estimateEndTime}
                        label="EstimateEndTime"
                        onChange={handleChange}
                        name="EstimateEndTime"
                      >
                        {hours.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>

                      {touched.estimateEndTime && errors.estimateEndTime && (
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
                    Choose from map
                    <Button onClick={handleOpenView}>Open Map</Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="StartLocationName"
                      name="StartLocationName"
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="EndLocationName"
                      name="EndLocationName"
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
                    {touched.endLocationName && errors.endLocationName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-EndLocationName"
                      >
                        {errors.endLocationName}
                      </FormHelperText>
                    )}
                  </Grid>
                  {isEdit ? (
                    <Grid item xs={12}>
                      <FormControl sx={{ mt: 1, minWidth: 200 }}>
                        <InputLabel id="TripStatus">Status</InputLabel>
                        <Select
                          labelId="TripStatus"
                          id="TripStatus"
                          value={values.tripStatus}
                          label="TripStatus"
                          onChange={handleChange}
                          name="TripStatus"
                        >
                          <MenuItem value="ACTIVE">Active</MenuItem>
                          <MenuItem value="INACTIVE">Inactive</MenuItem>
                          <MenuItem value="BANNED">Banned</MenuItem>
                        </Select>

                        {touched.tripStatus && errors.tripStatus && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-TripStatus"
                          >
                            {errors.tripStatus}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  ) : (
                    <></>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Button variant="outlined" onClick={gotoList}>
                      Return to List
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} textAlign="right">
                    <Button type="submit" variant="contained">
                      {isEdit ? "Update" : "Create"}
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </form>
          )}
        </Formik>
      </Container>
      <BootstrapDialog
        onClose={handleCloseView}
        aria-labelledby="customized-dialog-title"
        open={openView}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseView}
        >
          <Typography variant="h4">
            Pick the Departure and Destination from map
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>a</DialogContent>
      </BootstrapDialog>
    </>
  );
}
