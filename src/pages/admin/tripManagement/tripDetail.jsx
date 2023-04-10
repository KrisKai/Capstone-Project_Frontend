import { Box, Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { tripApi } from "api";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getTripList,
  selectAllTripList,
  selectTripFilter,
  tripActions,
} from "../../../redux/modules/trip/tripSlice";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function StickyHeadTableTrip() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectTripFilter);

  function gotoCreate() {
    navigate("/admin/tripCreate");
  }

  function gotoView(id) {
    navigate(`/admin/tripView/${id}`);
  }

  useEffect(() => {
    //filter = { pageIndex: 0, pageSize: 10 };
    dispatch(getTripList(filter));
  }, [dispatch, filter]);

  return (
    <>
        <Card sx={{ minWidth: 275, maxWidth: 400 }} >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
    </>
  );
}
