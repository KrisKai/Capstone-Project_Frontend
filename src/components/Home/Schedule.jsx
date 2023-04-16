import { Box, Card, Grid } from "@mui/material";

const Schedule = () => {
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Box sx={{ display: "flex" }}>
          <Card
            sx={{ border: "1px solid black", width: 300, height: 300 }}
          ></Card>
          <div>Lên lịch đi bạn ơi</div>
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box sx={{ display: "flex" }}>
          <Card
            sx={{ border: "1px solid black", width: 300, height: 300 }}
          ></Card>
          <div>Lên lịch đi bạn ơi</div>
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box sx={{ display: "flex" }}>
          <Card
            sx={{ border: "1px solid black", width: 300, height: 300 }}
          ></Card>
          <div>Lên lịch đi bạn ơi</div>
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box sx={{ display: "flex" }}>
          <Card
            sx={{ border: "1px solid black", width: 300, height: 300 }}
          ></Card>
          <div>Lên lịch đi bạn ơi</div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Schedule;
