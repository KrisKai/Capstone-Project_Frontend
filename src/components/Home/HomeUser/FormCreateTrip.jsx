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

const FormCreateTrip = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API,
    libraries: ["places"],
  });
  const onSubmit = (e) => {
    e.target.preventDefault();
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
            <form>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box
                  width="100%"
                  sx={{
                    borderRadius: "8px",
                  }}
                >
                  <Autocomplete>
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
                      placeholder="Điểm đến"
                    ></TextField>
                  </Autocomplete>
                </Box>
                <Box display="flex" gap={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{
                        background: "white",
                        borderRadius: "8px",
                      }}
                      label="Ngày đi"
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{
                        background: "white",
                        borderRadius: "8px",
                      }}
                      label="Ngày đến"
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
                  >
                    Bắt Đầu
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FormCreateTrip;
