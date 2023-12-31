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
import { tripRouteApi } from "api";
import { toast } from "react-toastify";

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


  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [route, setRoute] = useState([
    {
      tripId: 0,
      longitude: "",
      latitude: "",
      locationName: "",
      priority: 0,
    },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setRoute((prevRoute) => {
      const updatedRoute = [...prevRoute];
      updatedRoute[index] = {
        ...updatedRoute[index],
        [name]: value,
      };
      return updatedRoute;
    });
  };

  const handleAdd = () => {
    setRoute([
      ...route,
      {
        tripId: 0,
        longitude: "",
        latitude: "",
        locationName: "",
      },
    ]);
  };

  const handleRemove = async (tripId, index) => {
    if (tripId !== 0) {
      const reponse = await tripRouteApi.delete(tripId || "");
      if (reponse > 0) {
        toast.success("Xoá thành công!");
      }
    }
    const list = [...route];
    if (list.length > 1) {
      list.splice(index, 1);
      setRoute(list);
    }
  };
  console.log(route);

  const handleMoveUp = (index) => {
    console.log(1);
    if (index > 0) {
    const updatedRoute = [...route];
    const tmp = updatedRoute[index];
    updatedRoute[index] = updatedRoute[index - 1];
    updatedRoute[index - 1] = tmp;
    setRoute(updatedRoute);
  }
  };

  // async function calculateRoute() {
  //   if (
  //     locationRef1.current.value === "" ||
  //     locationRef2.current.value === ""
  //   ) {
  //     return;
  //   }
  //   // eslint-disable-next-line no-undef
  //   const directionsService = new google.maps.DirectionsService();
  //   const results = await directionsService.route({
  //     origin: locationRef1.current.value,
  //     destination: locationRef2.current.value,
  //     // eslint-disable-next-line no-undef
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   });
  //   setDirectionsResponse(results);
  //   setDistance(results.routes[0].legs[0].distance.text);
  //   setDuration(results.routes[0].legs[0].duration.text);

  //   ///đây là chỗ đưa dữ liệu ra ngoài component cha
  //   const returnData = {
  //     origin: locationRef1.current.value,
  //     originLat: results.routes[0].legs[0].start_location.lat(),
  //     originLng: results.routes[0].legs[0].start_location.lng(),
  //     destination: locationRef2.current.value,
  //     destinationLat: results.routes[0].legs[0].end_location.lat(),
  //     destinationLng: results.routes[0].legs[0].end_location.lng(),
  //     distance: results.routes[0].legs[0].distance.text,
  //     duration: results.routes[0].legs[0].duration.text,
  //   };
  //   getReturnData(returnData);
  // }

  return (
    <>
      {/* Google Map Box */}
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
              {/* {Array(numberOfPlaces)
                .fill()
                .map((_, idx) => {
                  return <CardCustom></CardCustom>;
                })} */}
              {route.map((route, index) => {
                return (
                  <Card key={index} sx={{ padding: "15px 10px" }}>
                    <Box borderRadius="2px">
                      <TextField
                        id="locationName"
                        name="locationName"
                        value={route.locationName}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Box>
                    <Box display="flex" mt="5px">
                      <Button
                        sx={{ width: "50%" }}
                        onClick={() => handleRemove(route.tripId, index)}
                      >
                        Delete
                      </Button>
                      <Button
                        sx={{ width: "50%" }}
                        onClick={() => handleMoveUp(index)}
                      >
                        Move up
                      </Button>
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
                onClick={handleAdd}
              >
                Add new place
              </Button>
              <Button variant="contained">Save</Button>
            </Box>
          </Box>
        </Box>
        <Box height="100%" flex="1 1 0">
        </Box>
      </Box>
    </>
  );
}

{
  /* <Box display="flex" justifyContent="space-between" width="100%">
          <Box>
            <Autocomplete>
              <input type="text" ref={locationRef1} />
            </Autocomplete>
          </Box>
          <Box>
            <Autocomplete>
              <input type="text" ref={locationRef2} />
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
