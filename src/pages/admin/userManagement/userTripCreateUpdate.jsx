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

export default function UserTripCreate() {
  let navigate = useNavigate();
  const { tripId } = useParams();
  const isEdit = Boolean(tripId);

  const [trip, setTrip] = useState({
    startDate: "",
    touristAttraction: "",
    tripNote: "",
  });

  useEffect(() => {
    (async () => {
      const response = await userApi.getAll({
        pageIndex: 0,
        pageSize: 99999999,
        userName: "",
      });
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

  const handleSubmit = async (values, { setErrors, setStatus }) => {
    console.log(values);
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
    touristAttraction: yup
      .string("Vui lòng nhập điểm tham quan")
      .required("Bắt buộc"),
    tripNote: yup.string("Vui lòng nhập ghi chú").required("Bắt buộc"),
    startDate: yup.string("Vui lòng nhập ngày đi").required("Bắt buộc"),
  });

  return (
    <>
      <Formik
        initialValues={trip}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { setErrors, setStatus }) =>
          handleSubmit(values, { setErrors, setStatus })
        }
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
                    <Typography variant="h5">Thông tin chuyến đi</Typography>
                  </Box>
                  <Grid container spacing={3}>
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
                            width: "100%",
                          }}
                          label="Ngày đi"
                          id="startDate"
                          name="startDate"
                          fullWidth
                          value={values.estimateStartDate}
                          onChange={(value) => {
                            setFieldValue("startDate", value);
                          }}
                          error={Boolean(touched.startDate && errors.startDate)}
                        />
                      </LocalizationProvider>
                      {touched.startDate && errors.startDate && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-EstimateStartDate"
                        >
                          {errors.startDate}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="touristAttraction"
                        name="touristAttraction"
                        label="Địa điểm tham quan"
                        fullWidth
                        variant="outlined"
                        value={values.touristAttraction}
                        onChange={handleChange}
                        error={Boolean(
                          touched.touristAttraction && errors.touristAttraction
                        )}
                      />
                      {touched.touristAttraction &&
                        errors.touristAttraction && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-TripName"
                          >
                            {errors.touristAttraction}
                          </FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="tripNote"
                        name="tripNote"
                        label="Ghi chú"
                        fullWidth
                        autoComplete=""
                        variant="outlined"
                        value={values.tripNote}
                        onChange={handleChange}
                        error={Boolean(touched.tripNote && errors.tripNote)}
                      />
                      {touched.tripNote && errors.tripNote && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-TripDescription"
                        >
                          {errors.tripNote}
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
