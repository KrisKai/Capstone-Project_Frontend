/* eslint-disable consistent-return */
import axios from "axios";
import { GOOGLE_MAP_API } from "config";

export const getPlacesDataByGoogleMap = async (type, lat, lng) => {
  try {
    const {
      data: { data },
    } = await axios
      .get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
        params: {
          key: GOOGLE_MAP_API,
          location: lat + "," + lng,
          radius: 5000,
          type: type,
        },
      })
      .then((response) => {
        const results = response.data.results;
        // Process the results as needed
        console.log(results);
      })
      .catch((error) => {
        console.error("Error retrieving nearby places:", error);
      });

    return data;
  } catch (error) {
    console.log(error);
  }
};
