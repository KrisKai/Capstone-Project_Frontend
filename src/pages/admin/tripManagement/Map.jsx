import { Box, Input, Button, ButtonGroup, Typography } from "@mui/material";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { GOOGLE_MAP_API } from "config";

import { useRef, useState } from "react";

const center = { lat: 16.0545, lng: 108.0717 };

export default function Map({ getReturnData }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return "â";
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log(results);
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);

    ///đây là chỗ đưa dữ liệu ra ngoài component cha
    const returnData = {
      origin: originRef.current.value,
      originLat: results.routes[0].legs[0].start_location.lat(),
      originLng: results.routes[0].legs[0].start_location.lng(),
      destination: destiantionRef.current.value,
      destinationLat: results.routes[0].legs[0].end_location.lat(),
      destinationLng: results.routes[0].legs[0].end_location.lng(),
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
    destiantionRef.current.value = "";
  }

  return (
    <>
      {/* Google Map Box */}
      <Box height="800px" width="1300px" position="relative">
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box>
            <Autocomplete>
              {/* <Input
                type="text"
                placeholder="Origin"
                ref={originRef}
                onChange={(e) => console.log(e.target.value)}
              /> */}
              <input type="text" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box>
            <Autocomplete>
              {/* <Input
                type="text"
                placeholder="Destination"
                ref={destiantionRef}
              /> */}
              <input type="text" ref={destiantionRef} />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
            {/* <IconButton
                  aria-label="center back"
                  icon={<FaTimes />}
                  onClick={clearRoute}
                /> */}
          </ButtonGroup>

          <Typography>Distance: {distance} </Typography>
          <Typography>Duration: {duration} </Typography>
          <Button
            aria-label="center back"
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          >
            Center
          </Button>
        </Box>
        <Box width="100%" height="100%">
          <GoogleMap
            center={center}
            zoom={10}
            mapContainerStyle={{ width: "1300px", height: "100%" }}
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
