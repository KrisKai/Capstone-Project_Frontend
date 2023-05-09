import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  Card,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
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

export default function Map({ getReturnData }) {
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
    return "â";
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
      origin: originRef.current.value,
      originLat: results.routes[0].legs[0].start_location.lat(),
      originLng: results.routes[0].legs[0].start_location.lng(),
      destination: destinationRef.current.value,
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
    destinationRef.current.value = "";
  }

  return (
    <>
      {/* Google Map Box */}
      <Box height="100vh" width="100vw" display="flex">
        <Box width="25%" padding="10px 20px">
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
              {/* {Array(numberOfPlaces)
                .fill()
                .map((_, idx) => {
                  return <CardCustom></CardCustom>;
                })} */}
              <Card sx={{ padding: "15px 10px" }}>
                <Box border="1px solid black" borderRadius="2px">
                  <Autocomplete>
                    <input ref={originRef} className="custom-input" />
                  </Autocomplete>
                </Box>
                <Box display="flex" mt="5px">
                  <Button sx={{ width: "50%" }}>Delete</Button>
                  <Button sx={{ width: "50%" }}>Move up</Button>
                </Box>
              </Card>
              <Card sx={{ padding: "15px 10px" }}>
                <Box border="1px solid black" borderRadius="2px">
                  <Autocomplete>
                    <input ref={destinationRef} className="custom-input" />
                  </Autocomplete>
                </Box>
                <Box display="flex" mt="5px">
                  <Button sx={{ width: "50%" }}>Delete</Button>
                  <Button sx={{ width: "50%" }}>Move up</Button>
                </Box>
              </Card>
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
              <Button variant="contained" startIcon={<AddIcon />}>
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
  /* <Box display="flex" justifyContent="space-between" width="100%">
          <Box>
            <Autocomplete>
              <input type="text" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box>
            <Autocomplete>
              <input type="text" ref={destinationRef} />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>

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
        </Box> */
}
