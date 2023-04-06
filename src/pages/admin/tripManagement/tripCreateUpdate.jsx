import { Button, FormHelperText } from "@mui/material";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { tripApi } from "api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import { openAlert } from "redux/modules/menu/menuSlice";
import * as yup from "yup";

dayjs.extend(utc);

export default function UserCreate() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tripId } = useParams();
  const isEdit = Boolean(tripId);
  const [trip, setTrip] = useState({
    fldTripName: "",
    fldTripBudget: null,
    fldTripDescription: "",
    fldEstimateStartTime: null,
    fldEstimateArrivalTime: null,
    fldTripMember: 0,
  });

  useEffect(() => {
    if (!tripId) return;
    // IFFE
    (async () => {
      try {
        const data = await tripApi.getById(tripId);
        data.fldEstimateArrivalTime = dayjs.utc(data.fldEstimateArrivalTime);
        data.fldEstimateStartTime = dayjs.utc(data.fldEstimateStartTime);
        setTrip(data);
      } catch (error) {
        console.log("Failed to fetch trip details", error);
      }
    })();
  }, [tripId]);

  function gotoList() {
    navigate("/admin/tripList");
    //dispatch(openAlert({ errorMsg: "Create Trip Successed!", open: true }));
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

            if (reponse > 0) {
              navigate("/admin/tripList");
              if (isEdit) {
                dispatch(
                  openAlert({ errorMsg: "Update Trip Successed!", open: true })
                );
              } else {
                dispatch(
                  openAlert({ errorMsg: "Create Trip Successed!", open: true })
                );
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
                  required
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
                  required
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

              <Grid item xs={12}>
                <TextField
                  required
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
                {touched.fldEstimateStartTime && errors.fldEstimateStartTime && (
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
                  required
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
              <Grid item xs={12} sm={6}></Grid>
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
