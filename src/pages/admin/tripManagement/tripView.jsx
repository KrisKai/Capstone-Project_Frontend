import { Button } from "@mui/material";
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
import { toast } from "react-toastify";

dayjs.extend(utc);

export default function UserCreate() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tripId } = useParams();
  const [trip, setTrip] = useState({
    fldTripName: "",
    fldTripBudget: null,
    fldTripDescription: "",
    fldEstimateStartTime: null,
    fldEstimateArrivalTime: null,
    fldTripMember: 0,
    fldTripStatus: "",
  });

  useEffect(() => {
    if (!tripId) return;
    // IFFE
    (async () => {
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

  return (
    <>
      <Typography variant="h6" gutterBottom>
        View Trip
      </Typography>
      <Formik initialValues={trip} enableReinitialize={true}>
        {({ values }) => (
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="fldTripName"
                  name="fldTripName"
                  label="Trip Name"
                  fullWidth
                  variant="outlined"
                  value={values.fldTripName}
                  InputProps={{
                    readOnly: true,
                  }}
                />
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
                    readOnly: true,
                  }}
                  variant="outlined"
                  value={values.fldTripBudget}
                />
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
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  dateLibInstance={dayjs.utc}
                >
                  <DatePicker
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
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  dateLibInstance={dayjs.utc}
                >
                  <DatePicker
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
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </LocalizationProvider>
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
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="fldTripStatus"
                  name="fldTripStatus"
                  label="Trip Status"
                  fullWidth
                  autoComplete=""
                  variant="outlined"
                  value={values.fldTripStatus}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" onClick={gotoList}>
                  Return to List
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
