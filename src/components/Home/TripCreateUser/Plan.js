import { useEffect } from "react";
import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";

// import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const Plan = (props) => {
  useEffect(() => {
    console.log(props.item);
  }, []);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          marginBottom={2}
          sx={{ fontSize: "1.5 rem", fontWeight: 700 }}
        >
          {/* <CalendarMonthOutlinedIcon />*/} Kế hoạch cho chuyến đi
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ p: 3 }}>
        <TextField
          fullWidth
          sx={{ backgroundColor: "#f3f4f5" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PlaceIcon sx={{ marginRight: 1 }} /> Thêm địa điểm
              </InputAdornment>
            ),
          }}
        />
        <hr />
      </Grid>
    </Grid>
  );
};

export default Plan;
