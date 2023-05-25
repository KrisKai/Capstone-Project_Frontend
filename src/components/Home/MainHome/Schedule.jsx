import { Box, Card, CardMedia, Grid } from "@mui/material";
import Icon1 from "assets/images/icon_1.svg";
import Icon2 from "assets/images/icon_2.svg";
import Icon3 from "assets/images/icon_3.svg";
import Icon4 from "assets/images/icon_4.svg";

const list = [{
  image: Icon1,
  title: "Khám phá nhiều địa điểm thú vị",
},{
  image: Icon2,
  title: "Chọn cụ thể từ map",
},{
  image: Icon3,
  title: "Kết nối được nhiều người mới",
},{
  image: Icon4,
  title: "Quản lí lịch trình cụ thể",
}];

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
              <Card sx={{ width: 300, height: 300 }}>
                <CardMedia image={data.image} sx={{ height: "100%" }}></CardMedia>
              </Card>
              <div>{data.title}</div>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Schedule;
