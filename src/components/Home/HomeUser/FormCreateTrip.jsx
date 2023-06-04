import { useState } from "react";
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
import { GOOGLE_MAP_API } from "config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useNavigate } from "react-router-dom";

dayjs.extend(utc);

const FormCreateTrip = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API,
    libraries: ["places"],
  });
  const restrictions = {
    country: "vn",
  };

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

  const gotoCreate = () => {
    // if (destination !== "" && startDate !== "" && endDate !== "") {
      navigate("/tripCreate", {
        state: {
          destination: destination,
          startDate: startDate,
          endDate: endDate,
        },
      });
    // }
  };

  return (
    <>
      <Box>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          backgroundColor="rgba(212, 212, 215, 0.9)"
          paddingY={5}
          borderRadius="5px"
        >
          <Typography variant="h2" textTransform="uppercase">
            tạo hành trình mới
          </Typography>
          <Box mt={2}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box
                width="100%"
                sx={{
                  borderRadius: "8px",
                }}
              >
                <Autocomplete restrictions={restrictions}>
                  <TextField
                    sx={{
                      width: "100%",
                      background: "white",
                      borderRadius: "8px",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={destination}
                    onChange={(eve) => {
                      setDestination(eve.target.value);
                    }}
                    placeholder="Điểm đến"
                  ></TextField>
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
                    label="Ngày đi"
                    value={startDate}
                    onChange={(eve) => {
                      setStartDate(eve.target.value);
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
                    label="Ngày đến"
                    value={endDate}
                    onChange={(eve) => {
                      setEndDate(eve.target.value);
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  sx={{
                    padding: "10px 30px",
                    fontSize: "20px",
                    backgroundColor: "#168843",
                  }}
                  onClick={gotoCreate}
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
