import { Box, Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { tripItemApi } from "api";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";

const columns = [
  // { id: "fldItemId", label: "Item Id", minWidth: 100, onclick: true },
  {
    id: "fldItemName",
    label: "Item Name",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
    onclick: true,
  },
  {
    id: "fldItemDescription",
    label: "Item Description",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "fldCategoryName",
    label: "Category Name",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export default function StickyHeadTableTripItem(props) {
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [allTripItems, setAllTripItems] = useState({
    listOfItem: [],
    numOfItem: 0,
  });
  const [filter, setFilter] = useState({
    pageIndex: 0,
    pageSize: 10,
    itemName: "",
    categoryId: props.category.fldCategoryId,
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

  function gotoView(id) {
    navigate(`/admin/tripItemView/${id}`);
  }

  useEffect(() => {
    async function getAllItems() {
      const response = await tripItemApi.getAll(filter);
      setAllTripItems(response);
    }
    getAllItems();
  }, [filter]);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Grid container sx={{ mt: 1, mb: 1 }}>
          <Grid xs={6} sx={{ pl: 1 }}>
            <h2>{props.category.fldCategoryName}</h2>
          </Grid>
          <Grid xs={6} textAlign="right" sx={{ pr: 1 }}>
            <TextField
              id="search"
              type="search"
              label="Search"
              value={searchTerm}
              onChange={handleChange}
              sx={{ width: 400 }}
            />
            <Button
              variant="outlined"
              onClick={handleSearch}
              sx={{ height: 42 }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ mt: 1, mb: 1 }} textAlign="right"></Box>

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
              {itemList.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={row.fldItemId}
                    key={row.fldItemId}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          {column.onclick ? (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              onClick={() => gotoView(row.fldItemId)}
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
                        value={row.fldItemId}
                        onClick={(e) => handleUpdate(e.target.value)}
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        value={row.fldItemId}
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
          count={numberOfItem}
          rowsPerPage={filter.pageSize}
          page={filter.pageIndex}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Grid container sx={{ mt: 2 }}></Grid>
    </>
  );
}
