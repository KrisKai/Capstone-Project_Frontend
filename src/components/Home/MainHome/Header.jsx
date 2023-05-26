import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import HomeImage from "assets/images/index_img.png";
import Logo from "assets/images/logo.svg";

const listNavItems = [
  {
    display: "Trang chủ",
    link: "/",
  },
  {
    display: "Cẩm nang đi phượt",
    link: "",
  },
  ,
  {
    display: "Đăng nhập",
    link: "/login",
  },
  ,
  {
    display: "Đăng ký",
    link: "/register",
  },
];

const Header = () => {
  const goToLogin = () => {
    window.location.href = "/login";
  }
  return (
    <Box
      sx={{
        backgroundImage: `url(${HomeImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        padding: 10,
      }}
    >
      <Container
        sx={{
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          height: "100%",
          backgroundImage: `url(${HomeImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          paddingY: 4,
        }}
      >
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid item xs={3}>
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
          <Grid item xs={9}>
            <List
              component="nav"
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                borderBottom: "1px solid black",
                "&::before, &::after": {
                  content: '""',
                  height: "5px",
                  width: "5px",
                  position: "absolute",
                  bottom: -3,
                  background: "#000000",
                  borderRadius: "50%",
                },
                "&::after": {
                  content: '""',
                  height: "5px",
                  width: "5px",
                  position: "absolute",
                  bottom: -3,
                  right: 0,
                  background: "#000000",
                  borderRadius: "50%",
                },
              }}
            >
              {listNavItems.map((item, idx) => {
                return (
                  <>
                    <ListItem
                      key={idx}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Link
                        style={{
                          fontWeight: 600,
                          fontSize: "16px",
                          textDecoration: "none",
                          color: "black",
                        }}
                        to={item.link}
                      >
                        {item.display}
                      </Link>
                    </ListItem>
                  </>
                );
              })}
            </List>
          </Grid>
        </Grid>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography component="h1" fontSize="60px" fontWeight={900}>
            Journey Sick
          </Typography>
          <Typography component="h3" fontSize="20px" fontWeight={400}>
            Không phải ai lang thang cũng là người đi lạc
          </Typography>
          <Box mt="68px">
            <Button
              variant="contained"
              sx={{
                background: "rgba(104, 159, 56, 0.72)",
                boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.25)",
                borderRadius: "80px",
                padding: "17px 40px",
                fontWeight: 900,
                fontSize: "20px",
              }}
              onClick={goToLogin}
            >
              Bắt Đầu
            </Button>
          </Box>
        </Container>
      </Container>
    </Box>
  );
};

export default Header;
