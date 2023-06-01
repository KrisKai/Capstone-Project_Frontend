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
import MapForTrip from "pages/map/admin/MapForTrip";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import * as yup from "yup";

dayjs.extend(utc);

export default function TripCreate() {
  let navigate = useNavigate();
  const { tripId } = useParams();
  const isEdit = Boolean(tripId);

  const [trip, setTrip] = useState({
    tripName: "",
    tripDescription: "",
    estimateStartDate: "",
    estimateEndDate: "",
    estimateStartTime: "",
    estimateEndTime: "",
    tripPresenter: "",
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
  });
  const [user, setUser] = useState([
    {
      userId: "",
      email: "",
      fullname: "",
    },
  ]);

  useEffect(() => {
    // setTrip({
    //   tripName: "asdasdasdasd",
    //   tripDescription: "",
    //   estimateStartDate: "",
    //   estimateEndDate: "",
    //   estimateStartTime: "",
    //   estimateEndTime: "",
    //   tripPresenter: "",
    //   startLocationName: "",
    //   endLocationName: "",
    //   startLocationName: "",
    //   startLatitude: "",
    //   startLongitude: "",
    //   endLocationName: "",
    //   endLatitude: "",
    //   endLongitude: "",
    //   distance: "",
    //   tripStatus: "ACTIVE",
    //   tripId: "",
    // });
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
  }, []);

  function gotoList() {
    navigate("/admin/tripList");
  }

  const getReturnData = (returnData) => {
    console.log(returnData);
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
    tripPresenter: yup
      .string("Enter Trip Presenter")
      .required("Trip Presenter is required"),
    // startLocationName: yup
    //   .string("Enter Trip Start Location Name")
    //   .required("Trip Start Location Name is required"),
    // tripStartLocationAddress: yup
    //   .string("Enter Trip Start Location Address")
    //   .required("Trip Start Location Address is required"),
    // endLocationName: yup
    //   .string("Enter Trip Destination Location Name")
    //   .required("Trip Destination Location Name is required"),
    // tripDestinationLocationAddress: yup
    //   .string("Enter Trip Destination Location Address")
    //   .required("Trip Destination Location Address is required"),
  });

  let hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }

  return (
    <>
      <Typography variant="h4" gutterBottom color="primary">
        {isEdit ? "Update Trip" : "Create Trip"}
      </Typography>
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
            <Grid container>
              <Grid item xs={12} sm={3}>
                <Card sx={{ padding: 2, gap: 2 }}>
                  <Box paddingBottom={2}>
                    <Typography variant="h5">Basic Information</Typography>
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
                      <FormControl sx={{ minWidth: "100%" }}>
                        <InputLabel id="TripPresenter">
                          Trip Presenter
                        </InputLabel>
                        <Select
                          labelId="TripPresenter"
                          id="tripPresenter"
                          value={values.tripPresenter}
                          label="TripPresenter"
                          onChange={handleChange}
                          name="tripPresenter"
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
                      {touched.tripDescription && errors.tripDescription && (
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
                            touched.estimateEndDate && errors.estimateEndDate
                          )}
                        />
                        {touched.estimateEndDate && errors.estimateEndDate && (
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
                    {isEdit ? (
                      <Grid item xs={12}>
                        <FormControl sx={{ mt: 1, minWidth: 200 }}>
                          <InputLabel id="TripStatus">Status</InputLabel>
                          <Select
                            labelId="TripStatus"
                            id="tripStatus"
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
                    <Grid item xs={12}>
                      <Typography variant="h5">Location Information</Typography>
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
                          touched.startLocationName && errors.startLocationName
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
                      {touched.endLocationName && errors.endLocationName && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-EndLocationName"
                        >
                          {errors.endLocationName}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} sm={9} paddingLeft={1}>
                <MapForTrip getReturnData={getReturnData} passToProps={trip} />
              </Grid>
            </Grid>
            <Grid container marginTop={2}>
              <Grid item xs={6}>
                <Button variant="outlined" onClick={gotoList}>
                  Return to List
                </Button>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Button type="submit" variant="contained">
                  {isEdit ? "Update" : "Create"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
