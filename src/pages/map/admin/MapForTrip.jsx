import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  Autocomplete,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { GOOGLE_MAP_API } from "config";
import "./map.css";

import { useRef, useState, useEffect } from "react";

const center = { lat: 16.0545, lng: 108.0717 };

const restrictions = {
  country: "vn",
};

export default function MapForTrip({ getReturnData, passToProps }) {
  useEffect(() => {
    console.log(passToProps)
    setDeparture(passToProps.startLocationName)
  }, []);

  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: GOOGLE_MAP_API,
    libraries: ["places"],
  });

  const [numberOfPlaces, setNumberOfPlace] = useState(2);

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [departure, setDeparture] = useState();
  const [destination, setDestination] = useState();

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef(passToProps.startLocationName);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef(passToProps.endLocationName);

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
      endLocationName: destinationRef.current.value,
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

  // useEffect(() => {
  //   // IFFE
  //   (async () => {
  //     const directionsService = new google.maps.DirectionsService();
  //     const results = await directionsService.route({
  //       origin:
  //         "482 Trưng Nữ Vương, Hòa Thuận Tây, Hải Châu District, Da Nang, Vietnam",
  //       destination:
  //         "483 Trưng Nữ Vương, Hòa Thuận Tây, Hải Châu District, Da Nang, Vietnam",
  //       // eslint-disable-next-line no-undef
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     });
  //     setDirectionsResponse(results);
  //   })();
  // }, []);

  // onMapLoad = map => {
  //   let request = {
  //     query: "Museum of Contemporary Art Australia",
  //     fields: ["name", "geometry"]
  //   };

  //   let service = new google.maps.places.PlacesService(map);

  //   service.findPlaceFromQuery(request, (results, status) => {
  //     if (status === google.maps.places.PlacesServiceStatus.OK) {
  //       for (var i = 0; i < results.length; i++) {
  //         coords.push(results[i]);
  //       }

  //       this.setState({
  //         center: results[0].geometry.location,
  //         coordsResult: coords
  //       });
  //     }
  //   });
  // };
  return (
    <>
      {/* Google Map Box */}
      <Box height="100%" width="100%" display="flex">
        <Box height="100%" flex="1 1 0" position="relative">
          <Box
            bgcolor={"white"}
            display="flex"
            justifyContent="space-between"
            width="94%"
            position="absolute"
            zIndex={100}
            padding={3}
            margin={4}
            boxShadow={2}
            borderRadius={2}
          >
            <Grid container>
              <Grid item xs={12} sm={5}>
                <Autocomplete restrictions={restrictions}>
                  <input
                    className="custom-input"
                    type="text"
                    ref={originRef}
                    placeholder="Trip Start Location"
                    value={departure}
                    onChange={(val)=>setDeparture(val.value)}
                  />
                </Autocomplete>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Autocomplete restrictions={restrictions}>
                  <input
                    className="custom-input"
                    type="text"
                    ref={destinationRef}
                    placeholder="Destination Start Location"
                    value={destination}
                    onChange={(val)=>setDestination(val.value)}
                  />
                </Autocomplete>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  colorScheme="pink"
                  type="button"
                  onClick={calculateRoute}
                  variant="outlined"
                >
                  Calculate Route
                </Button>
              </Grid>
              <Grid item xs={12} sm={5} mt={2}>
                <Typography>Distance: {distance} </Typography>
              </Grid>
              <Grid item xs={12} sm={5} mt={2}>
                <Typography>Duration: {duration} </Typography>
              </Grid>
            </Grid>
          </Box>
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
            onLoad={calculateRoute}
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
