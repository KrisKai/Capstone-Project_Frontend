import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Card, Typography } from "@mui/material";
import {
  Autocomplete,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { GOOGLE_MAP_API } from "config";
import "../admin/map.css";

import { useRef, useState } from "react";

const center = { lat: 16.0545, lng: 108.0717 };

export default function Map({ getReturnData }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API,
    libraries: ["places"],
  });

  const restrictions = {
    country: "vn",
  };

  const [numberOfPlaces, setNumberOfPlace] = useState(2);
  const placeRef = useRef([]);

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  async function calculateRoute() {
    // if (
    //   locationRef1.current.value === "" ||
    //   locationRef2.current.value === ""
    // ) {
    //   return;
    // }
    // // eslint-disable-next-line no-undef
    // const directionsService = new google.maps.DirectionsService();
    // const results = await directionsService.route({
    //   origin: locationRef1.current.value,
    //   destination: locationRef2.current.value,
    //   // eslint-disable-next-line no-undef
    //   travelMode: google.maps.TravelMode.DRIVING,
    // });
    // setDirectionsResponse(results);
    // setDistance(results.routes[0].legs[0].distance.text);
    // setDuration(results.routes[0].legs[0].duration.text);

    // ///đây là chỗ đưa dữ liệu ra ngoài component cha
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
    console.log(placeRef.current.map((value) => value.value));
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
        <Box height="100vh" width="100%" display="flex">
          <Box width="25%" padding="10px 10px">
            <Box textAlign="center">
              <Typography variant="h2">Setting Route</Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap="10px">
              <Box
                paddingTop="10px"
                display="flex"
                flexDirection="column"
                gap="10px"
              >
                {Array(numberOfPlaces)
                  .fill()
                  .map((_, idx) => {
                    return (
                      <Card sx={{ padding: "15px 10px" }}>
                        <Box borderRadius="2px">
                          <Autocomplete
                            restrictions={restrictions}
                            onLoad={(place) => console.log(place)}
                          >
                            <input
                              ref={(el) => (placeRef.current[idx] = el)}
                              className="custom-input"
                            />
                          </Autocomplete>
                        </Box>
                        <Box display="flex" mt="5px">
                          <Button sx={{ width: "50%" }}>Delete</Button>
                          <Button sx={{ width: "50%" }}>Move up</Button>
                        </Box>
                      </Card>
                    );
                  })}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  "& button": {
                    width: "100%",
                  },
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setNumberOfPlace((prevState) => prevState + 1)}
                >
                  Add new place
                </Button>
                <Button variant="contained" onClick={calculateRoute}>
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
          <Box height="100%" flex="1 1 0">
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
