/* eslint-disable consistent-return */
import axios from "axios";
import { REACT_APP_RAPID_API_TRAVEL_API_KEY } from "config";

export const getPlacesData = async (type, lat, lng) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng`,
      {
        params: {
          latitude: lat,
          longitude: lng,
          lang: "vi",
        },
        headers: {
          "x-rapidapi-key": REACT_APP_RAPID_API_TRAVEL_API_KEY,
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get(
        "https://open-weather13.p.rapidapi.com/city/latlon",
        {
          params: { lat, lon: lng },
          headers: {
            'X-RapidAPI-Key': '229c00f068msh28734b3c30c4aacp115d1ejsn33650bd2adfa',
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
          },
        }
      );

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
