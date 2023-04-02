import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TextField, Button, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  tripActions,
  getTripList,
  selectAllTripList,
  selectTripFilter,
  selectTripPagination,
} from "../../../redux/modules/trip/tripSlice";

// assets
import { SearchOutlined } from "@ant-design/icons";

const columns = [
  { id: "fldTripName", label: "Trip Name", minWidth: 100 },
  {
    id: "fldTripBudget",
    label: "Trip Budget",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "fldTripDescription",
    label: "Trip Description",
  },
  {
    id: "fldEstimateStartTime",
    label: "Estimate Start Time",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "fldEstimateArrivalTime",
    label: "Estimate Arrival Time",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "fldTripStatus",
    label: "Trip Status",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "fldTripMember",
    label: "Trip Member",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

export default function StickyHeadTableTrip() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState("");
  const dispatch = useAppDispatch();
  const allTrips = useAppSelector(selectAllTripList);
  const filter = useAppSelector(selectTripFilter);
  const tripList = allTrips.listOfTrip;
  const numberOfTrip = allTrips.numOfTrip;
  console.log(allTrips)

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // call api
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(
      tripActions.setFilter({
        ...filter,
        pageIndex: newPage,
      })
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    dispatch(
      tripActions.setFilter({
        ...filter,
        pageIndex: 0,
        pageSize: +event.target.value
      })
    );
  };

  const handleUpdate = () => {
    // update
  };

  const handleDelete = () => {
    // delete
  };

  function gotoCreate() {
    //go to create
  }

  useEffect(() => {
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
          <Button variant="outlined" onClick={handleSearch} right>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
                        onClick={handleSearch}
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleSearch}
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
          rowsPerPage={rowsPerPage}
          page={page}
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
