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
    tripName: "",
    tripBudget: null,
    tripDescription: "",
    estimateStartTime: null,
    estimateArrivalTime: null,
    tripMember: 0,
    tripStatus: "",
  });

  useEffect(() => {
    if (!tripId) return;
    // IFFE
    (async () => {
      try {
        const data = await tripApi.getById(tripId);
        if (data != null && data != "") {
          data.estimateArrivalTime = dayjs.utc(data.estimateArrivalTime);
          data.estimateStartTime = dayjs.utc(data.estimateStartTime);
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
                  id="TripName"
                  name="TripName"
                  label="Trip Name"
                  fullWidth
                  variant="outlined"
                  value={values.tripName}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="TripBudget"
                  name="TripBudget"
                  label="Trip Budget"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">VND</InputAdornment>
                    ),
                    readOnly: true,
                  }}
                  variant="outlined"
                  value={values.tripBudget}
                />
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
                    id="EstimateStartTime"
                    name="EstimateStartTime"
                    fullWidth
                    value={values.estimateStartTime}
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
                    id="EstimateArrivalTime"
                    name="EstimateArrivalTime"
                    label="Estimate Arrival Time"
                    fullWidth
                    value={values.estimateArrivalTime}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </LocalizationProvider>
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
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="TripStatus"
                  name="TripStatus"
                  label="Trip Status"
                  fullWidth
                  autoComplete=""
                  variant="outlined"
                  value={values.tripStatus}
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
