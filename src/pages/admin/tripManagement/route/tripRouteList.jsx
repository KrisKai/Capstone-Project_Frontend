import { Box, Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { tripRouteApi } from "api";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";

// assets

const columns = [
  { id: "fldRouteId", label: "Route Id", minWidth: 100, onclick: true },
  {
    id: "fldRouteDescription",
    label: "Route Description",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export default function StickyHeadTableTripRoute() {
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [allTripRoutes, setAllTripRoutes] = useState({
    listOfRoute: [],
    numOfRoute: 0,
  });
  const [filter, setFilter] = useState({
    pageIndex: 0,
    pageSize: 10,
    planName: "",
  });
  const planList = allTripRoutes.listOfRoute;
  const numberOfRoute = allTripRoutes.numOfRoute;
  const { tripId } = useParams();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // call api
    setFilter({
      ...filter,
      planName: event.target.value,
    });
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setFilter({
      ...filter,
      planName: event.target.value,
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
    navigate(`/admin/tripRouteUpdate/${tripId}/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      // Remove trip API
      await tripRouteApi.delete(id || "");

      toast.success("Remove trip plan successfully!");

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
    navigate(`/admin/tripRouteCreate/${tripId}`);
  }

  function gotoList() {
    navigate(`/admin/tripDetail/${tripId}`);
  }

  function gotoView(id) {
    navigate(`/admin/tripRouteView/${id}`);
  }

  useEffect(() => {
    async function getAllRoutes() {
      const response = await tripRouteApi.getAll(filter);
      setAllTripRoutes(response);
    }
    getAllRoutes();
  }, [filter]);

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
              {planList.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={row.fldRouteId}
                    key={row.fldRouteId}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          {column.onclick ? (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              onClick={() => gotoView(row.fldRouteId)}
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
                        value={row.fldRouteId}
                        onClick={(e) => handleUpdate(e.target.value)}
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        value={row.fldRouteId}
                        onClick={(e) => handleDelete(e.target.value)}
                        color="error"
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
          count={numberOfRoute}
          rowsPerPage={filter.pageSize}
          page={filter.pageIndex}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Grid container sx={{ mt: 2 }}>
        <Grid xs={6}>
          <Button variant="outlined" onClick={gotoList} right>
            Return to Detail
          </Button>
        </Grid>
        <Grid xs={6} textAlign="right">
          <Button variant="contained" onClick={gotoCreate} right>
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
