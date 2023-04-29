import { Box, Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import {
  tripApi,
  tripMemberApi,
  tripPlanApi,
  tripRoleApi,
  tripItemApi,
} from "api";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function StickyHeadTableTrip() {
  let navigate = useNavigate();
  const { tripId } = useParams();
  const [planList, setPlanList] = useState(0);
  const [roleList, setRoleList] = useState(0);
  const [memberList, setMemberList] = useState(0);
  const [itemList, setItemList] = useState(0);

  function gotoPlan() {
    navigate(`/admin/tripPlanList/${tripId}`);
  }

  function gotoMember() {
    navigate(`/admin/tripMemberList/${tripId}`);
  }

  function gotoRole() {
    navigate(`/admin/tripRoleList/${tripId}`);
  }

  function gotoItem() {
    navigate(`/admin/tripItemList/${tripId}`);
  }

  function gotoList() {
    navigate(`/admin/tripList`);
  }

  useEffect(() => {
    if (!tripId) return;
    // IFFE
    (async () => {
      try {
        const data = await tripApi.getById(tripId);
        if (data != null && data != "") {
          const filter = {
            pageIndex: 0,
            pageSize: 10,
          };
          const plan = await tripPlanApi.getAll(filter);
          const role = await tripRoleApi.getAll(filter);
          const member = await tripMemberApi.getAll(filter);
          const item = await tripItemApi.getAll(filter);
          setPlanList(plan.numOfPlan);
          setRoleList(role.numOfRole);
          setMemberList(member.numOfMember);
          setItemList(item.numOfItem);
        } else {
          navigate("/admin/tripList");
        }
      } catch (error) {
        console.log("Failed to fetch trip details", error);
        if (error.response.status == 401) {
          localStorage.removeItem("access_token");
          navigate("/auth/login");
        }
      }
    })();
  }, [tripId]);

  return (
    <>
      <Box
        component="ul"
        sx={{ display: "flex", gap: 2, flexWrap: "wrap", p: 0, m: 0 }}
      >
        <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Trip Route
            </Typography>
            <Typography variant="body2" sx={{ mt: 3 }}>
              includes {planList} location(s)
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={gotoPlan}>
              More Details
            </Button>
          </CardActions>
        </Card>
        <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Trip Member
            </Typography>
            <Typography variant="body2" sx={{ mt: 3 }}>
              includes {memberList} member(s)
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={gotoMember}>
              More Details
            </Button>
          </CardActions>
        </Card>
        <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Trip Role
            </Typography>
            <Typography variant="body2">includes {roleList} role(s)</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={gotoRole}>
              More Details
            </Button>
          </CardActions>
        </Card>
        <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Trip Item
            </Typography>
            <Typography variant="body2">includes {itemList} item(s)</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={gotoItem}>
              More Details
            </Button>
          </CardActions>
        </Card>
        <Grid container sx={{ mt: 2 }}>
          <Grid xs={6}>
            <Button variant="outlined" onClick={gotoList} right>
              Return to Detail
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
