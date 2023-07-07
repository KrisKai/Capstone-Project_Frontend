/* eslint-disable consistent-return */
import axios from "axios";

export const getPlacesProps = async (queryParams) => {
  try {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "https://localhost:3000",
        // Add any other custom headers here
      },
    };
    const url =
      "https://zaoi87mvxj.execute-api.ap-southeast-2.amazonaws.com/normalize-place";

    const data = await axios.post(url, queryParams, config);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
