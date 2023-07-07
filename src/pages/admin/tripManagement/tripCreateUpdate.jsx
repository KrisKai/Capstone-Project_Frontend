import {
  Box,
  Button,
  Card,
  FormHelperText,
  Typography,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
import { usePlacesWidget } from "react-google-autocomplete";
import * as yup from "yup";
import { GOOGLE_MAP_API } from "config";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

dayjs.extend(utc);

export default function TripCreate() {
  const { ref: materialRef } = usePlacesWidget({
    apiKey: GOOGLE_MAP_API,
    onPlaceSelected: (place) => {
      console.log();
      const coor = JSON.stringify(place.geometry.location);
      let updatedTrip = trip;
      updatedTrip.endLocationName = place.formatted_address;
      updatedTrip.endLongitude = JSON.parse(coor).lng.toString();
      updatedTrip.endLatitude = JSON.parse(coor).lat.toString();
      updatedTrip.placeId = place?.place_id ? place?.place_id : "";
      setTrip(updatedTrip);
    },
    inputAutocompleteValue: "country",
    options: {
      types: ["geocode", "establishment"],
      componentRestrictions: { country: "vn" },
    },
  });

  let navigate = useNavigate();
  const { tripId } = useParams();
  const isEdit = Boolean(tripId);

  const [trip, setTrip] = useState({
    tripName: "",
    tripDescription: "",
    estimateStartDate: "",
    estimateEndDate: "",
    tripPresenter: "",
    endLocationName: "",
    endLatitude: "",
    endLongitude: "",
    distance: "",
    tripStatus: "ACTIVE",
    tripId: "",
    tripThumbnail: "",
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
    setTrip({
      ...trip,
      distance: returnData.distance.toString(),
      endLatitude: returnData.endLatitude.toString(),
      endLocationName: returnData.endLocationName,
      endLongitude: returnData.endLongitude.toString(),
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
                    <Typography variant="h5">Trip Thumbnail</Typography>
                  </Box>
                  <Grid item xs={12}>
                    <FormControl
                      error={touched.tripThumbnail && errors.tripThumbnail}
                      fullWidth
                    >
                      <input
                        id="tripThumbnail"
                        name="tripThumbnail"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          console.log(event.currentTarget.files[0]);
                          setFieldValue(
                            "tripThumbnail",
                            event.currentTarget.files[0]
                          );
                        }}
                        style={{ display: "none" }}
                      />
                      <label htmlFor="tripThumbnail">
                        <Button
                          variant="contained"
                          component="span"
                          startIcon={<CloudUploadIcon />}
                          onClick={(event) => {
                            const input =
                              document.getElementById("tripThumbnail");
                            // input.click();
                          }}
                        >
                          Upload Image
                        </Button>
                      </label>
                      <FormHelperText>
                        {touched.image && errors.image}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
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
                        id="endLocationName"
                        name="endLocationName"
                        label="Trip Destination Location Name"
                        fullWidth
                        variant="outlined"
                        value={values.endLocationName}
                        onChange={handleChange}
                        inputRef={materialRef}
                      />
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
