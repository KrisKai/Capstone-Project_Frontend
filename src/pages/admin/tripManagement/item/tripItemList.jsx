import { Button } from "@mui/material";
import { itemCategoryApi, tripItemApi } from "api";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import StickyHeadTableTripItem from "components/trip-item/tripItemTable";

export default function TripItem() {
  let navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const { tripId } = useParams();

  function gotoCreate() {
    navigate(`/admin/tripItemCreate/${tripId}`);
  }

  function gotoList() {
    navigate(`/admin/tripDetail/${tripId}`);
  }

  useEffect(() => {
    async function getAllItems() {
      const category = await itemCategoryApi.getAll({
        pageIndex: 0,
        pageSize: 10,
      });
      setCategoryList(category.listOfCategory);
    }
    getAllItems();
  }, []);

  return (
    <>
      {categoryList.map((category) => (
        <StickyHeadTableTripItem category={category} />
      ))}
      <Grid container sx={{ mt: 2 }}>
        <Grid xs={6}>
          <Button variant="outlined" onClick={gotoList} right>
            Return to Detail
          </Button>
        </Grid>
        <Grid xs={6} textAlign="right">
          <Button variant="outlined" onClick={gotoCreate}>
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
