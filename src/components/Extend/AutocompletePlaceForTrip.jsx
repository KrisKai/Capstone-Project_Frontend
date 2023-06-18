import { Autocomplete, Box, Grid, IconButton, TextField } from "@mui/material";
import axios from "axios";
import { PLACE_API } from "config";
import { useEffect, useState } from "react";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import RecommendedPlaces from "./RecommendedPlaces";

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
    onSelect(props.index, props.childIndex, options[event.target.value]);
  };

  const handleMouseEnter = () => {
    setShowDeleteButton(true);
  };

  const handleMouseLeave = () => {
    setShowDeleteButton(false);
  };

  useEffect(() => {}, options);
  return (
    <>
      {!props.place.showNote && (
        <Grid
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
            {showDeleteButton && props.place.showNote && (
              <IconButton>
                <DeleteForeverOutlinedIcon />
              </IconButton>
            )}
            {!props.place.showNote && (
              <IconButton
                onClick={() =>
                  props.handleShowNote(props.index, props.childIndex)
                }
              >
                <StickyNote2OutlinedIcon />
              </IconButton>
            )}
          </Box>
          <Grid item xs={12}>
            <RecommendedPlaces/>
          </Grid>
        </Grid>
      )}
      {props.place.showNote && (
        <Grid
          container
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          width="100%"
          display="flex"
          alignItems="center"
          marginRight={1}
        >
          <Grid item xs={12} sm={10} marginBottom={1}>
            <TextField
              label={label}
              fullWidth
              sx={{
                backgroundColor: "#f3f4f5",
                borderRadius: 3,
                "& fieldset": {
                  border: "none",
                },
              }}
              placeholder="Thêm ghi chú"
              value={props.place.note}
              onChange={(e) =>
                props.onChangeInput(
                  props.index,
                  props.childIndex,
                  e.target.value
                )
              }
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            {showDeleteButton && (
              <IconButton>
                <DeleteForeverOutlinedIcon />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={12} sm={11}>
            <Autocomplete
              disablePortal
              getOptionLabel={(option) => option.name}
              filterOptions={(x) => x}
              options={options}
              sx={{
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
          </Grid>
          <Grid item xs={12}>
            <RecommendedPlaces/>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default AutocompletePlaceForTrip;
