import { Typography, IconButton, Grid, Collapse, Box } from "@mui/material";
import { useEffect, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import AutocompletePlaceForTrip from "components/Extend/AutocompletePlaceForTrip";
import { tripRouteApi } from "api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

const Plan = (props) => {
  // const [props.plans, props.setPlans] = useState([
  //   {
  //     planDate: props.item.listOfDate[0],
  //     routeId: 0,
  //     open: false,
  //     tripRoute: [
  //       {
  //         planDateTime: props.item.listOfDateTime[0],
  //         routeId: 0,
  //         tripId: props.item.tripId,
  //         longitude: "",
  //         latitude: "",
  //         locationName: "",
  //         priority: 1,
  //         showNote: false,
  //         note: "",
  //         placeId: "",
  //       },
  //     ],
  //   },
  // ]);

  // useEffect(() => {
  //   if (props.item.listOfDateTime) {
  //     const tmp = props.item.listOfDateTime.map((date, index) => {
  //       const newPlan = {
  //         planDate: props.item.listOfDate[index],
  //         routeId: 0,
  //         open: false,
  //         tripRoute: [
  //           {
  //             planDateTime: date,
  //             routeId: 0,
  //             tripId: props.item.tripId,
  //             longitude: "",
  //             latitude: "",
  //             locationName: "",
  //             priority: 1,
  //             showNote: false,
  //             note: "",
  //             placeId: "",
  //           },
  //         ],
  //       };
  //       tripRouteApi
  //         .getAllUser({
  //           pageIndex: 0,
  //           pageSize: 9999,
  //           planName: "",
  //           tripId: props.item.tripId,
  //           planDateTime: date,
  //         })
  //         .then((data) => {
  //           if (data.numOfRoute !== 0) {
  //             newPlan.tripRoute = data.listOfRoute;
  //             const newTripRoute = {
  //               planDateTime: date,
  //               routeId: 0,
  //               tripId: props.item.tripId,
  //               longitude: "",
  //               latitude: "",
  //               locationName: "",
  //               priority: 1,
  //               showNote: false,
  //               note: "",
  //               placeId: "",
  //             };

  //             newPlan.tripRoute.push(newTripRoute);
  //           }
  //         })
  //         .catch((error) => {
  //           // Handle the error here if needed
  //         });

  //       return newPlan;
  //     });
  //     props.setPlans(tmp);
  //   }
  // }, [props.item.trip, props.item.listOfDate]);

  useEffect(() => {
    props.getPlanData(props.plans);
  }, [props.plans]);

  useEffect(() => {
    async function addTripRoute() {
      if (props.placeData !== null && props.placeStatus === false) {
        const value = props.placeData;
        const coor = JSON.stringify(value.geometry.location);
        let updatedPlans = [...props.plans];
        const childIndex =
          updatedPlans[props.selectedIndex].tripRoute.length - 1;
        updatedPlans[props.selectedIndex].tripRoute[childIndex].locationName =
          value.name;
        updatedPlans[props.selectedIndex].tripRoute[childIndex].longitude =
          JSON.parse(coor).lng.toString();
        updatedPlans[props.selectedIndex].tripRoute[childIndex].latitude =
          JSON.parse(coor).lat.toString();
        updatedPlans[props.selectedIndex].tripRoute[childIndex].placeId =
          value.place_id;
        const id =
          updatedPlans[props.selectedIndex].tripRoute[childIndex].priority;
        const data = await tripRouteApi.createUser(
          updatedPlans[props.selectedIndex].tripRoute[childIndex]
        );
        updatedPlans[props.selectedIndex].tripRoute[childIndex].routeId = data;
        const newTripRoute = {
          planDateTime:
            updatedPlans[props.selectedIndex].tripRoute[0].planDateTime,
          routeId: 0,
          tripId: props.item.tripId,
          longitude: "",
          latitude: "",
          locationName: "",
          priority: id + 1,
          showNote: false,
          note: "",
          placeId: "",
        };

        updatedPlans[props.selectedIndex].tripRoute.push(newTripRoute);
        props.setPlans(updatedPlans);
        props.setPlaceStatus(true);
      }
    }
    addTripRoute();
  }, [props.placeData]);

  const handleToggleOpen = (index) => {
    const updatedPlans = [...props.plans];
    updatedPlans[index].open = !updatedPlans[index].open;
    props.setPlans(updatedPlans);
  };

  const handleShowNote = (index, childIndex) => {
    const updatedPlans = [...props.plans];
    updatedPlans[index].tripRoute[childIndex].showNote =
      !updatedPlans[index].tripRoute[childIndex].showNote;
    props.setPlans(updatedPlans);
  };

  const onSelect = async (index, childIndex, value) => {
    const coor = JSON.stringify(value.geometry.location);
    const updatedPlans = [...props.plans];
    updatedPlans[index].tripRoute[childIndex].locationName = value.name;
    updatedPlans[index].tripRoute[childIndex].longitude =
      JSON.parse(coor).lng.toString();
    updatedPlans[index].tripRoute[childIndex].latitude =
      JSON.parse(coor).lat.toString();
    updatedPlans[index].tripRoute[childIndex].placeId = value.place_id;
    const data = await tripRouteApi.createUser(
      updatedPlans[index].tripRoute[childIndex]
    );
    updatedPlans[index].tripRoute[childIndex].routeId = data;
    const newTripRoute = {
      planDateTime: updatedPlans[index].tripRoute[childIndex].planDateTime,
      routeId: 0,
      tripId: props.item.tripId,
      longitude: "",
      latitude: "",
      locationName: "",
      priority: 1,
      showNote: false,
      note: "",
      placeId: "",
    };

    updatedPlans[index].tripRoute.push(newTripRoute);
    props.setPlans(updatedPlans);
  };

  const handleClickData = async (index, childIndex, value) => {
    const placeIdToCheck = value.place_id; // Replace "your-place-id" with the actual placeId you want to check

    const test = props.plans[index].tripRoute.findIndex(
      (route) => route.placeId === placeIdToCheck
    );

    let status;
    if (test !== -1) {
      status = true;
    } else {
      status = false;
    }
    props.handleClickData(index, childIndex, value.place_id, status);
  };

  const onChangeInput = (index, childIndex, value) => {
    const updatedPlans = [...props.plans];
    updatedPlans[index].tripRoute[childIndex].note = value;
    props.setPlans(updatedPlans);
  };

  const handleClick = async (index, childIndex) => {
    const updatedPlans = [...props.plans];
    const newTripRoute = {
      planDateTime: updatedPlans[index].tripRoute[0].planDateTime,
      routeId: 0,
      tripId: props.item.tripId,
      longitude: "",
      latitude: "",
      locationName: "",
      priority: 1,
      showNote: false,
      note: "",
      placeId: "",
    };
    if (childIndex + 1 === updatedPlans[index].tripRoute.length) {
      updatedPlans[index].tripRoute.splice(childIndex, 1);
      updatedPlans[index].tripRoute.push(newTripRoute);
    } else {
      await tripRouteApi
        .deleteUser(updatedPlans[index].tripRoute[childIndex].routeId)
        .then(() => {
          updatedPlans[index].tripRoute.splice(childIndex, 1);
        });
    }
    props.setPlans(updatedPlans);
  };

  // console.log(props.plans);

  return (
    <Grid container>
      <Grid item xs={12} sm={9}>
        <Typography
          variant="h3"
          marginBottom={2}
          sx={{ fontSize: "1.5 rem", fontWeight: 700 }}
        >
          <CalendarMonthOutlinedIcon sx={{ marginBottom: "1px" }} /> Kế hoạch
          cho chuyến đi
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Box
          sx={{
            backgroundColor: "#e9ecef",
            borderColor: "#e9ecef",
            borderWidth: "1px",
            borderRadius: "24px",
            height: "40px",
            minWidth: "40px",
            padding: "7px",
            paddingLeft: "14px",
            paddingRight: "14px",
          }}
          display="flex"
          alignItems=" center"
          justifyContent="center"
        >
          <FontAwesomeIcon icon={faCalendarDays} />{" "}
          <Typography sx={{ fontWeight: 700 }} marginLeft={1} paddingTop={0.5}>
            {dayjs(props.item.estimateStartDate).format("D/M")} -{" "}
            {dayjs(props.item.estimateEndDate).format("D/M")}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ pt: 3 }}>
        {props.plans.map((plan, index) => {
          return (
            <Box
              key={index}
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
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "700", fontSize: "15px" }}
                  >
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
                        trip={props.item}
                        onSelect={onSelect}
                        handleShowNote={handleShowNote}
                        onChangeInput={onChangeInput}
                        handleClick={handleClick}
                        handleClickData={handleClickData}
                        onClickAutocomplete={props.onClickAutocomplete}
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
      </Grid>
    </Grid>
  );
};

export default Plan;
