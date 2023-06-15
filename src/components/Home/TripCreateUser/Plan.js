import { Box, Card, CardMedia, Container, Grid, Typography } from "@mui/material";
import Image1 from "assets/images/unsplash_1.png";
import Image2 from "assets/images/unsplash_2.png";
import Image3 from "assets/images/unsplash_3.png";
import Image4 from "assets/images/unsplash_4.png";
import { Carousel } from "components/Extend";
// import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const list = [Image1, Image2, Image3, Image4];

const RateCard = (props) => {
  return (
    <Card sx={{ minWidth: "295px", minHeight: "200px" }}>
      <CardMedia image={props.data} sx={{ height: "100%" }}></CardMedia>
    </Card>
  );
};

const Plan = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" marginBottom={2} sx={{ fontSize: "1.5 rem", fontWeight:700 }}>
          {/* <CalendarMonthOutlinedIcon />*/} Kế hoạch cho chuyến đi 
        </Typography>
      </Grid>

      <Grid item xs={12}>
        
        <hr />
      </Grid>
    </Grid>
  );
};

export default Plan;
