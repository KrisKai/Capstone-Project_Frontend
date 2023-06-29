import { Box, Container, Grid, Typography } from "@mui/material";
import Icon1 from "assets/images/icon_1.svg";
import Icon2 from "assets/images/icon_2.svg";
import Icon3 from "assets/images/icon_3.svg";
import Icon4 from "assets/images/icon_4.svg";

const list = [
  {
    image: Icon1,
    title: "Khám phá nhiều địa điểm thú vị",
    content: "Giúp cho bạn chuẩn bị kỹ càng cho chuyến đi của mình",
  },
  {
    image: Icon2,
    title: "Chọn cụ thể từ map",
    content: "Giúp chỉ đường chính xác và có đầy đủ thông tin trên bản đồ",
  },
  {
    image: Icon3,
    title: "Kết nối được nhiều người mới",
    content:
      "Tính năng này giúp cho bạn có thể tham gia vào chuyến đi của người khác",
  },
  {
    image: Icon4,
    title: "Quản lí lịch trình cụ thể",
    content: "Giời ý cho bạn các tuyến đường thú vị trong chuyến đi của bạn",
  },
];

const Schedule = () => {
  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h2">Các tính năng nổi bật</Typography>
          <Box width="60%" border="1px solid black" mt={1}></Box>
        </Box>
      </Box>
      <Grid container spacing={4} mt={1}>
        {list.map((data, idx) => {
          return (
            <Grid
              item
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              key={idx}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component="img"
                  sx={{
                    width: "200px",
                    aspectRatio: "1 / 1",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                  src={data.image}
                ></Box>
                <Box ml={1}>
                  <Typography variant="h4">{data.title}</Typography>
                  <Typography variant="h6">{data.content}</Typography>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Schedule;
