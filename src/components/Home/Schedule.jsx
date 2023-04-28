import { Box, Card, CardMedia, Grid } from "@mui/material";
import Icon1 from "assets/images/icon_1.svg";
import Icon2 from "assets/images/icon_2.svg";
import Icon3 from "assets/images/icon_3.svg";
import Icon4 from "assets/images/icon_4.svg";

const list = [Icon1, Icon2, Icon3, Icon4];

const Schedule = () => {
  return (
    <Grid container spacing={2}>
      {list.map((data, idx) => {
        return (
          <Grid
            item
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
            key={idx}
          >
            <Box sx={{ display: "flex" }}>
              <Card sx={{ border: "1px solid black", width: 150, height: 150 }}>
                <CardMedia image={data} sx={{ height: "100%" }}></CardMedia>
              </Card>
              <div>Lên lịch đi bạn ơi</div>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Schedule;
