import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Typography, TextField, InputAdornment } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { tripApi } from "api";
import { GOOGLE_MAP_API } from "config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlacesWidget } from "react-google-autocomplete";

dayjs.extend(utc);

const FormCreateTrip = () => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState({
    estimateStartDate: dayjs(),
    estimateEndDate: dayjs().add(1, "day"),
    endLongitude: "",
    endLatitude: "",
    endLocationName: "",
    placeId: "",
  });
  const { ref: materialRef } = usePlacesWidget({
    apiKey: GOOGLE_MAP_API,
    onPlaceSelected: (place) => {
      const coor = JSON.stringify(place.geometry.location);
      let updatedTrip = trip;
      updatedTrip.endLocationName = place.formatted_address;
      updatedTrip.endLongitude = JSON.parse(coor).lng.toString();
      updatedTrip.endLatitude = JSON.parse(coor).lat.toString();
      updatedTrip.placeId = place?.place_id ? place?.place_id : "";
      setTrip(updatedTrip);
    },
    inputAutocompleteValue: "country",
    options: {
      types: ["geocode", "establishment"],
      componentRestrictions: { country: "vn" },
    },
  });

  const locationRef1 = useRef();

  async function handleSubmit() {
    if (trip.endLocationName !== "") {
      // const data = await getPlacesProps(locationRef1.current.value);
      const id = await tripApi.createUser(trip);
      if (id !== null) {
        navigate(`/tripUpdate/` + id);
      }
    }
  }

  return (
    <>
      <Box>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          paddingY={5}
          borderRadius="5px"
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h2" sx={{ fontSize: 36 }}>
              Tạo hành trình mới
            </Typography>
            <Box width="60%" border="1px solid black" mt={1}></Box>
          </Box>
          <Box mt={2}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box
                width="100%"
                sx={{
                  borderRadius: "8px",
                }}
              >
                <TextField
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  inputRef={materialRef}
                />
              </Box>
              <Box display="flex" gap={2}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  dateLibInstance={dayjs.utc}
                >
                  <DatePicker
                    sx={{
                      background: "white",
                      borderRadius: "8px",
                    }}
                    name="startDate"
                    label="Ngày đi"
                    value={dayjs.utc(trip.estimateStartDate)}
                    onChange={(e) => {
                      const newTrip = { ...trip, estimateStartDate: e };
                      setTrip(newTrip);
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  dateLibInstance={dayjs.utc}
                >
                  <DatePicker
                    sx={{
                      background: "white",
                      borderRadius: "8px",
                    }}
                    name="endDate"
                    label="Ngày đến"
                    value={dayjs.utc(trip.estimateEndDate)}
                    onChange={(e) => {
                      const newTrip = { ...trip, estimateEndDate: e };
                      setTrip(newTrip);
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <Box display="flex" justifyContent="center">
                <Button
                  type="button"
                  variant="contained"
                  sx={{
                    padding: "10px 30px",
                    fontSize: "20px",
                    backgroundColor: "#168843",
                    borderRadius: 80,
                  }}
                  onClick={() => handleSubmit()}
                >
                  Bắt Đầu
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FormCreateTrip;
