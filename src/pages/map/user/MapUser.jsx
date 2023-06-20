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
import { faMapMarkerAlt, faStar } from "@fortawesome/free-solid-svg-icons";

import { useRef, useState } from "react";

export default function Map({ getReturnData, passToProps, selectedData }) {
  const center = {
    lat: parseFloat(passToProps.endLatitude),
    lng: parseFloat(passToProps.endLongitude),
  };
  console.log(center)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API,
    libraries: ["places"],
  });

  const waypoints = [
    { location: "Hue" },
    { location: "Da Nang" },
    { location: "Quang Nam" },
    { location: "Binh Thuan" }
  ];

  const restrictions = {
    country: "vn",
  };

  const data = selectedData;

  const [numberOfPlaces, setNumberOfPlace] = useState(2);
  const placeRef = useRef([]);

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  console.log(directionsResponse)

  async function calculateRoute() {
    // if (
    //   locationRef1.current.value === "" ||
    //   locationRef2.current.value === ""
    // ) {
    //   return;
    // }
    const request = {
      origin: waypoints[0].location,
      destination: waypoints[waypoints.length - 1].location,
      waypoints: waypoints.slice(1, -1),
      travelMode: "DRIVING"
    };
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route(request);
    setDirectionsResponse(results);
    // setDistance(results.routes[0].legs[0].distance.text);
    // setDuration(results.routes[0].legs[0].duration.text);

    ///đây là chỗ đưa dữ liệu ra ngoài component cha
    // const returnData = {
    //   origin: locationRef1.current.value,
    //   originLat: results.routes[0].legs[0].start_location.lat(),
    //   originLng: results.routes[0].legs[0].start_location.lng(),
    //   destination: locationRef2.current.value,
    //   destinationLat: results.routes[0].legs[0].end_location.lat(),
    //   destinationLng: results.routes[0].legs[0].end_location.lng(),
    //   distance: results.routes[0].legs[0].distance.text,
    //   duration: results.routes[0].legs[0].duration.text,
    // };
    // getReturnData(returnData);
    // console.log(placeRef.current.map((value) => value.value));
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
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
                      src={data.photo.images.small.url}
                      alt="Image"
                      style={{
                        width: "100%",
                        height: "100px",
                        borderRadius: 5,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} display="flex" alignItems="center">
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#ec9b3b", marginRight: 5 }}
                    />
                    <Typography sx={{ fontWeight: 600 }}>
                      {data.rating}
                    </Typography>{" "}
                    ( {data.ranking} )
                  </Grid>
                  <Grid item xs={12} sm={12} display="flex" alignItems="center">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      style={{ marginRight: 9, marginLeft: 2 }}
                    />
                    <Typography>
                      {data.address_obj.street1},{data.address_obj.city},
                      {data.address_obj.country}
                    </Typography>
                    <Button onClick={calculateRoute}>test</Button>
                  </Grid>
                </Grid>
              </Box>
            )}
            <GoogleMap
              center={center}
              zoom={15}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={(map) => setMap(map)}
            >
              <Marker position={center} />
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </Box>
        </Box>
      )}
    </>
  );
}
