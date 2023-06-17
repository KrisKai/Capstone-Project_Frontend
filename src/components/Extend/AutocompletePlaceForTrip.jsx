import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import axios from "axios";
import { PLACE_API } from "config";
import { useEffect, useState } from "react";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';

const AutocompletePlaceForTrip = (props) => {
  const { onSelect, label } = props;

  const [options, setOptions] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleOnKeyDown = async (event) => {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${event.target.value}&lang=vi&filter=countrycode:vn&format=json&apiKey=${PLACE_API}`
    );
    const optionsFetch = response.data.results.map((value) => ({
      name: value.address_line1,
      lat: value.lat,
      lon: value.lon,
    }));
    setOptions(optionsFetch);
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

  useEffect(() => {
    console.log(props);
  }, options);
  return (
    <>
      <Box
        container
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        width="100%"
        display="flex"
        alignItems="center"
        marginRight={1}
      >
        <Autocomplete
          disablePortal
          getOptionLabel={(option) => option.name}
          filterOptions={(x) => x}
          options={options}
          sx={{
            width: "90%",
            "& fieldset": {
              border: "none",
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              fullWidth
              sx={{ backgroundColor: "#f3f4f5", borderRadius: 4 }}
              placeholder="Thêm địa điểm"
            />
          )}
          onChange={handleSelectPlace}
          onInputChange={handleOnKeyDown}
        />
        <Box>
          {showDeleteButton && (
            <IconButton>
              <DeleteForeverOutlinedIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AutocompletePlaceForTrip;
