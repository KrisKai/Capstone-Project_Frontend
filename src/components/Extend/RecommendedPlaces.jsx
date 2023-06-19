import { PLACE_API } from "config";
import {
  TextField,
  Button,
  Card,
  Typography,
  IconButton,
  Grid,
  Collapse,
  CardHeader,
  Box,
  CardMedia,
  CardActions,
  CardActionArea,
} from "@mui/material";
import { useEffect, useState } from "react";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Carousel from "react-material-ui-carousel";

const PlaceCard = (props) => {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        {props.group.map((item, i) => (
          <Card
            key={i}
            sx={{
              display: "flex",
              width: "250px",
              height: "70px",
              marginRight: "8px",
              borderStyle: "dashed",
              border: "1px",
            }}
            onClick={() => props.onClickData(item)}
          >
            <CardMedia
              component="img"
              image={
                item.photo
                  ? item.photo.images.small.url
                  : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
              }
              sx={{ width: "30%" }}
            />
            <CardActionArea>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                justifyContent="center"
                alignItems="center"
                marginLeft={1}
              >
                <Typography>{item.name}</Typography>
              </Box>
            </CardActionArea>
            <CardActions>
              <IconButton>
                <Box
                  width="30px"
                  sx={{
                    aspectRatio: "1/1",
                    backgroundColor: "#f3f4f5",
                  }}
                  display="flex"
                  alignItems=" center"
                  justifyContent="center"
                  borderRadius="50%"
                >
                  <Typography>+</Typography>
                </Box>
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};

const RecommendedPlaces = (props) => {
  const [open, setOpen] = useState(false);
  const [openRestaurants, setOpenRestaurants] = useState(false);
  const [openHotels, setOpenHotels] = useState(false);
  const [openAttractions, setOpenAttractions] = useState(false);

  var restaurantsList = props.restaurants;
  var hotelsList = props.hotels;
  var attractionsList = props.attractions;

  const groupedRestaurants = [];
  for (let i = 0; i < restaurantsList.length; i += 3) {
    const group = restaurantsList.slice(i, i + 3);
    groupedRestaurants.push(group);
  }
  const groupedHotels = [];
  for (let i = 0; i < hotelsList.length; i += 3) {
    const group = hotelsList.slice(i, i + 3);
    groupedHotels.push(group);
  }
  const groupedAttractions = [];
  for (let i = 0; i < attractionsList.length; i += 3) {
    const group = attractionsList.slice(i, i + 3);
    groupedAttractions.push(group);
  }

  // console.log(props);
  return (
    <>
      <Box
        sx={{
          margin: 1,
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={1}>
            <IconButton
              onClick={() => setOpen(!open)}
              aria-label="expand"
              size="small"
            >
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={11} pt={0.5}>
            Gợi ý địa điểm
          </Grid>
        </Grid>
        <div>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{ pl: 2, pr: 2 }}
          >
            <Grid container>
              <Grid item xs={12} sm={1}>
                <IconButton
                  onClick={() => setOpenRestaurants(!openRestaurants)}
                  aria-label="expand"
                  size="small"
                >
                  {openRestaurants ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowRightIcon />
                  )}
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={11} pt={0.5}>
                Nhà hàng
              </Grid>
            </Grid>
            <div>
              <Collapse in={openRestaurants} timeout="auto" unmountOnExit>
                <Carousel
                  sx={{
                    height: "70px",
                  }}
                  indicators={false}
                  navButtonsWrapperProps={{
                    // Move the buttons to the bottom. Unsetting top here to override default style.
                    style: {
                      bottom: "0",
                      top: "unset",
                    },
                  }}
                >
                  {groupedRestaurants.map((group, index) => (
                    <PlaceCard
                      key={index}
                      group={group}
                      onClickData={props.onClickData}
                    />
                  ))}
                </Carousel>
                <hr />
              </Collapse>
            </div>
            <Grid container>
              <Grid item xs={12} sm={1}>
                <IconButton
                  onClick={() => setOpenHotels(!openHotels)}
                  aria-label="expand"
                  size="small"
                >
                  {openHotels ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowRightIcon />
                  )}
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={11} pt={0.5}>
                Khách sạn
              </Grid>
            </Grid>
            <div>
              <Collapse in={openHotels} timeout="auto" unmountOnExit>
                <Carousel
                  sx={{
                    height: "70px",
                  }}
                  indicators={false}
                  navButtonsWrapperProps={{
                    // Move the buttons to the bottom. Unsetting top here to override default style.
                    style: {
                      bottom: "0",
                      top: "unset",
                    },
                  }}
                >
                  {groupedHotels.map((group, index) => (
                    <PlaceCard
                      key={index}
                      group={group}
                      onClickData={props.onClickData}
                    />
                  ))}
                </Carousel>
                <hr />
              </Collapse>
            </div>
            <Grid container>
              <Grid item xs={12} sm={1}>
                <IconButton
                  onClick={() => setOpenAttractions(!openAttractions)}
                  aria-label="expand"
                  size="small"
                >
                  {openAttractions ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowRightIcon />
                  )}
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={11} pt={0.5}>
                Khu du lịch
              </Grid>
            </Grid>
            <div>
              <Collapse in={openAttractions} timeout="auto" unmountOnExit>
                <Carousel
                  sx={{
                    height: "70px",
                  }}
                  indicators={false}
                  navButtonsWrapperProps={{
                    // Move the buttons to the bottom. Unsetting top here to override default style.
                    style: {
                      bottom: "0",
                      top: "unset",
                    },
                  }}
                >
                  {groupedAttractions.map((group, index) => (
                    <PlaceCard
                      key={index}
                      group={group}
                      onClickData={props.onClickData}
                    />
                  ))}
                </Carousel>
                <hr />
              </Collapse>
            </div>
          </Collapse>
        </div>
      </Box>
    </>
  );
};

export default RecommendedPlaces;
