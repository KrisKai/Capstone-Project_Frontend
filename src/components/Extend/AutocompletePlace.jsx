import { PLACE_API } from "config";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const AutocompletePlace = (props) => {
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
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label={label} onChange={handleOnKeyDown} />
        )}
        onChange={handleSelectPlace}
      />
    </>
  );
};

export default AutocompletePlace;
