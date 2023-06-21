import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

import HomeImage from "assets/images/index_img.png";
import Logo from "assets/images/logo.svg";
import ProfileUser from "layout/MainLayout/Header/HeaderContent/Profile/ProfileUser";

const listNavItems = [
  {
    key: 1,
    display: "Trang chủ",
    link: "/",
  },
  {
    key: 2,
    display: "Điểm dừng chân",
    link: "/maintenance",
  },
  {
    key: 3,
    display: "Cẩm nang đi phượt",
    link: "/maintenance",
  },
  {
    key: 4,
    display: "Quản lí chuyến đi",
    link: "/tripManagement",
  },
];

const UserHeader = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${HomeImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "50vh",
        paddingX: 10,
        paddingY: 5,
      }}
    >
      <Grid container sx={{ display: "flex" }}>
        <Grid item xs={12} sm={2}>
          <Container
            className="d-flex"
            sx={{
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box>
              <img src={Logo}></img>
            </Box>
            <Typography color="#168843" fontSize="25px" fontWeight={700}>
              Journey Sick
            </Typography>
          </Container>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              p: 1,
              m: 1,
              borderRadius: 1,
            }}
          >
            {listNavItems.map((item, index) => {
              return (
                <Box marginRight={3} key={index}>
                  <Link
                    style={{
                      fontWeight: 600,
                      fontSize: "20px",
                      textDecoration: "none",
                      color: "black",
                    }}
                    to={item.link}
                  >
                    {item.display}
                  </Link>
                </Box>
              );
            })}
          </Box>
          <List
            component="nav"
            sx={{
              display: "flex",
              height: "100%",
              flexDirection: "row",
            }}
          ></List>
        </Grid>
        <Grid item xs={12} sm={1} marginTop={2}>
          <ProfileUser />
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
          }}
        ></Grid>
      </Grid>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography component="h1" fontSize="60px" fontWeight={900}>
          Journey Sick
        </Typography>
        <Typography component="h3" fontSize="20px" fontWeight={400}>
          Không phải ai lang thang cũng là người đi lạc
        </Typography>
      </Container>
    </Box>
  );
};

export default UserHeader;
