/* eslint-disable consistent-return */
import axios from "axios";
import { REACT_APP_RAPID_API_TRAVEL_API_KEY } from "config";

export const getPlacesProps = async (name) => {
  try {
    const data = await axios.get(
      `https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname`,
      {
        params: { name: name },
        headers: {
          "X-RapidAPI-Key":
            "229c00f068msh28734b3c30c4aacp115d1ejsn33650bd2adfa",
          "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
        },
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
