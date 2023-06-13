import { Autocomplete, Box, TextField } from "@mui/material";
import "./map.css";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function MapForTrip({ getReturnData, passToProps }) {
  const originRef = useRef();
  const destinationRef = useRef();

  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [departure, setDeparture] = useState();
  const [destination, setDestination] = useState();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [options, setOptions] = useState([]);

  function handlePlaceSelect(event) {
    setSelectedPlace(options[event.target.value]);
  }

  async function calculateRoute() {
    console.log(originRef.current.value);
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
    // setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);

    // đây là chỗ đưa dữ liệu ra ngoài component cha
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

  const handleOnKeyDown = async (event) => {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${event.target.value}&lang=vi&filter=countrycode:vn&format=json&apiKey=a4f9fffa383040d581230c5d9fd096b2`
    );
    const options = response.data.results.map((value) => ({
      name: value.address_line1,
      lat: value.lat,
      lon: value.lon,
    }));
    setOptions(options);
  };

  useEffect(() => {
    console.log(selectedPlace);
  }, [selectedPlace]);

  return (
    <Box height="90vh" width="100%" display="flex">
      {/* <Box height="100%" flex="1 1 0" position="relative">
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
          <GeoapifyContext apiKey="a4f9fffa383040d581230c5d9fd096b2">
            <Grid container>
              <Grid item xs={12} sm={5}>
                <GeoapifyGeocoderAutocomplete
                  placeholder="Trip Start Location"
                  className="custom-input"
                  lang="vi"
                  countryCodes="vn"
                  placeSelect={(value) => onPlaceSelect(value)} // Add this line
                  onSuggestionChange={onSuggestionChange}
                  onUserInput={onUserInput}
                  ref={originRef}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <GeoapifyGeocoderAutocomplete
                  placeholder="Destination Start Location"
                  className="custom-input"
                  type="street"
                  lang="vi"
                  countryCodes="vn"
                  onChange={handlePlaceSelect}
                />
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
          </GeoapifyContext>
        </Box>
        <Card
          className="map-container"
          ref={(el) => (mapContainer = el)}
          sx={{ height: "100%", width: "100%" }}
        />
      </Box> */}

      <Autocomplete
        disablePortal
        getOptionLabel={(option) => option.name}
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Địa điểm" onChange={handleOnKeyDown} />
        )}
        onChange={handlePlaceSelect}
      />
    </Box>
  );
}
