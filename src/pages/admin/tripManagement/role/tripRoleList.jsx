import { Box, Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { tripApi } from "api";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import Grid from "@mui/material/Grid";
import {
  getTripList,
  selectAllTripList,
  selectTripFilter,
  tripActions,
} from "../../../../redux/modules/trip/tripSlice";

// assets

const columns = [
  { id: "fldRoleName", label: "Role Name", minWidth: 100, onclick: true },
  {
    id: "fldType",
    label: "Type",
    minWidth: 100,
    align: "center",
  },
  {
    id: "fldDescription",
    label: "Description",
    minWidth: 170,
    align: "center",
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
  const { tripId } = useParams();

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

      toast.success("Remove trip successfully!");

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      dispatch(tripActions.setFilter(newFilter));
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
    navigate("/admin/tripCreate");
  }

  function gotoList() {
    navigate(`/admin/tripDetail/${tripId}`);
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
                        <>
                          {column.onclick ? (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              onClick={() => gotoView(row.fldTripId)}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          ) : (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          )}
                        </>
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
      <Grid container  sx={{ mt: 2 }}>
        <Grid xs={6}>
        <Button variant="outlined" onClick={gotoList} right>
        Return to List
        </Button>
        </Grid>
        <Grid xs={6} textAlign="right">
        <Button variant="outlined" onClick={gotoCreate} right>
          Create
        </Button>
        </Grid>
      </Grid>
    </>
  );
}
