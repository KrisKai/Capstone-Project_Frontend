import {
  TextField,
  Button,
  Card,
  Typography,
  IconButton,
  Grid,
  Collapse,
  CardHeader,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

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
      open: false,
    },
  ]);
  const [plans, setPlans] = useState([
    {
      planDate: props.item.listOfDate[0],
      routeId: 0,
      tripId: props.item.tripId,
      longitude: "",
      latitude: "",
      locationName: "",
      priority: 2,
      note: "",
      open: false,
    },
  ]);

  console.log(plans);

  useEffect(() => {
    console.log(props.item);
    const tmp = props.item.listOfDate.map((date, index) => {
      const newPlan = {
        planDate: date,
        routeId: 0,
        tripId: props.item.tripId,
        longitude: "",
        latitude: "",
        locationName: "",
        priority: 2 + index,
        note: "",
        open: false,
      };

      return newPlan;
    });
    setPlans(tmp);
  }, []);

  const handleToggleOpen = (index) => {
    const updatedPlans = [...plans];
    updatedPlans[index].open = !updatedPlans[index].open;
    setPlans(updatedPlans);
  };

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
        {plans.map((plan, index) => {
          return (
            <Box
              sx={{
                minWidth: 300,
                marginBottom: 1,
              }}
            >
              <CardHeader
                title={plan.planDate}
                action={
                  <IconButton
                    onClick={() => handleToggleOpen(index)}
                    aria-label="expand"
                    size="small"
                  >
                    {plan.open ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                }
              ></CardHeader>
              <div>
                <Collapse in={plan.open} timeout="auto" unmountOnExit>
                  {places.map((place, index) => {
                    return (
                      <AutocompletePlaceForTrip
                        key={index}
                        place={place}
                        onSelect={onSelect}
                      />
                    );
                  })}
                </Collapse>
              </div>
              <hr />
            </Box>
          );
        })}

        <hr />
      </Grid>
    </Grid>
  );
};

export default Plan;
