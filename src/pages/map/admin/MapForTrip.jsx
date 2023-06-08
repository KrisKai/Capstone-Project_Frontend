import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { GOOGLE_MAP_API, PLACE_API } from "config";
import "./map.css";

import { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import olms from "ol-mapbox-style";
import * as proj from "ol/proj";

const center = { lat: 16.0545, lng: 108.22074 };

const restrictions = {
  country: "vn",
};

const offices = [
  {
    id: "1",
    field_address: {
      locality: "Gent",
      postal_code: "9000",
      address_line1: "Veldstraat 1",
      address_line2: "a",
      latitude: 16.0545,
      longitude: 108.22074,
    },
  },
];

export default function MapForTrip({ getReturnData, passToProps }) {
  console.log(1)
  let mapContainer;
  useEffect(() => {
    const initialState = {
      lng: 108.22074,
      lat: 16.0545,
      zoom: 15,
    };

    const myAPIKey = PLACE_API;
    const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";

    olms(mapContainer, `${mapStyle}?apiKey=${myAPIKey}`).then((map) => {
      map
        .getView()
        .setCenter(
          proj.transform(
            [initialState.lng, initialState.lat],
            "EPSG:4326",
            "EPSG:3857"
          )
        );
      map.getView().setZoom(initialState.zoom);
    });
  }, [mapContainer]);

  return (
    <Box
      className="map-container"
      ref={(el) => (mapContainer = el)}
      sx={{ height: "100%", width: "100%" }}
    />
  );
}
