import { PLACE_API } from "config";
import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import { useState } from "react";
import axios from "axios";

import PlaceIcon from "@mui/icons-material/Place";

const AutocompletePlaceForTrip = (props) => {
  const { onSelect, label } = props;

  const [options, setOptions] = useState([]);

  const handleOnKeyDown = async (event) => {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${event.target.value}&lang=vi&filter=countrycode:vn&format=json&apiKey=${PLACE_API}`
    );
    const options = response.data.results.map((value) => ({
      name: value.address_line1,
      lat: value.lat,
      lon: value.lon,
    }));
    setOptions(options);
  };

  const handleSelectPlace = (event) => {
    onSelect(options[event.target.value]);
  };

  return (
    <>
      <Autocomplete
        disablePortal
        getOptionLabel={(option) => option.name}
        id="combo-box-demo"
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            fullWidth
            onChange={handleOnKeyDown}
            sx={{ backgroundColor: "#f3f4f5" }}
            placeholder="Thêm địa điểm"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PlaceIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
        onChange={handleSelectPlace}
      />
    </>
  );
};

export default AutocompletePlaceForTrip;
