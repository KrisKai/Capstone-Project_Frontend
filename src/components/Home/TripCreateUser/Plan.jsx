import {
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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import AutocompletePlaceForTrip from "components/Extend/AutocompletePlaceForTrip";
import { tripRouteApi } from "api";

const Plan = (props) => {
  const [plans, setPlans] = useState([
    {
      planDate: props.item.listOfDate[0],
      routeId: 0,
      open: false,
      tripRoute: [
        {
          planDateTime: props.item.listOfDateTime[0],
          routeId: 0,
          tripId: props.item.tripId,
          longitude: "",
          latitude: "",
          locationName: "",
          priority: 1,
          showNote: false,
          note: "",
        },
      ],
    },
  ]);
  useEffect(() => {
    if (props.item.listOfDateTime) {
      const tmp = props.item.listOfDateTime.map((date, index) => {
        const newPlan = {
          planDate: props.item.listOfDate[index],
          routeId: 0,
          open: false,
          tripRoute: [
            {
              planDateTime: date,
              routeId: 0,
              tripId: props.item.tripId,
              longitude: "",
              latitude: "",
              locationName: "",
              priority: 1,
              showNote: false,
              note: "",
            },
          ],
        };
        tripRouteApi
          .getAllUser({
            pageIndex: 0,
            pageSize: 9999,
            planName: "",
            tripId: props.item.tripId,
            planDateTime: date,
          })
          .then((data) => {
            if (data.numOfRoute !== 0) {
              console.log(data.numOfRoute !== 0);
              newPlan.tripRoute = data.listOfRoute;
              const newTripRoute = {
                planDateTime: "",
                routeId: 0,
                tripId: props.item.tripId,
                longitude: "",
                latitude: "",
                locationName: "",
                priority: 1,
                showNote: false,
                note: "",
              };

              newPlan.tripRoute.push(newTripRoute);
            }
          })
          .catch((error) => {
            // Handle the error here if needed
          });

        return newPlan;
      });
      setPlans(tmp);
    }
  }, [props.item.trip, props.item.listOfDate]);

  const handleToggleOpen = (index) => {
    const updatedPlans = [...plans];
    updatedPlans[index].open = !updatedPlans[index].open;
    setPlans(updatedPlans);
  };

  const handleShowNote = (index, childIndex) => {
    const updatedPlans = [...plans];
    updatedPlans[index].tripRoute[childIndex].showNote =
      !updatedPlans[index].tripRoute[childIndex].showNote;
    setPlans(updatedPlans);
  };

  const onSelect = (index, childIndex, value) => {
    const updatedPlans = [...plans];
    updatedPlans[index].tripRoute[childIndex].locationName = value.name;
    updatedPlans[index].tripRoute[childIndex].longitude = value.lon.toString();
    updatedPlans[index].tripRoute[childIndex].latitude = value.lat.toString();
    const data = tripRouteApi.createUser(
      updatedPlans[index].tripRoute[childIndex]
    );
    console.log(data);
    const newTripRoute = {
      planDateTime: "",
      routeId: 0,
      tripId: props.item.tripId,
      longitude: "",
      latitude: "",
      locationName: "",
      priority: 1,
      showNote: false,
      note: "",
    };

    updatedPlans[index].tripRoute.push(newTripRoute);
    setPlans(updatedPlans);
  };

  const onChangeInput = (index, childIndex, value) => {
    const updatedPlans = [...plans];
    updatedPlans[index].tripRoute[childIndex].note = value;
    setPlans(updatedPlans);
  };

  console.log(plans);

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
              <Grid container sx={{ pb: 1 }}>
                <Grid item xs={12} sm={1}>
                  <IconButton
                    onClick={() => handleToggleOpen(index)}
                    aria-label="expand"
                    size="small"
                  >
                    {plan.open ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowRightIcon />
                    )}
                  </IconButton>
                </Grid>
                <Grid item xs={12} sm={11} pt={0.5}>
                  <Typography sx={{ fontWeight: "700", fontSize: "15px" }}>
                    {plan.planDate}
                  </Typography>
                </Grid>
              </Grid>

              <div>
                <Collapse in={plan.open} timeout="auto" unmountOnExit>
                  {plan.tripRoute.map((place, childIndex) => {
                    return (
                      <AutocompletePlaceForTrip
                        key={childIndex}
                        index={index}
                        childIndex={childIndex}
                        place={place}
                        onSelect={onSelect}
                        handleShowNote={handleShowNote}
                        onChangeInput={onChangeInput}
                        hotels={props.hotels}
                        restaurants={props.restaurants}
                        attractions={props.attractions}
                        onClickData={props.onClickData}
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
