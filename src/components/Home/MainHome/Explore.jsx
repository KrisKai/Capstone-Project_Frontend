import { Box, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

const Explore = () => {
  return (
    <>
      <Box>
        <Typography variant="h2" textTransform="uppercase">
          tạo hành trình mới
        </Typography>
        <Box>
          <form>
            <Box>
              <TextField></TextField>
            </Box>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </Box>
            <Box></Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Explore;
