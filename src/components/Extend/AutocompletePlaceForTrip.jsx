import { PLACE_API } from "config";
import { Autocomplete, TextField, InputAdornment, Grid, IconButton } from "@mui/material";
import { useState } from "react";
import axios from "axios";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import PlaceIcon from "@mui/icons-material/Place";

const AutocompletePlaceForTrip = (props) => {
  const { onSelect, label } = props;

  const [options, setOptions] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

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

  const handleMouseEnter = () => {
    setShowDeleteButton(true);
  };

  const handleMouseLeave = () => {
    setShowDeleteButton(false);
  };

  return (
    <>
      <Grid
        container
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Grid item xs={12} sm={1}></Grid>
        <Grid item xs={12} sm={9}>
          <Autocomplete
            disablePortal
            getOptionLabel={(option) => option.name}
            id="combo-box-demo"
            options={options}
            sx={{ border: "none" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                fullWidth
                onChange={handleOnKeyDown}
                sx={{ backgroundColor: "#f3f4f5", borderRadius: 4 }}
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
          <Grid item xs={12} sm={1}>
            {showDeleteButton && (
              <IconButton>
                <DeleteForeverOutlinedIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AutocompletePlaceForTrip;
