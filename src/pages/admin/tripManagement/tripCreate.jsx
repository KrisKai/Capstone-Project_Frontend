import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserCreate() {
  let navigate = useNavigate();

  function gotoList() {
    navigate("/admin/tripList");
  }

  const validationSchema = yup.object({
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
    fldTripMember: yup.number().integer().min(1).required("Trip Member is required"),
  });

  const formik = useFormik({
    initialValues: {
      fldTripName: "",
      fldTripBudget: "",
      fldTripDescription: "",
      fldEstimateStartTime: "",
      fldEstimateArrivalTime: "",
      fldTripMember: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 6));
      console.log(JSON.stringify(values, null, 6));
    },
  });
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Đăng ký chuyến đi
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="fldTripName"
              name="fldTripName"
              label="Tên chuyến đi"
              fullWidth
              variant="standard"
              value={formik.values.fldTripName}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="fldTripBudget"
              name="fldTripBudget"
              label="Kinh phí chuyến đi"
              fullWidth
              variant="standard"
              value={formik.values.fldTripBudget}
              onChange={formik.handleChange}
            />
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
              value={formik.values.fldTripDescription}
              onChange={formik.handleChange}
            />
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
              value={formik.values.fldEstimateStartTime}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="fldEstimateArrivalTime"
              name="fldEstimateArrivalTime"
              label="Thời gian đến dự tính"
              fullWidth
              variant="standard"
              value={formik.values.fldEstimateArrivalTime}
              onChange={formik.handleChange}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormLabel id="fldTripStatus-label">Tình trạng chuyến đi</FormLabel>
            <RadioGroup
              row
              aria-labelledby="fldTripStatus-label"
              name="fldTripStatus"
              id="fldTripStatus"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="fldTripMember"
              name="fldTripMember"
              label="Số lượng thành viên"
              fullWidth
              variant="standard"
              value={formik.values.fldTripMember}
              onChange={formik.handleChange}
            />
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
    </React.Fragment>
  );
}
