import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { tripApi } from "api";
import {
  tripActions,
  getTripList,
  selectAllTripList,
  selectTripFilter,
} from "../../../redux/modules/trip/tripSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// assets

const columns = [
  { id: "fldTripName", label: "Trip Name", minWidth: 100 },
  {
    id: "fldTripBudget",
    label: "Trip Budget",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "fldTripDescription",
    label: "Trip Description",
    minWidth: 170,
    align: "center",
  },
  {
    id: "fldEstimateStartTime",
    label: "Estimate Start Time",
    minWidth: 130,
    align: "center",
  },
  {
    id: "fldEstimateArrivalTime",
    label: "Estimate Arrival Time",
    minWidth: 130,
    align: "center",
  },
  {
    id: "fldTripStatus",
    label: "Trip Status",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "fldTripMember",
    label: "Trip Member",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

export default function StickyHeadTableTrip() {
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const dispatch = useAppDispatch();
  const allTrips = useAppSelector(selectAllTripList);
  const filter = useAppSelector(selectTripFilter);
  const tripList = allTrips.listOfTrip;
  const numberOfTrip = allTrips.numOfTrip;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // call api
    dispatch(
      tripActions.setFilter({
        ...filter,
        tripName: event.target.value,
      })
    );
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    dispatch(
      tripActions.setFilter({
        ...filter,
        tripName: event.target.value,
      })
    );
  };

  const handleChangePage = (event, newPage) => {
    dispatch(
      tripActions.setFilter({
        ...filter,
        pageIndex: newPage,
      })
    );
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(
      tripActions.setFilter({
        ...filter,
        pageIndex: 0,
        pageSize: +event.target.value,
      })
    );
  };

  const handleUpdate = (id) => {
    // update
    navigate(`/admin/tripUpdate/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      // Remove trip API
      await tripApi.delete(id || "");

      toast.success('Remove trip successfully!');

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      dispatch(tripActions.setFilter(newFilter));
    } catch (error) {
      // Toast error
      console.log("Failed to fetch trip", error);
    }
  };

  function gotoCreate() {
    navigate("/admin/tripCreate");
  }

  useEffect(() => {
    //filter = { pageIndex: 0, pageSize: 10 };
    console.log(filter);
    dispatch(getTripList(filter));
  }, [dispatch, filter]);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ mt: 1, mb: 1 }} textAlign="right">
          <TextField
            id="search"
            type="search"
            label="Search"
            value={searchTerm}
            onChange={handleChange}
            sx={{ width: 400 }}
          />
          <Button variant="outlined" onClick={handleSearch} sx={{ height: 42 }}>
            Search
          </Button>
        </Box>

        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell key="edit" align="center">
                  Edit || Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tripList.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={row.fldTripId}
                    key={row.fldTripId}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell key="edit" align="center">
                      <Button
                        variant="outlined"
                        value={row.fldTripId}
                        onClick={(e) => handleUpdate(e.target.value)}
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        value={row.fldTripId}
                        onClick={(e) => handleDelete(e.target.value)}
                        color="secondary"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={numberOfTrip}
          rowsPerPage={filter.pageSize}
          page={filter.pageIndex}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box sx={{ mt: 2 }} textAlign="right">
        <Button variant="outlined" onClick={gotoCreate} right>
          Create
        </Button>
      </Box>
    </>
  );
}
