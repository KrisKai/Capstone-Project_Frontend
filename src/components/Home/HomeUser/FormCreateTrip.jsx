import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { tripApi } from "api";
import { getPlacesProps } from "api/user/placesAPI";
import { GOOGLE_MAP_API } from "config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Formik } from "formik";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

dayjs.extend(utc);

const FormCreateTrip = () => {
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API,
    libraries: ["places"],
  });
  const restrictions = {
    country: "vn",
  };
  const [trip, setTrip] = useState({
    estimateStartDate: dayjs(),
    estimateEndDate: dayjs().add(1, 'day'),
    endLongitude: "",
    endLatitude: "",
    endLocationName: "",
  });

  const locationRef1 = useRef();
  if (!isLoaded) {
    return (
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        backgroundColor="rgba(212, 212, 215, 0.9)"
        paddingY={5}
        borderRadius="5px"
      >
        Hãy đợi 1 chút
      </Box>
    );
  }

  async function handleSubmit() {
    if (locationRef1.current.value !== "") {
      const data = await getPlacesProps(locationRef1.current.value);
      const id = await tripApi.createUser({
        ...trip,
        endLocationName: data.name,
        endLongitude: data.lon.toString(),
        endLatitude: data.lat.toString(),
      });
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
            <Typography variant="h2">Tạo hành trình mới</Typography>
            <Box width="60%" border="1px solid black" mt={1}></Box>
          </Box>
          <Box mt={2}>
            {/* <Formik
              initialValues={{
                destination: null,
                startDate: null,
                endDate: null,
              }}
              onSubmit={async (values) => {
                navigate("/tripCreate", {
                  state: {
                    destination: values.destination,
                    startDate: values.startDate,
                    endDate: values.endDate,
                  },
                });
              }}
            >
              {({ values, setFieldValue, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}> */}
            <Box display="flex" flexDirection="column" gap={2}>
              <Box
                width="100%"
                sx={{
                  borderRadius: "8px",
                }}
              >
                <Autocomplete restrictions={restrictions}>
                  <input
                    ref={locationRef1}
                    className="custom-input"
                    placeholder="&#128269; Điểm đến"
                  />
                </Autocomplete>
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
                  }}
                  onClick={() => handleSubmit()}
                >
                  Bắt Đầu
                </Button>
              </Box>
            </Box>
            {/* </form>
              )}
            </Formik> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FormCreateTrip;
