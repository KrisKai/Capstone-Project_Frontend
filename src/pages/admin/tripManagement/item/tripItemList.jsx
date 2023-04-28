import { Box, Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import { itemCategoryApi, tripItemApi } from "api";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import StickyHeadTableTripItem from "components/trip-item/tripItemTable";

export default function TripItem() {
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [allTripItems, setAllTripItems] = useState({
    listOfItem: [],
    numOfItem: 0,
  });
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState({
    pageIndex: 0,
    pageSize: 10,
    itemName: "",
  });
  const itemList = allTripItems.listOfItem;
  const numberOfItem = allTripItems.numOfItem;
  const { tripId } = useParams();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // call api
    setFilter({
      ...filter,
      itemName: event.target.value,
    });
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setFilter({
      ...filter,
      itemName: event.target.value,
    });
  };

  const handleChangePage = (event, newPage) => {
    setFilter({
      ...filter,
      pageIndex: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setFilter({
      ...filter,
      pageIndex: 0,
      pageSize: +event.target.value,
    });
  };

  const handleUpdate = (id) => {
    // update
    navigate(`/admin/tripItemUpdate/${tripId}/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      // Remove trip API
      await tripItemApi.delete(id || "");

      toast.success("Remove trip item successfully!");

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      setFilter(newFilter);
    } catch (error) {
      // Toast error
      console.log("Failed to fetch trip", error);
      if (error.response.status == 401) {
        localStorage.removeItem("access_token");
        navigate("/auth/login");
      }
    }
  };

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
      const response = await tripItemApi.getAll(filter);
      setAllTripItems(response);
    }
    getAllItems();
  }, [filter]);

  return (
    <>
      {categoryList.map((category) => (
        <StickyHeadTableTripItem />
      ))}
    </>
  );
}
