import {
  Card,
  Typography,
  IconButton,
  Grid,
  Collapse,
  Box,
  CardMedia,
  CardActions,
  CardActionArea,
  Button,
} from "@mui/material";
import { useState } from "react";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Carousel from "react-material-ui-carousel";
import { GOOGLE_MAP_API } from "config";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { getPlacesProps } from "api/user/placesAPI";
import { useEffect } from "react";

const PlaceCard = (props) => {
  return (
    <>
      <Box display="flex" gap={1}>
        {props.group.map((item, i) => (
          <Card
            key={i}
            sx={{
              display: "flex",
              width: "50%",
              height: "90px",
              marginRight: "8px",
              border: "1px dashed #dee2e6",
              boxShadow: "none",
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
                <Typography>{item.name}</Typography>
              </Box>
            </CardActionArea>
            <CardActions>
              <IconButton
                sx={{
                  height: "35px",
                  width: "35px",
                  aspectRatio: "1/1",
                  backgroundColor: "#f3f4f5",
                  borderRadius: "50%",
                  alignItems: " center",
                  justifyContent: "center",
                }}
              >
                +
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

  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [attractions, setAttractions] = useState([]);

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
        type: ["restaurant"],
        fields: ["name", "formatted_address"],
      },
      (results, status) => {
        // eslint-disable-next-line no-undef
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setRestaurants(results);
          // Access the details of the place here
        } else {
          console.error("Error:", status);
        }
      }
    );
    placesService.nearbySearch(
      {
        location: coor,
        radius: 5000,
        type: "lodging",
      },
      (results, status) => {
        // eslint-disable-next-line no-undef
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setHotels(results);
        } else {
          console.error("Error:", status);
        }
      }
    );
    placesService.nearbySearch(
      {
        location: coor,
        radius: 5000,
        type: "tourist_attraction",
      },
      (results, status) => {
        // eslint-disable-next-line no-undef
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setAttractions(results);
        } else {
          console.error("Error:", status);
        }
      }
    );
  }

  useEffect(() => {
    async function getAllPlaces() {
      const place = [...restaurants, ...hotels, ...attractions];
      console.log(place);
      if (place.length > 0) {
        const groups = [];
        const queryParams = {
          user_profiles: props.currentInfo.userInterestList,
          place_data: place,
        };
        const data = await getPlacesProps(queryParams);

        const finalList = data.map((item) => item.name);
        place.sort((a, b) => {
          const nameA = a.name;
          const nameB = b.name;
          return finalList.indexOf(nameA) - finalList.indexOf(nameB);
        });

        for (let i = 0; i < place.length; i += 2) {
          const group = place.slice(i, i + 2);
          groups.push(group);
        }

        setGroupedRestaurants(groups);
      }
    }
    getAllPlaces();
  }, [restaurants, hotels, attractions]);

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
              onClick={() => {
                setOpen(!open);
                handleGetRestaurants();
              }}
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
            <Carousel
              sx={{
                height: "90px",
                pl: 6,
                pr: 6,
              }}
              indicators={false}
              autoPlay={false}
              cycleNavigation={false}
              navButtonsAlwaysVisible={true}
              navButtonsProps={{
                // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                style: {
                  backgroundColor: "#f3f4f5",
                  borderRadius: "50%",
                  color: "black",
                },
              }}
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
      </Box>
    </>
  );
};

export default RecommendedPlaces;
