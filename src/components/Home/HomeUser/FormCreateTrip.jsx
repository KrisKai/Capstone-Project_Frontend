import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { tripApi } from "api";
import { getPlacesProps } from "api/user/placesAPI";
import { GOOGLE_MAP_API } from "config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";

dayjs.extend(utc);

const FormCreateTrip = () => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState({
    estimateStartDate: dayjs(),
    estimateEndDate: dayjs().add(1, "day"),
    endLongitude: "",
    endLatitude: "",
    endLocationName: "",
  });

  const locationRef1 = useRef();

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
            <Box display="flex" flexDirection="column" gap={2}>
              <Box
                width="100%"
                sx={{
                  borderRadius: "8px",
                }}
              >
                <Autocomplete
                  apiKey={GOOGLE_MAP_API}
                  ref={locationRef1}
                  className="custom-input"
                  options={{
                    types: ["(regions)"],
                    componentRestrictions: { country: "vn" },
                  }}
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
