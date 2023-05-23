import { Box, Button, ButtonGroup, Card, Typography } from "@mui/material";
import {
  Autocomplete,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { GOOGLE_MAP_API } from "config";
import "./map.css";

import { useRef, useState } from "react";

const center = { lat: 16.0545, lng: 108.0717 };

function CardCustom() {
  return (
    <>
      <Card sx={{ padding: "15px 10px" }}>
        <Box textAlign="center" paddingBottom="10px">
          <Typography>Địa điểm: asd</Typography>
        </Box>
        <Box border="1px solid black" borderRadius="2px">
          <input className="custom-input" />
        </Box>
        <Box display="flex" mt="5px">
          <Button sx={{ width: "50%" }}>Delete</Button>
          <Button sx={{ width: "50%" }}>Move up</Button>
        </Box>
      </Card>
    </>
  );
}

export default function MapForTrip({ getReturnData }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API,
    libraries: ["places"],
  });

  const [numberOfPlaces, setNumberOfPlace] = useState(2);

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  if (!isLoaded) {
    return "Map is loading";
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);

    ///đây là chỗ đưa dữ liệu ra ngoài component cha
    const returnData = {
      startLocationName: originRef.current.value,
      startLatitude: results.routes[0].legs[0].start_location.lat(),
      startLongitude: results.routes[0].legs[0].start_location.lng(),
      endLocatioName: destinationRef.current.value,
      endLatitude: results.routes[0].legs[0].end_location.lat(),
      endLongitude: results.routes[0].legs[0].end_location.lng(),
      distance: results.routes[0].legs[0].distance.text,
      duration: results.routes[0].legs[0].duration.text,
    };

    getReturnData(returnData);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <>
      {/* Google Map Box */}
      <Box height="100%" width="100%" display="flex">
        <Box height="100%" flex="1 1 0" position="relative">
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            position="absolute"
            zIndex={100}
            padding={1}
          >
            <Box>
              <Autocomplete>
                <input
                  className="custom-input"
                  type="text"
                  ref={originRef}
                  placeholder="Trip Start Location"
                />
              </Autocomplete>
            </Box>
            <Box>
              <Autocomplete>
                <input
                  className="custom-input"
                  type="text"
                  ref={destinationRef}
                  placeholder="Destination Start Location"
                />
              </Autocomplete>
            </Box>

            <ButtonGroup>
              <Button colorScheme="pink" type="button" onClick={calculateRoute}>
                Calculate Route
              </Button>
            </ButtonGroup>

            {/* <Typography>Distance: {distance} </Typography>
            <Typography>Duration: {duration} </Typography>
            <Button
              aria-label="center back"
              onClick={() => {
                map.panTo(center);
                map.setZoom(15);
              }}
            >
              Center
            </Button> */}
          </Box>
          <GoogleMap
            center={center}
            zoom={10}
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
    </>
  );
}

{
}
