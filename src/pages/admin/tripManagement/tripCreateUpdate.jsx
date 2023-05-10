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
    fldTripName: "",
    fldTripBudget: null,
    fldTripDescription: "",
    fldEstimateStartDate: null,
    fldEstimateEndDate: null,
    fldEstimateStartTime: null,
    fldEstimateEndTime: null,
    fldTripMember: "",
    fldTripPresenter: "",
    fldStartLocationName: "",
    fldEndLocationName: "",
    fldTripStatus: "ACTIVE",
  });
  const [user, setUser] = useState([
    {
      fldUserId: "",
      fldEmail: "",
      fldFullname: "",
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
          data.fldEstimateEndDate = dayjs.utc(data.fldEstimateEndDate);
          data.fldEstimateStartDate = dayjs.utc(data.fldEstimateStartDate);
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
    fldTripName: yup
      .string("Enter Trip Name")
      .required("Trip Name is required"),
    // fldTripBudget: yup.number().required("Trip Budget is required"),
    fldTripDescription: yup
      .string("Enter Trip Description")
      .required("Trip Description is required"),
    fldEstimateStartDate: yup
      .string("Enter Estimate Start Time")
      .required("Estimate Start Time is required"),
    fldEstimateEndDate: yup
      .string("Enter Estimate End Time")
      .required("Estimate End Time is required"),
    fldTripMember: yup.number().min(1).required("Trip Member is required"),
    fldTripPresenter: yup
      .string("Enter Trip Presenter")
      .required("Trip Presenter is required"),
    fldStartLocationName: yup
      .string("Enter Trip Start Location Name")
      .required("Trip Start Location Name is required"),
    fldTripStartLocationAddress: yup
      .string("Enter Trip Start Location Address")
      .required("Trip Start Location Address is required"),
    fldEndLocationName: yup
      .string("Enter Trip Destination Location Name")
      .required("Trip Destination Location Name is required"),
    fldTripDestinationLocationAddress: yup
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
                      id="fldTripName"
                      name="fldTripName"
                      label="Trip Name"
                      fullWidth
                      variant="outlined"
                      value={values.fldTripName}
                      onChange={handleChange}
                      error={Boolean(touched.fldTripName && errors.fldTripName)}
                    />
                    {touched.fldTripName && errors.fldTripName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-fldTripName"
                      >
                        {errors.fldTripName}
                      </FormHelperText>
                    )}
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                <TextField
                  id="fldTripBudget"
                  name="fldTripBudget"
                  label="Trip Budget"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">VND</InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  value={values.fldTripBudget}
                  onChange={handleChange}
                  error={Boolean(touched.fldTripBudget && errors.fldTripBudget)}
                />
                {touched.fldTripBudget && errors.fldTripBudget && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-fldTripName"
                  >
                    {errors.fldTripBudget}
                  </FormHelperText>
                )}
              </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: 530 }}>
                      <InputLabel id="fldTripPresenter">
                        Trip Presenter
                      </InputLabel>
                      <Select
                        labelId="fldTripPresenter"
                        id="fldTripPresenter"
                        value={values.fldTripPresenter}
                        label="Role"
                        onChange={handleChange}
                        name="fldTripPresenter"
                      >
                        {user.map((item) => (
                          <MenuItem value={item.fldUserId}>
                            {item.fldFullname} ({item.fldEmail})
                          </MenuItem>
                        ))}
                      </Select>

                      {touched.fldTripPresenter && errors.fldTripPresenter && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-fldTripPresenter"
                        >
                          {errors.fldTripPresenter}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="fldTripMember"
                      name="fldTripMember"
                      label="Trip Member"
                      type="number"
                      fullWidth
                      variant="outlined"
                      value={values.fldTripMember}
                      onChange={handleChange}
                      error={Boolean(
                        touched.fldTripMember && errors.fldTripMember
                      )}
                    />
                    {touched.fldTripMember && errors.fldTripMember && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-fldTripMember"
                      >
                        {errors.fldTripMember}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="fldTripDescription"
                      name="fldTripDescription"
                      label="Trip Description"
                      fullWidth
                      autoComplete=""
                      variant="outlined"
                      value={values.fldTripDescription}
                      onChange={handleChange}
                      error={Boolean(
                        touched.fldTripDescription && errors.fldTripDescription
                      )}
                    />
                    {touched.fldTripDescription && errors.fldTripDescription && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-fldTripDescription"
                      >
                        {errors.fldTripDescription}
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
                        id="fldEstimateStartDate"
                        name="fldEstimateStartDate"
                        fullWidth
                        value={values.fldEstimateStartDate}
                        onChange={(value) => {
                          setFieldValue("fldEstimateStartDate", value);
                        }}
                        error={Boolean(
                          touched.fldEstimateStartDate &&
                            errors.fldEstimateStartDate
                        )}
                      />
                    </LocalizationProvider>
                    {touched.fldEstimateStartDate &&
                      errors.fldEstimateStartDate && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-fldEstimateStartDate"
                        >
                          {errors.fldEstimateStartDate}
                        </FormHelperText>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: 530 }}>
                      <InputLabel id="fldEstimateStartTime">
                        Estimate Start Time
                      </InputLabel>
                      <Select
                        labelId="fldEstimateStartTime"
                        id="fldEstimateStartTime"
                        value={values.fldEstimateStartTime}
                        label="fldEstimateStartTime"
                        onChange={handleChange}
                        name="fldEstimateStartTime"
                      >
                        {hours.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>

                      {touched.fldEstimateStartTime &&
                        errors.fldEstimateStartTime && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-fldEstimateStartTime"
                          >
                            {errors.fldEstimateStartTime}
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
                        id="fldEstimateEndDate"
                        name="fldEstimateEndDate"
                        label="Estimate End Date"
                        fullWidth
                        value={values.fldEstimateEndDate}
                        onChange={(value) =>
                          setFieldValue("fldEstimateEndDate", value)
                        }
                        error={Boolean(
                          touched.fldEstimateEndDate &&
                            errors.fldEstimateEndDate
                        )}
                      />
                      {touched.fldEstimateEndDate && errors.fldEstimateEndDate && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-fldEstimateEndDate"
                        >
                          {errors.fldEstimateEndDate}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: 530 }}>
                      <InputLabel id="fldEstimateEndTime">
                        Estimate End Time
                      </InputLabel>
                      <Select
                        labelId="fldEstimateEndTime"
                        id="fldEstimateEndTime"
                        value={values.fldEstimateEndTime}
                        label="fldEstimateEndTime"
                        onChange={handleChange}
                        name="fldEstimateEndTime"
                      >
                        {hours.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>

                      {touched.fldEstimateEndTime && errors.fldEstimateEndTime && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-fldEstimateEndTime"
                        >
                          {errors.fldEstimateEndTime}
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
                      id="fldStartLocationName"
                      name="fldStartLocationName"
                      label="Trip Start Location Name"
                      fullWidth
                      variant="outlined"
                      value={values.fldStartLocationName}
                      onChange={handleChange}
                      InputProps={{
                        readOnly: true,
                      }}
                      error={Boolean(
                        touched.fldStartLocationName &&
                          errors.fldStartLocationName
                      )}
                    />
                    {touched.fldStartLocationName &&
                      errors.fldStartLocationName && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-fldStartLocationName"
                        >
                          {errors.fldStartLocationName}
                        </FormHelperText>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="fldEndLocationName"
                      name="fldEndLocationName"
                      label="Trip Destination Location Name"
                      fullWidth
                      variant="outlined"
                      value={values.fldEndLocationName}
                      onChange={handleChange}
                      InputProps={{
                        readOnly: true,
                      }}
                      error={Boolean(
                        touched.fldEndLocationName && errors.fldEndLocationName
                      )}
                    />
                    {touched.fldEndLocationName && errors.fldEndLocationName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-fldEndLocationName"
                      >
                        {errors.fldEndLocationName}
                      </FormHelperText>
                    )}
                  </Grid>
                  {isEdit ? (
                    <Grid item xs={12}>
                      <FormControl sx={{ mt: 1, minWidth: 200 }}>
                        <InputLabel id="fldTripStatus">Status</InputLabel>
                        <Select
                          labelId="fldTripStatus"
                          id="fldTripStatus"
                          value={values.fldTripStatus}
                          label="fldTripStatus"
                          onChange={handleChange}
                          name="fldTripStatus"
                        >
                          <MenuItem value="ACTIVE">Active</MenuItem>
                          <MenuItem value="INACTIVE">Inactive</MenuItem>
                          <MenuItem value="BANNED">Banned</MenuItem>
                        </Select>

                        {touched.fldTripStatus && errors.fldTripStatus && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-fldTripStatus"
                          >
                            {errors.fldTripStatus}
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
