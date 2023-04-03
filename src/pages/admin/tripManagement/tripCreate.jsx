import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tripApi } from "api";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { openAlert } from "redux/modules/menu/menuSlice";

export default function UserCreate() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const menu = useAppSelector((state) => state.menu);
  const { errorMsg, open } = menu;

  function gotoList() {
    navigate("/admin/tripList");
    dispatch(
      openAlert({ errorMsg: "Create Trip Successed!", open: true })
    );
  }

  const validationSchema = yup.object().shape({
    fldTripName: yup
      .string("Enter Trip Name")
      .required("Trip Name is required"),
    fldTripBudget: yup
      .string("Enter Trip Budget")
      .required("Trip Budget is required"),
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
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Đăng ký chuyến đi
      </Typography>
      <Formik
        initialValues={{
          fldTripName: "",
          fldTripBudget: "",
          fldTripDescription: "",
          fldEstimateStartTime: "",
          fldEstimateArrivalTime: "",
          fldTripMember: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors, setStatus }) => {
          try {
            setStatus({ success: false });
            alert(JSON.stringify(values, null, 2));
            const reponse = await tripApi.create(values);
            if (reponse > 0) {
              navigate("/admin/tripList");
              dispatch(
                openAlert({ errorMsg: "Create Trip Successed!", open: true })
              );
            }
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
          }
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="fldTripName"
                  name="fldTripName"
                  label="Tên chuyến đi"
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
                  label="Kinh phí chuyến đi"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={values.fldTripBudget}
                  onChange={handleChange}
                  error={Boolean(touched.fldTripBudget && errors.fldTripBudget)}
                />
                {touched.fldTripBudget && errors.fldTripBudget && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-fldTripBudget"
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
                  label="Mô tả chuyến đi"
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
                <TextField
                  required
                  id="fldEstimateStartTime"
                  name="fldEstimateStartTime"
                  label="Thời gian bắt đầu dự tính"
                  fullWidth
                  autoComplete=""
                  variant="standard"
                  value={values.fldEstimateStartTime}
                  onChange={handleChange}
                  error={Boolean(
                    touched.fldEstimateStartTime && errors.fldEstimateStartTime
                  )}
                />
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
                <TextField
                  required
                  id="fldEstimateArrivalTime"
                  name="fldEstimateArrivalTime"
                  label="Thời gian đến dự tính"
                  fullWidth
                  variant="standard"
                  value={values.fldEstimateArrivalTime}
                  onChange={handleChange}
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="fldTripMember"
                  name="fldTripMember"
                  label="Số lượng thành viên"
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
                  Trở về danh sách
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} textAlign="right">
                <Button type="submit" variant="outlined">
                  Đăng kí
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
}
