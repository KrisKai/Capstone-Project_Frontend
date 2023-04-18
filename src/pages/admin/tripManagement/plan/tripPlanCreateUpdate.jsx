import { Button, FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { tripPlanApi, tripApi } from "api";
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
  const { tripId, planId } = useParams();
  const isEdit = Boolean(planId);
  const [plan, setPlan] = useState({
    fldTripId: "",
    fldPlanDescription: null,
  });
  const [trip, setTrip] = useState({
    fldTripId: "",
    fldTripName: "",
  });
  useEffect(() => {
    // IFFE
    (async () => {
      const response = await tripApi.getAll({
        pageIndex: 0,
        pageSize: 99999999,
        tripName: "",
      });
      setTrip(response.listOfTrip);
      if (!tripId || !planId) return;
      try {
        console.log(planId)
        const data = await tripPlanApi.getById(planId);
        if (data != null && data != "") {
          setPlan(data);
        } else {
          navigate(`/admin/tripPlanList/${tripId}`);
        }
      } catch (error) {
        console.log("Failed to fetch trip plan", error);
        if (error.response.status == 401) {
          localStorage.removeItem("access_token");
          navigate("/auth/login");
        }
      }
    })();
  }, [tripId]);

  function gotoList() {
    navigate(`/admin/tripPlanList/${tripId}`);
  }

  const validationSchema = yup.object().shape({
    fldPlanDescription: yup
      .string("Enter Plan Description")
      .required("Plan Description is required"),
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {isEdit ? "Update Trip Plan" : "Create Trip Plan"}
      </Typography>
      <Formik
        initialValues={plan}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors, setStatus }) => {
          try {
            setStatus({ success: false });

            console.log(1);
            let reponse;
            if (isEdit) {
              reponse = await tripPlanApi.update(values);
            } else {
              reponse = await tripPlanApi.create(values);
            }

            switch (reponse.Code) {
              case "G001":
                return toast.error(reponse.Message);
              case "U001":
                return toast.error(reponse.Message);
              case "I001":
                return toast.error(reponse.Message);
              default: {
                if (reponse > 0) {
                  navigate(`/admin/tripPlanList/${tripId}`);
                  if (isEdit) {
                    toast.success("Update Trip Plan Successed!");
                  } else {
                    toast.success("Create Trip Plan Successed!");
                  }
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
                  id="fldTripId"
                  name="fldTripId"
                  label="Trip Name"
                  fullWidth
                  variant="standard"
                  value={tripId}
                  onChange={handleChange}
                  error={Boolean(touched.fldTripId && errors.fldTripId)}
                />
                {touched.fldTripId && errors.fldTripId && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-fldTripId"
                  >
                    {errors.fldTripId}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="fldPlanDescription"
                  name="fldPlanDescription"
                  label="Plan Description"
                  fullWidth
                  variant="standard"
                  value={values.fldPlanDescription}
                  onChange={handleChange}
                  error={Boolean(
                    touched.fldPlanDescription && errors.fldPlanDescription
                  )}
                />
                {touched.fldPlanDescription && errors.fldPlanDescription && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-fldPlanDescription"
                  >
                    {errors.fldPlanDescription}
                  </FormHelperText>
                )}
              </Grid>
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
