import { Box } from "@mui/material";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_MAP_API } from "config";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function MapForTrip({ getReturnData, passToProps }) {
  const center = {
    lat: parseFloat(passToProps.endLatitude),
    lng: parseFloat(passToProps.endLongitude),
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API,
    libraries: ["places"],
  });

  return (
    <>
      {!isLoaded ? (
        "a"
      ) : (
        <Box height="79vh" width="100%" display="flex">
          <GoogleMap
            center={center}
            zoom={13}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          ></GoogleMap>
        </Box>
      )}
    </>
  );
}
