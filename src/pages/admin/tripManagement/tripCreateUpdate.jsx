import { Button, FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { tripApi, userApi } from "api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

dayjs.extend(utc);

export default function UserCreate() {
  let navigate = useNavigate();
  const { tripId } = useParams();
  const isEdit = Boolean(tripId);
  const [trip, setTrip] = useState({
    fldTripName: "",
    fldTripBudget: null,
    fldTripDescription: "",
    fldEstimateStartTime: null,
    fldEstimateArrivalTime: null,
    fldTripMember: "",
    fldTripPresenter: "",
    fldTripStartLocationName: "",
    fldTripStartLocationAddress: "",
    fldTripDestinationLocationName: "",
    fldTripDestinationLocationAddress: "",
    fldTripStatus: "ACTIVE",
  });
  const [user, setUser] = useState([
    {
      fldUserId: "",
      fldEmail: "",
      fldFullname: "",
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
          data.fldEstimateArrivalTime = dayjs.utc(data.fldEstimateArrivalTime);
          data.fldEstimateStartTime = dayjs.utc(data.fldEstimateStartTime);
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

  const validationSchema = yup.object().shape({
    fldTripName: yup
      .string("Enter Trip Name")
      .required("Trip Name is required"),
    fldTripBudget: yup.number().required("Trip Budget is required"),
    fldTripDescription: yup
      .string("Enter Trip Description")
      .required("Trip Description is required"),
    fldEstimateStartTime: yup
      .string("Enter Estimate Start Time")
      .required("Estimate Start Time is required"),
    fldEstimateArrivalTime: yup
      .string("Enter Estimate Arrival Time")
      .required("Estimate Arrival Time is required"),
    fldTripMember: yup.number().min(1).required("Trip Member is required"),
    fldTripPresenter: yup
      .string("Enter Trip Presenter")
      .required("Trip Presenter is required"),
    fldTripStartLocationName: yup
      .string("Enter Trip Start Location Name")
      .required("Trip Start Location Name is required"),
    fldTripStartLocationAddress: yup
      .string("Enter Trip Start Location Address")
      .required("Trip Start Location Address is required"),
    fldTripDestinationLocationName: yup
      .string("Enter Trip Destination Location Name")
      .required("Trip Destination Location Name is required"),
    fldTripDestinationLocationAddress: yup
      .string("Enter Trip Destination Location Address")
      .required("Trip Destination Location Address is required"),
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
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
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="fldTripName"
                  name="fldTripName"
                  label="Trip Name"
                  fullWidth
                  variant="standard"
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
              <Grid item xs={12} sm={6}>
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
                  variant="standard"
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
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl sx={{ mt: 1, minWidth: 400 }}>
                  <InputLabel id="fldTripPresenter">Trip Presenter</InputLabel>
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
                    <FormHelperText error id="standard-weight-helper-role">
                      {errors.fldTripPresenter}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="fldTripMember"
                  name="fldTripMember"
                  label="Trip Member"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={values.fldTripMember}
                  onChange={handleChange}
                  error={Boolean(touched.fldTripMember && errors.fldTripMember)}
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
                  variant="standard"
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
                    label="Estimate Start Time"
                    id="fldEstimateStartTime"
                    name="fldEstimateStartTime"
                    fullWidth
                    value={values.fldEstimateStartTime}
                    onChange={(value) => {
                      setFieldValue("fldEstimateStartTime", value);
                    }}
                    error={Boolean(
                      touched.fldEstimateStartTime &&
                        errors.fldEstimateStartTime
                    )}
                  />
                </LocalizationProvider>
                {touched.fldEstimateStartTime &&
                  errors.fldEstimateStartTime && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-fldEstimateStartTime"
                    >
                      {errors.fldEstimateStartTime}
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
                    id="fldEstimateArrivalTime"
                    name="fldEstimateArrivalTime"
                    label="Estimate Arrival Time"
                    fullWidth
                    value={values.fldEstimateArrivalTime}
                    onChange={(value) =>
                      setFieldValue("fldEstimateArrivalTime", value)
                    }
                    error={Boolean(
                      touched.fldEstimateArrivalTime &&
                        errors.fldEstimateArrivalTime
                    )}
                  />
                  {touched.fldEstimateArrivalTime &&
                    errors.fldEstimateArrivalTime && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-fldEstimateArrivalTime"
                      >
                        {errors.fldEstimateArrivalTime}
                      </FormHelperText>
                    )}
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="fldTripStartLocationName"
                  name="fldTripStartLocationName"
                  label="Trip Start Location Name"
                  fullWidth
                  variant="standard"
                  value={values.fldTripStartLocationName}
                  onChange={handleChange}
                  error={Boolean(
                    touched.fldTripStartLocationName &&
                      errors.fldTripStartLocationName
                  )}
                />
                {touched.fldTripStartLocationName &&
                  errors.fldTripStartLocationName && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-fldTripStartLocationName"
                    >
                      {errors.fldTripStartLocationName}
                    </FormHelperText>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="fldTripStartLocationAddress"
                  name="fldTripStartLocationAddress"
                  label="Trip Start Location Address"
                  fullWidth
                  variant="standard"
                  value={values.fldTripStartLocationAddress}
                  onChange={handleChange}
                  error={Boolean(
                    touched.fldTripStartLocationAddress &&
                      errors.fldTripStartLocationAddress
                  )}
                />
                {touched.fldTripStartLocationAddress &&
                  errors.fldTripStartLocationAddress && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-fldTripStartLocationAddress"
                    >
                      {errors.fldTripStartLocationAddress}
                    </FormHelperText>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="fldTripDestinationLocationName"
                  name="fldTripDestinationLocationName"
                  label="Trip Destination Location Name"
                  fullWidth
                  variant="standard"
                  value={values.fldTripDestinationLocationName}
                  onChange={handleChange}
                  error={Boolean(
                    touched.fldTripDestinationLocationName &&
                      errors.fldTripDestinationLocationName
                  )}
                />
                {touched.fldTripDestinationLocationName &&
                  errors.fldTripDestinationLocationName && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-fldTripDestinationLocationName"
                    >
                      {errors.fldTripDestinationLocationName}
                    </FormHelperText>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="fldTripDestinationLocationAddress"
                  name="fldTripDestinationLocationAddress"
                  label="Trip Destination Location Address"
                  fullWidth
                  variant="standard"
                  value={values.fldTripDestinationLocationAddress}
                  onChange={handleChange}
                  error={Boolean(
                    touched.fldTripDestinationLocationAddress &&
                      errors.fldTripDestinationLocationAddress
                  )}
                />
                {touched.fldTripDestinationLocationAddress &&
                  errors.fldTripDestinationLocationAddress && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-fldTripDestinationLocationAddress"
                    >
                      {errors.fldTripDestinationLocationAddress}
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
                      value={values.fldStatus}
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
                <Button type="submit" variant="outlined">
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
