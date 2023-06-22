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
import { GOOGLE_MAP_API } from "config";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

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
            onClick={() => {
              props.onClickData(item);
              props.handleClickData(props.index, props.childIndex, item);
            }}
          >
            <CardMedia
              component="img"
              image={
                item.photos
                  ? item.photos[0].getUrl({ maxWidth: 70, maxHeight: 70 })
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
                <Typography>
                  {item.name}
                </Typography>
              </Box>
            </CardActionArea>
            <CardActions>
              <IconButton >
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
  const { placesService } = usePlacesService({
    apiKey: GOOGLE_MAP_API,
  });

  const [groupedRestaurants, setGroupedRestaurants] = useState([]);
  const [groupedHotels, setGroupedHotels] = useState([]);
  const [groupedAttractions, setGroupedAttractions] = useState([]);

  const coor = {
    lat: parseFloat(props.trip.endLatitude),
    lng: parseFloat(props.trip.endLongitude),
  };
  function handleGetRestaurants() {
    placesService.nearbySearch(
      {
        location: coor,
        radius: 5000,
        type: "restaurant",
        fields: ["name", "formatted_address", "price_level"],
      },
      (results, status) => {
        console.log(results);
        // eslint-disable-next-line no-undef
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const groups = [];
          for (let i = 0; i < results.length; i += 3) {
            const group = results.slice(i, i + 3);
            groups.push(group);
          }
          setGroupedRestaurants(groups);
          // Access the details of the place here
        } else {
          console.error("Error:", status);
        }
      }
    );
  }
  function handleGetHotels() {
    placesService.nearbySearch(
      {
        location: coor,
        radius: 5000,
        type: "lodging",
      },
      (results, status) => {
        console.log(results);
        // eslint-disable-next-line no-undef
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const groups = [];
          for (let i = 0; i < results.length; i += 3) {
            const group = results.slice(i, i + 3);
            groups.push(group);
          }
          setGroupedHotels(groups);
          // Access the details of the place here
        } else {
          console.error("Error:", status);
        }
      }
    );
  }

  function handleGetAttractions() {
    placesService.nearbySearch(
      {
        location: coor,
        radius: 5000,
        type: "tourist_attraction",
      },
      (results, status) => {
        console.log(results);
        // eslint-disable-next-line no-undef
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const groups = [];
          for (let i = 0; i < results.length; i += 3) {
            const group = results.slice(i, i + 3);
            groups.push(group);
          }
          setGroupedAttractions(groups);
          // Access the details of the place here
        } else {
          console.error("Error:", status);
        }
      }
    );
  }
  return (
    <>
      <Box
        sx={{
          margin: 1,
          marginLeft: 6,
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
          <Grid item xs={12} sm={5} pt={0.5} sx={{ fontWeight: 700 }}>
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
                  onClick={() => {
                    setOpenRestaurants(!openRestaurants);
                    handleGetRestaurants();
                  }}
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
                    height: "80px",
                  }}
                  indicators={false}
                  autoPlay={false}
                  cycleNavigation={false}
                >
                  {groupedRestaurants.map((group, index) => (
                    <PlaceCard
                      key={index}
                      index={props.index}
                      childIndex={props.childIndex}
                      group={group}
                      onClickData={props.onClickData}
                      handleClickData={props.handleClickData}
                    />
                  ))}
                </Carousel>
                <hr />
              </Collapse>
            </div>
            <Grid container>
              <Grid item xs={12} sm={1}>
                <IconButton
                  onClick={() => {
                    setOpenHotels(!openHotels);
                    handleGetHotels();
                  }}
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
                    height: "80px",
                  }}
                  indicators={false}
                  autoPlay={false}
                  cycleNavigation={false}
                >
                  {groupedHotels.map((group, index) => (
                    <PlaceCard
                      key={index}
                      index={props.index}
                      childIndex={props.childIndex}
                      group={group}
                      onClickData={props.onClickData}
                      handleClickData={props.handleClickData}
                    />
                  ))}
                </Carousel>
                <hr />
              </Collapse>
            </div>
            <Grid container>
              <Grid item xs={12} sm={1}>
                <IconButton
                  onClick={() => {
                    setOpenAttractions(!openAttractions);
                    handleGetAttractions();
                  }}
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
                    height: "80px",
                  }}
                  indicators={false}
                  autoPlay={false}
                  cycleNavigation={false}
                >
                  {groupedAttractions.map((group, index) => (
                    <PlaceCard
                      key={index}
                      index={props.index}
                      childIndex={props.childIndex}
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
