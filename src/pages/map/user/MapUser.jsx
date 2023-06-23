import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Card, Typography, Grid } from "@mui/material";
import {
  Autocomplete,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { GOOGLE_MAP_API } from "config";
import "../admin/map.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faClock,
  faEarthAmericas,
  faMapMarkerAlt,
  faPhone,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useRef, useState, useEffect } from "react";
import Google from "assets/images/google_logo.png";
import GoogleMaps from "assets/images/google_maps_logo.png";
import TripAdvisor from "assets/images/tripadvisor_logo.png";

import dayjs from "dayjs";

const color = [
  "red",
  "black",
  "blue",
  "green",
  "grey",
  "orange",
  "purple",
  "white",
  "yellow",
];

export default function Map({
  passToProps,
  selectedData,
  plans,
  selectedIndex,
  placeStatus,
  handleAddPlaces,
}) {
  let now = dayjs().locale("vi").format("d");
  if (now === 0) {
    now = 6;
  } else {
    now -= 1;
  }
  const center = {
    lat: parseFloat(passToProps.endLatitude),
    lng: parseFloat(passToProps.endLongitude),
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API,
    libraries: ["places"],
  });

  // const waypoints = [
  //   { location: "Hue" },
  //   { location: "Da Nang" },
  //   { location: "Quang Nam" },
  //   { location: "Binh Thuan" },
  // ];

  const { placesService } = usePlacesService({
    apiKey: GOOGLE_MAP_API,
  });

  const restrictions = {
    country: "vn",
  };

  const [directionsOptions, setDirectionsOptions] = useState({
    suppressMarkers: true,
    optimizeWaypoints: true,
    polylineOptions: {
      strokeColor: "blue", // Initial color
    },
  });

  const data = selectedData;

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  console.log(plans);

  const markers = useRef([]);

  useEffect(() => {}, [map, plans]);

  useEffect(() => {
    setDirectionsOptions({
      suppressMarkers: true,
      optimizeWaypoints: true,
      polylineOptions: {
        strokeColor: color[selectedIndex], // Set the desired color here
      },
    });
    if (map && plans.length > 0) {
      const waypoints = plans[selectedIndex].tripRoute
        .filter((route) => route.locationName !== "")
        .map((route) => ({ location: route.locationName }));
      calculateRoute(waypoints);
    }
  }, [selectedIndex]);

  async function calculateRoute(waypoints) {
    const request = {
      origin: waypoints[0].location,
      destination: waypoints[waypoints.length - 1].location,
      waypoints: waypoints.slice(1, -1),
      travelMode: "DRIVING",
      optimizeWaypoints: true,
    };
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route(request);
    setDirectionsResponse(results);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
  }

  function handleAddPlace(data) {
    handleAddPlaces(selectedIndex, data);
  }

  function handleClickMarker(data) {
    const coor = JSON.stringify(data.latLng);
    placesService.nearbySearch(
      {
        location: JSON.parse(coor),
        radius: 500,
        type: "tourist_attraction",
      },
      (results, status) => {
        console.log(results);
        // eslint-disable-next-line no-undef
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            const place = results[i];
            console.log("Place:", place);
            // Access other properties of the place here

            if (place.photos && place.photos.length > 0) {
              const photo = place.photos[0];
              const photoUrl = photo.getUrl({ maxWidth: 500, maxHeight: 500 });
              console.log("Photo URL:", photoUrl);
              // Use the photo URL here
            }
          }
          // Access the details of the place here
        } else {
          console.error("Error:", status);
        }
      }
    );
  }

  return (
    <>
      {!isLoaded ? (
        "a"
      ) : (
        <Box height="90vh" width="57%" display="flex" position="fixed">
          <Box height="100%" flex="1 1 0" position="relative">
            {data && (
              <Box
                bgcolor={"white"}
                display="flex"
                justifyContent="space-between"
                width="97%"
                position="absolute"
                zIndex={100}
                padding={2}
                margin={2}
                boxShadow={2}
                borderRadius={2}
                bottom={0}
                paddingLeft={5}
              >
                <Grid container>
                  <Grid item xs={12} sm={10} display="flex" alignItems="center">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      size="lg"
                      style={{ marginRight: "8px" }}
                    />
                    <Typography variant="h5">{data.name}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <img
                      src={data.photos && data.photos[0].getUrl()}
                      alt="Image"
                      style={{
                        width: "100%",
                        height: "100px",
                        borderRadius: 5,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} display="flex" alignItems="center">
                    {placeStatus ? (
                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: 10,
                          fontWeight: 600,
                          height: "32px",
                          marginRight: 2,
                          backgroundColor: "#f3f4f5",
                          color: "#6c757d",
                          border: "none",
                        }}
                      >
                        <FontAwesomeIcon icon={faBookmark} />{" "}
                        <Typography
                          marginTop={0.5}
                          marginLeft={1}
                          sx={{ fontWeight: 600 }}
                        >
                          Đã thêm
                        </Typography>
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: 10,
                          fontWeight: 600,
                          height: "32px",
                          marginRight: 2,
                          backgroundColor: "#168843",
                          color: "white",
                          border: "none",
                        }}
                        onClick={() => handleAddPlace(data)}
                      >
                        <FontAwesomeIcon icon={faBookmark} />{" "}
                        <Typography
                          marginTop={0.5}
                          marginLeft={1}
                          sx={{ fontWeight: 600 }}
                        >
                          Thêm vào
                        </Typography>
                      </Button>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={12} display="flex" alignItems="center">
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#ec9b3b", marginRight: 5 }}
                    />
                    <Typography
                      sx={{ fontWeight: 600, color: "#ec9b3b" }}
                      marginTop={0.5}
                      marginRight={1}
                    >
                      {data.rating}
                    </Typography>
                    <Typography marginTop={0.5} sx={{ color: "#6c757d" }}>
                      ({data.user_ratings_total})
                    </Typography>

                    <img
                      alt=""
                      src={Google}
                      width="16"
                      height="16"
                      class="mx-1"
                    ></img>
                  </Grid>
                  <Grid item xs={12} sm={12} display="flex" alignItems="center">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      style={{ marginRight: 9, marginLeft: 2 }}
                    />
                    <Typography sx={{ color: "#6c757d" }}>
                      {data.formatted_address}
                    </Typography>
                  </Grid>
                  {data.opening_hours && (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      display="flex"
                      alignItems="center"
                    >
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{ marginRight: 7, marginLeft: 2 }}
                      />
                      <Typography sx={{ color: "#6c757d" }}>
                        {data.opening_hours.weekday_text[now]}
                      </Typography>
                    </Grid>
                  )}

                  {data.formatted_phone_number && (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      display="flex"
                      alignItems="center"
                    >
                      <FontAwesomeIcon
                        icon={faPhone}
                        style={{ marginRight: 7, marginLeft: 2 }}
                      />
                      <a
                        href={`tel:${data.formatted_phone_number}`}
                        class="text-nowrap"
                      >
                        {data.formatted_phone_number}
                      </a>
                    </Grid>
                  )}

                  {data.website && (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      display="flex"
                      alignItems="center"
                    >
                      <FontAwesomeIcon
                        icon={faEarthAmericas}
                        style={{ marginRight: 7, marginLeft: 2 }}
                      />
                      <a href={`tel:${data.website}`} class="text-nowrap">
                        {data.website}
                      </a>
                    </Grid>
                  )}

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    display="flex"
                    alignItems="center"
                    marginTop={2}
                    marginBottom={1}
                  >
                    <Typography sx={{ color: "#6c757d", fontWeight: 700 }}>
                      Truy cập:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} display="flex" alignItems="center">
                    <Button
                      href={`https://www.tripadvisor.com/search?q=${encodeURIComponent(
                        data.name
                      )}`}
                      target="_blank"
                      variant="outlined"
                      color="secondary"
                      sx={{
                        borderRadius: 10,
                        fontWeight: 600,
                        height: "32px",
                        marginRight: 2,
                      }}
                    >
                      <img
                        alt=""
                        src={TripAdvisor}
                        width="14"
                        height="14"
                        class="mx-1"
                      ></img>{" "}
                      TripAdvisor
                    </Button>
                    <Button
                      href={`https://www.google.com/search?q=${encodeURIComponent(
                        data.name
                      )}`}
                      target="_blank"
                      variant="outlined"
                      color="secondary"
                      sx={{
                        borderRadius: 10,
                        fontWeight: 600,
                        height: "32px",
                        marginRight: 2,
                      }}
                    >
                      <img
                        alt=""
                        src={Google}
                        width="14"
                        height="14"
                        class="mx-1"
                      ></img>{" "}
                      Google
                    </Button>
                    <Button
                      href={data.url}
                      target="_blank"
                      variant="outlined"
                      color="secondary"
                      sx={{ borderRadius: 10, fontWeight: 600, height: "32px" }}
                    >
                      <img
                        alt=""
                        src={GoogleMaps}
                        width="14"
                        height="14"
                        class="mx-1"
                      ></img>{" "}
                      Google Maps
                    </Button>
                  </Grid>
                  <Button onClick={clearRoute}>test</Button>
                </Grid>
              </Box>
            )}
            <GoogleMap
              center={center}
              zoom={13}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={(map) => setMap(map)}
            >
              {plans.map((routes, index) => {
                return routes.tripRoute.map((route, childIndex) => {
                  if (route.locationName !== "") {
                    return (
                      <Marker
                        position={{
                          lat: parseFloat(route.latitude),
                          lng: parseFloat(route.longitude),
                        }}
                        map={map}
                        icon={
                          "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_" +
                          color[index] +
                          (childIndex + 1) +
                          ".png"
                        }
                        onClick={handleClickMarker}
                        ref={(marker) => markers.current.push(marker)}
                      />
                    );
                  } else {
                    return null; // Render nothing if locationName is empty
                  }
                });
              })}

              {directionsResponse && (
                <DirectionsRenderer
                  key={
                    directionsResponse
                      ? directionsResponse.routes[0].overview_polyline
                      : "default"
                  }
                  directions={directionsResponse}
                  options={directionsOptions}
                  map={map}
                />
              )}
            </GoogleMap>
          </Box>
        </Box>
      )}
    </>
  );
}
