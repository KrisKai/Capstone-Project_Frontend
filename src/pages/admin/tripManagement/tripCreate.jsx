import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserCreate() {
  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('fldTripName'));
    //AuthContext.login(data.get('email'),data.get('password'));
    // dispatch(
    //   handleLogin({
    //     Username: data.get("email"),
    //     Password: data.get("password"),
    //   })
    // );
  };

  function gotoList() {
    navigate("/admin/tripList");
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Đăng ký chuyến đi
      </Typography>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="fldTripName"
              name="fldTripName"
              label="Tên chuyến đi"
              fullWidth
              variant="standard"
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
