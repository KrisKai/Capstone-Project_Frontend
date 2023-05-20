import { Box, Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { tripApi } from "api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const columns = [
  { id: "TripName", label: "Trip Name", minWidth: 100, onclick: true },
  {
    id: "TripBudget",
    label: "Trip Budget",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "StartLocationName",
    label: "Departure",
    minWidth: 170,
    align: "center",
  },
  {
    id: "EndLocationName",
    label: "Destination",
    minWidth: 170,
    align: "center",
  },
  {
    id: "TripStatus",
    label: "Trip Status",
    minWidth: 130,
    align: "center",
  },
];

export default function StickyHeadTableTrip() {
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [allTrips, setAllTrips] = useState({ listOfTrip: [], numOfTrip: 0 });
  const [filter, setFilter] = useState({
    pageIndex: 0,
    pageSize: 10,
    tripName: "",
  });
  const tripList = allTrips.listOfTrip;
  const numberOfTrip = allTrips.numOfTrip;

  const handleClickOpen = (e) => {
    setOpen(true);
    setDeleteId(e);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // call api
    setFilter({
      ...filter,
      tripName: event.target.value,
    });
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setFilter({
      ...filter,
      tripName: event.target.value,
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

  const handleDetail = (id) => {
    // detail
    navigate(`/admin/tripDetail/${id}`);
  };

  const handleUpdate = (id) => {
    // update
    navigate(`/admin/tripUpdate/${id}`);
  };

  const handleDelete = async () => {
    try {
      // Remove trip API
      const data = await tripApi.delete(deleteId || "");
      switch (data.Code) {
        case "G001":
          return toast.error(data.Message);
        case "D001":
          return toast.error(data.Message);
        default:
          toast.success("Remove trip successfully!");

          // Trigger to re-fetch student list with current filter
          const newFilter = { ...filter };
          setFilter(newFilter);
          setOpen(false);
          setDeleteId(null);
      }
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

  function gotoView(id) {
    navigate(`/admin/tripView/${id}`);
  }

  useEffect(() => {
    async function getAllTrips() {
      const response = await tripApi.getAll(filter);
      setAllTrips(response);
    }
    getAllTrips();
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
                <TableCell key="detail" align="center">
                  Show Detail
                </TableCell>
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
                    tabIndex={row.TripId}
                    key={row.TripId}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          {column.onclick ? (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              onClick={() => gotoView(row.TripId)}
                              style={{ textDecoration: "underline" }}
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
                    <TableCell key="detail" align="center">
                      <Button
                        variant="outlined"
                        value={row.TripId}
                        onClick={(e) => handleDetail(e.target.value)}
                        color="primary"
                      >
                        About Trip
                      </Button>
                    </TableCell>
                    <TableCell key="edit" align="center">
                      <Button
                        variant="outlined"
                        value={row.TripId}
                        onClick={(e) => handleUpdate(e.target.value)}
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        value={row.TripId}
                        onClick={(e) => handleClickOpen(e.target.value)}
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
          count={numberOfTrip}
          rowsPerPage={filter.pageSize}
          page={filter.pageIndex}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box sx={{ mt: 2 }} textAlign="right">
        <Button variant="contained" onClick={gotoCreate}>
          Create
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this user?"}
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
