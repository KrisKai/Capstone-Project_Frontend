import {
  Box,
  Button,
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

const listNavItems = [
  {
    display: "Trang chủ",
    link: "/",
  },
  {
    display: "Điểm dừng chân",
    link: "",
  },
  {
    display: "Cẩm nang đi phượt",
    link: "/login",
  },
  // {
  //   display: "Đăng ký",
  //   link: "/register",
  // },
];

const Header = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${HomeImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        paddingX: 10,
        paddingY: 5,
      }}
    >
      <Grid container sx={{ display: "flex" }}>
        <Grid item xs={2}>
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
        <Grid item xs={6}>
          <List
            component="nav"
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            {listNavItems.map((item, idx) => {
              return (
                <>
                  <ListItem
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      paddingX: "8px",
                    }}
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
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
          }}
        >
          <Box>
            <Button>Đăng nhập</Button>
            <Button>Đăng ký</Button>
          </Box>
        </Grid>
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
        <Box mt="20px">
          <TextField
            sx={{
              border: "1px solid rgb(162, 192, 222)",
              width: "25%",
              borderRadius: "10px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
