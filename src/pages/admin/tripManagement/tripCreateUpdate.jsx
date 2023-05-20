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
    TripName: "",
    TripBudget: null,
    TripDescription: "",
    EstimateStartDate: null,
    EstimateEndDate: null,
    EstimateStartTime: null,
    EstimateEndTime: null,
    TripMember: "",
    TripPresenter: "",
    StartLocationName: "",
    EndLocationName: "",
    TripStatus: "ACTIVE",
  });
  const [user, setUser] = useState([
    {
      UserId: "",
      Email: "",
      Fullname: "",
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
          data.EstimateEndDate = dayjs.utc(data.EstimateEndDate);
          data.EstimateStartDate = dayjs.utc(data.EstimateStartDate);
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
    TripName: yup
      .string("Enter Trip Name")
      .required("Trip Name is required"),
    // TripBudget: yup.number().required("Trip Budget is required"),
    TripDescription: yup
      .string("Enter Trip Description")
      .required("Trip Description is required"),
    EstimateStartDate: yup
      .string("Enter Estimate Start Time")
      .required("Estimate Start Time is required"),
    EstimateEndDate: yup
      .string("Enter Estimate End Time")
      .required("Estimate End Time is required"),
    TripMember: yup.number().min(1).required("Trip Member is required"),
    TripPresenter: yup
      .string("Enter Trip Presenter")
      .required("Trip Presenter is required"),
    StartLocationName: yup
      .string("Enter Trip Start Location Name")
      .required("Trip Start Location Name is required"),
    TripStartLocationAddress: yup
      .string("Enter Trip Start Location Address")
      .required("Trip Start Location Address is required"),
    EndLocationName: yup
      .string("Enter Trip Destination Location Name")
      .required("Trip Destination Location Name is required"),
    TripDestinationLocationAddress: yup
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
                      value={values.TripName}
                      onChange={handleChange}
                      error={Boolean(touched.TripName && errors.TripName)}
                    />
                    {touched.TripName && errors.TripName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-TripName"
                      >
                        {errors.TripName}
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
                        value={values.TripPresenter}
                        label="Role"
                        onChange={handleChange}
                        name="TripPresenter"
                      >
                        {user.map((item) => (
                          <MenuItem value={item.UserId}>
                            {item.Fullname} ({item.Email})
                          </MenuItem>
                        ))}
                      </Select>

                      {touched.TripPresenter && errors.TripPresenter && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-TripPresenter"
                        >
                          {errors.TripPresenter}
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
                      value={values.TripMember}
                      onChange={handleChange}
                      error={Boolean(
                        touched.TripMember && errors.TripMember
                      )}
                    />
                    {touched.TripMember && errors.TripMember && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-TripMember"
                      >
                        {errors.TripMember}
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
                      value={values.TripDescription}
                      onChange={handleChange}
                      error={Boolean(
                        touched.TripDescription && errors.TripDescription
                      )}
                    />
                    {touched.TripDescription && errors.TripDescription && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-TripDescription"
                      >
                        {errors.TripDescription}
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
                        value={values.EstimateStartDate}
                        onChange={(value) => {
                          setFieldValue("EstimateStartDate", value);
                        }}
                        error={Boolean(
                          touched.EstimateStartDate &&
                            errors.EstimateStartDate
                        )}
                      />
                    </LocalizationProvider>
                    {touched.EstimateStartDate &&
                      errors.EstimateStartDate && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-EstimateStartDate"
                        >
                          {errors.EstimateStartDate}
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
                        value={values.EstimateStartTime}
                        label="EstimateStartTime"
                        onChange={handleChange}
                        name="EstimateStartTime"
                      >
                        {hours.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>

                      {touched.EstimateStartTime &&
                        errors.EstimateStartTime && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-EstimateStartTime"
                          >
                            {errors.EstimateStartTime}
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
                        value={values.EstimateEndDate}
                        onChange={(value) =>
                          setFieldValue("EstimateEndDate", value)
                        }
                        error={Boolean(
                          touched.EstimateEndDate &&
                            errors.EstimateEndDate
                        )}
                      />
                      {touched.EstimateEndDate && errors.EstimateEndDate && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-EstimateEndDate"
                        >
                          {errors.EstimateEndDate}
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
                        value={values.EstimateEndTime}
                        label="EstimateEndTime"
                        onChange={handleChange}
                        name="EstimateEndTime"
                      >
                        {hours.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>

                      {touched.EstimateEndTime && errors.EstimateEndTime && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-EstimateEndTime"
                        >
                          {errors.EstimateEndTime}
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
                      value={values.StartLocationName}
                      onChange={handleChange}
                      InputProps={{
                        readOnly: true,
                      }}
                      error={Boolean(
                        touched.StartLocationName &&
                          errors.StartLocationName
                      )}
                    />
                    {touched.StartLocationName &&
                      errors.StartLocationName && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-StartLocationName"
                        >
                          {errors.StartLocationName}
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
                      value={values.EndLocationName}
                      onChange={handleChange}
                      InputProps={{
                        readOnly: true,
                      }}
                      error={Boolean(
                        touched.EndLocationName && errors.EndLocationName
                      )}
                    />
                    {touched.EndLocationName && errors.EndLocationName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-EndLocationName"
                      >
                        {errors.EndLocationName}
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
                          value={values.TripStatus}
                          label="TripStatus"
                          onChange={handleChange}
                          name="TripStatus"
                        >
                          <MenuItem value="ACTIVE">Active</MenuItem>
                          <MenuItem value="INACTIVE">Inactive</MenuItem>
                          <MenuItem value="BANNED">Banned</MenuItem>
                        </Select>

                        {touched.TripStatus && errors.TripStatus && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-TripStatus"
                          >
                            {errors.TripStatus}
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
