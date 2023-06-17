import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AutocompletePlaceForTrip from "components/Extend/AutocompletePlaceForTrip";

const Plan = (props) => {
  const [places, setPlaces] = useState([
    {
      routeId: 0,
      tripId: props.item.tripId,
      longitude: "",
      latitude: "",
      locationName: "",
      priority: 2,
    },
  ]);

  useEffect(() => {
    console.log(props.item);
  }, []);

  const onSelect = (value) => {
    console.log(value);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          marginBottom={2}
          sx={{ fontSize: "1.5 rem", fontWeight: 700 }}
        >
          <CalendarMonthOutlinedIcon /> Kế hoạch cho chuyến đi
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ pt: 3 }}>
        {places.map((place, index) => {
          return (
            <AutocompletePlaceForTrip
              key={index}
              place={place}
              onSelect={onSelect}
            />
          );
        })}

        <hr />
      </Grid>
    </Grid>
  );
};

export default Plan;
