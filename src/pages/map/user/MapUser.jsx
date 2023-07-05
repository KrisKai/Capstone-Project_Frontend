import { Box, Button, Card, Typography, Grid } from "@mui/material";
import {
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
import typeForConverting from "assets/data/typeForConverting";

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
  selectedChildIndex,
  placeStatus,
  handleAddPlaces,
  setSelectedPlace,
  setPlaceStatus,
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
    if (map && plans.length > 1 && plans[selectedIndex].tripRoute.length > 2) {
      const waypoints = plans[selectedIndex].tripRoute
        .filter((route) => route.locationName !== "")
        .map((route) => ({ location: route.locationName }));
      calculateRoute(waypoints);
    }
  }, [selectedIndex, selectedChildIndex]);

  async function calculateRoute(waypoints) {
    let request;
    if (waypoints.length === 2) {
      request = {
        origin: waypoints[0].location,
        destination: waypoints[waypoints.length - 1].location,
        travelMode: "DRIVING",
        optimizeWaypoints: true,
      };
    } else if (waypoints.length > 2) {
      request = {
        origin: waypoints[0].location,
        destination: waypoints[waypoints.length - 1].location,
        waypoints: waypoints.slice(1, -1),
        travelMode: "DRIVING",
        optimizeWaypoints: true,
      };
    }

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route(request);
    setDirectionsResponse(results);
  }

  function handleAddPlace(data) {
    handleAddPlaces(selectedIndex, data);
  }

  function handleClickMarker(index, childIndex) {
    const placeId = plans[index].tripRoute[childIndex].placeId;
    const request = {
      placeId: placeId,
      fields: [
        "name",
        "formatted_address",
        "opening_hours",
        "website",
        "rating",
        "photos",
        "types",
        "user_ratings_total",
        "formatted_phone_number",
        "url",
        "geometry",
        "place_id",
      ],
      language: "vi",
    };

    placesService.getDetails(request, (place, status) => {
      // eslint-disable-next-line no-undef
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        let data = place;

        const convertedTypes = data.types.map((type) => {
          const matchingType = typeForConverting.find(
            (data) => data.name === type
          );
          return matchingType ? matchingType.code : type;
        });

        data.types = convertedTypes;

        setSelectedPlace(data);
        setPlaceStatus(true);
        // Access the detailed place information here
      } else {
        console.error("Error:", status);
      }
    });
  }

  return (
    <>
      {!isLoaded ? (
        "a"
      ) : (
        <Box height="92vh" width="57%" display="flex" position="fixed">
          <Box height="100%" flex="1 1 0" position="relative">
            {selectedData && (
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
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {selectedData.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <img
                      src={
                        selectedData.photos && selectedData.photos[0].getUrl()
                      }
                      alt="Image"
                      style={{
                        width: "100%",
                        height: "120px",
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
                        onClick={() => handleAddPlace(selectedData)}
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
                    {selectedData.types.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 0.5,
                          pl: "12px",
                          pr: "12px",
                          backgroundColor: "#f3f4f5",
                          borderRadius: 10,
                          mt: 1,
                          mr: 0.5,
                          mb: 1,
                        }}
                      >
                        {item}
                      </Box>
                    ))}
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
                      {selectedData.rating}
                    </Typography>
                    <Typography marginTop={0.5} sx={{ color: "#6c757d" }}>
                      ({selectedData.user_ratings_total})
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
                      {selectedData.formatted_address}
                    </Typography>
                  </Grid>
                  {selectedData.opening_hours && (
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
                        {selectedData.opening_hours.weekday_text[now]}
                      </Typography>
                    </Grid>
                  )}

                  {selectedData.formatted_phone_number && (
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
                        href={`tel:${selectedData.formatted_phone_number}`}
                        class="text-nowrap"
                      >
                        {selectedData.formatted_phone_number}
                      </a>
                    </Grid>
                  )}

                  {selectedData.website && (
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
                      <a
                        href={`tel:${selectedData.website}`}
                        class="text-nowrap"
                      >
                        {selectedData.website}
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
                        selectedData.name
                      )}`}
                      target="_blank"
                      variant="outlined"
                      color="secondary"
                      sx={{
                        borderRadius: 10,
                        fontWeight: 600,
                        height: "32px",
                        marginRight: 1,
                      }}
                    >
                      <img
                        alt=""
                        src={TripAdvisor}
                        width="14"
                        height="14"
                      ></img>{" "}
                      TripAdvisor
                    </Button>
                    <Button
                      href={`https://www.google.com/search?q=${encodeURIComponent(
                        selectedData.name
                      )}`}
                      target="_blank"
                      variant="outlined"
                      color="secondary"
                      sx={{
                        borderRadius: 10,
                        fontWeight: 600,
                        height: "32px",
                        marginRight: 1,
                      }}
                    >
                      <img alt="" src={Google} width="14" height="14"></img>{" "}
                      Google
                    </Button>
                    <Button
                      href={selectedData.url}
                      target="_blank"
                      variant="outlined"
                      color="secondary"
                      sx={{ borderRadius: 10, fontWeight: 600, height: "32px" }}
                    >
                      <img alt="" src={GoogleMaps} width="14" height="14"></img>{" "}
                      Google Maps
                    </Button>
                  </Grid>
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
                        onClick={() => handleClickMarker(index, childIndex)}
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
