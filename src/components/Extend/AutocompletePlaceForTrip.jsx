import { Box, Grid, IconButton, TextField } from "@mui/material";
import { PLACE_API, GOOGLE_MAP_API } from "config";
import { useEffect, useState, useRef } from "react";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import RecommendedPlaces from "./RecommendedPlaces";

import Autocomplete from "react-google-autocomplete";

const AutocompletePlaceForTrip = (props) => {
  const { onSelect, label } = props;
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const autocompleteRef = useRef(null);

  const coor = {
    lat: parseFloat(props.trip.endLatitude),
    lng: parseFloat(props.trip.endLongitude),
  };
  const defaultBounds = {
    north: coor.lat + 0.1,
    south: coor.lat - 0.1,
    east: coor.lng + 0.1,
    west: coor.lng - 0.1,
  };

  const handleSelectPlace = (place) => {
    onSelect(props.index, props.childIndex, place);
  };

  const handleMouseEnter = () => {
    setShowDeleteButton(true);
  };

  const handleMouseLeave = () => {
    setShowDeleteButton(false);
  };

  const handleDeletePlace = () => {
    props.handleClick(props.index, props.childIndex);
  };

  const handleClickData = (index, childIndex, value) => {
    // autocompleteRef.current.value = value.name;
    props.handleClickData(index, childIndex, value);
  };

  useEffect(() => {
    // Update component when props.place changes
    if (props.place.locationName) {
      autocompleteRef.current.value = props.place.locationName;
    } else {
      autocompleteRef.current.value = "";
    }
  }, [props.place.locationName]);
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
          <Grid item xs={12} sm={1}></Grid>
          <Grid item xs={12} sm={9} marginBottom={1}>
            <Autocomplete
              apiKey={GOOGLE_MAP_API}
              className="custom-input"
              ref={autocompleteRef}
              style={{
                height: "48px",
                backgroundColor: "#f3f4f5",
                borderRadius: 10,
                border: "none",
                width: "98%",
                paddingLeft: 20,
                fontWeight: 600,
              }}
              options={{
                componentRestrictions: { country: "vn" },
                types: ["restaurant", "lodging", "tourist_attraction"],
                bounds: defaultBounds,
                fields: ["address_components", "geometry", "name"],
              }}
              defaultValue={props.place.locationName}
              placeholder="Thêm địa điểm"
              onPlaceSelected={handleSelectPlace}
              onClick={() => props.onClickAutocomplete(props.index, props.childIndex)}
            />
          </Grid>
          {!props.place.locationName && (
            <Grid item xs={12} sm={1} marginBottom={1}>
              <IconButton
                onClick={() =>
                  props.handleShowNote(props.index, props.childIndex)
                }
                sx={{
                  height: "48px",
                  width: "48px",
                  borderRadius: "24px",
                  backgroundColor: "#f3f4f5",
                }}
              >
                <StickyNote2OutlinedIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item xs={12} sm={1} marginBottom={1}>
            <IconButton
              onClick={handleDeletePlace}
              sx={{
                height: "48px",
                width: "48px",
                borderRadius: "24px",
                backgroundColor: "#f3f4f5",
              }}
            >
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </Grid>

          {!props.place.locationName ? (
            <Grid item xs={12}>
              <RecommendedPlaces
                index={props.index}
                childIndex={props.childIndex}
                trip={props.trip}
                onClickData={props.onClickData}
                handleClickData={handleClickData}
              />
            </Grid>
          ) : (
            <>
              <Grid item xs={2}></Grid>
              <Grid item xs={6}>
                <hr />
              </Grid>
            </>
          )}
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
          <Grid item xs={12} sm={1}></Grid>
          <Grid item xs={12} sm={9} marginBottom={1}>
            <TextField
              label={label}
              sx={{
                backgroundColor: "#f3f4f5",
                borderRadius: 3,
                "& fieldset": {
                  border: "none",
                },
                height: "51px",
                width: "98%",
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
              <IconButton
                onClick={handleDeletePlace}
                sx={{
                  height: "48px",
                  width: "48px",
                  borderRadius: "24px",
                  backgroundColor: "#f3f4f5",
                }}
              >
                <DeleteForeverOutlinedIcon />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
          <Grid item xs={12} sm={10}>
            <Autocomplete
              apiKey={GOOGLE_MAP_API}
              className="custom-input"
              ref={autocompleteRef}
              style={{
                height: "48px",
                backgroundColor: "#f3f4f5",
                borderRadius: 10,
                border: "none",
                width: "98%",
                paddingLeft: 20,
                fontWeight: 600,
              }}
              options={{
                componentRestrictions: { country: "vn" },
                types: ["restaurant", "lodging", "tourist_attraction"],
                bounds: defaultBounds,
                fields: ["address_components", "geometry", "name"],
              }}
              defaultValue={props.place.locationName}
              placeholder="Thêm địa điểm"
              onPlaceSelected={handleSelectPlace}
              onClick={() => props.onClickAutocomplete(props.index, props.childIndex)}
            />
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
          <Grid item xs={12} sm={11}>
            {!props.place.locationName ? (
              <RecommendedPlaces
                index={props.index}
                childIndex={props.childIndex}
                trip={props.trip}
                onClickData={props.onClickData}
                handleClickData={handleClickData}
              />
            ) : (
              <hr />
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default AutocompletePlaceForTrip;
