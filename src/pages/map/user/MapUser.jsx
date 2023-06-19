import ReactDOM from "react-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { GOOGLE_MAP_API, PLACE_API } from "config";

import { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import olms from "ol-mapbox-style";
import * as proj from "ol/proj";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faStar } from "@fortawesome/free-solid-svg-icons";

const center = { lat: 16.0545, lng: 108.22074 };

const offices = [
  {
    id: "1",
    field_address: {
      locality: "Gent",
      postal_code: "9000",
      address_line1: "Veldstraat 1",
      address_line2: "a",
      latitude: 16.0545,
      longitude: 108.22074,
    },
  },
];

export default function MapUser({ getReturnData, passToProps, selectedData }) {
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [departure, setDeparture] = useState();
  const [destination, setDestination] = useState();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const data = selectedData;

  let mapContainer;

  useEffect(() => {
    const initialState = {
      lng: 108.22074,
      lat: 16.0545,
      zoom: 15,
    };

    const myAPIKey = PLACE_API;
    const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";

    olms(mapContainer, `${mapStyle}?apiKey=${myAPIKey}`).then((map) => {
      map
        .getView()
        .setCenter(
          proj.transform(
            [initialState.lng, initialState.lat],
            "EPSG:4326",
            "EPSG:3857"
          )
        );
      map.getView().setZoom(initialState.zoom);
    });
  }, [mapContainer]);

  function handlePlaceSelect(place) {
    setSelectedPlace(place);
    console.log(place);
  }

  function onPlaceSelect(place) {
    setSelectedPlace(place);
    console.log(place);
  }

  function onSuggestionChange(suggestion) {
    if (suggestion) {
      const place = suggestion.properties;
      setSelectedPlace(place);
      console.log(suggestion);
    }
  }

  function preprocessHook(value) {
    console.log(value);
  }

  function postprocessHook(feature) {
    return feature.properties.street;
  }

  function suggestionsFilter(suggestions) {
    const processedStreets = [];

    const filtered = suggestions.filter((value) => {
      if (
        !value.properties.street ||
        processedStreets.indexOf(value.properties.street) >= 0
      ) {
        return false;
      } else {
        processedStreets.push(value.properties.street);
        return true;
      }
    });

    return filtered;
  }

  async function calculateRoute() {
    const root = ReactDOM.createRoot(document.getElementById("root"));
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

  function onUserInput(input) {
    console.log(input);
  }

  return (
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
                  style={{ width: "100%", height: "100px", borderRadius: 5 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} display="flex" alignItems="center">
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: "#ec9b3b", marginRight: 5 }}
                />
                <Typography sx={{ fontWeight: 600 }}>{data.rating}</Typography>{" "}
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
              </Grid>
              <Grid item xs={12} sm={5} mt={2}>
                <Typography>Distance: {distance} </Typography>
              </Grid>
              <Grid item xs={12} sm={5} mt={2}>
                <Typography>Duration: {duration} </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
        <Card
          className="map-container"
          ref={(el) => (mapContainer = el)}
          sx={{ height: "100%", width: "100%" }}
        />
      </Box>
    </Box>
  );
}
