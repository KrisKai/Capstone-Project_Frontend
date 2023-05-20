import { Box, Button, TextField } from "@mui/material";
import { itemCategoryApi } from "api";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import StickyHeadTableItem from "components/item/itemTable";

const columns = [
  {
    id: "ItemName",
    label: "Item Name",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
    onclick: true,
  },
  {
    id: "ItemDescription",
    label: "Item Description",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "CategoryName",
    label: "Category Name",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Quantity",
    label: "Quantity",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export default function ItemList() {
  let navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);

  function gotoCreate() {
    navigate(`/admin/itemCreate`);
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
        <StickyHeadTableItem category={category} />
      ))}
      <Grid container sx={{ mt: 2 }}>
        <Grid xs={6}></Grid>
        <Grid xs={6} textAlign="right">
          <Button variant="contained" onClick={gotoCreate}>
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
