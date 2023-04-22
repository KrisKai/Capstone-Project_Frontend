import { Box, Card, CardMedia, Grid } from "@mui/material";
import Map1 from "assets/images/map_1.png";

const Schedule = () => {
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Box sx={{ display: "flex" }}>
          <Card sx={{ border: "1px solid black", width: 300, height: 300 }}>
            <CardMedia image={Map1} sx={{ height: "100%" }}></CardMedia>
          </Card>
          <div>Lên lịch đi bạn ơi</div>
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box sx={{ display: "flex" }}>
          <Card sx={{ border: "1px solid black", width: 300, height: 300 }}>
            <CardMedia image={Map1} sx={{ height: "100%" }}></CardMedia>
          </Card>
          <div>Lên lịch đi bạn ơi</div>
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box sx={{ display: "flex" }}>
          <Card sx={{ border: "1px solid black", width: 300, height: 300 }}>
            <CardMedia image={Map1} sx={{ height: "100%" }}></CardMedia>
          </Card>
          <div>Lên lịch đi bạn ơi</div>
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box sx={{ display: "flex" }}>
          <Card sx={{ border: "1px solid black", width: 300, height: 300 }}>
            <CardMedia image={Map1} sx={{ height: "100%" }}></CardMedia>
          </Card>
          <div>Lên lịch đi bạn ơi</div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Schedule;
