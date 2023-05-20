import { Box, Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { itemApi } from "api";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";

const columns = [
  // { id: "ItemId", label: "Item Id", minWidth: 100, onclick: true },
  {
    id: "ItemName",
    label: "Item Name",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
    onclick: true,
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

export default function StickyHeadTableItem(props) {
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [allItems, setAllItems] = useState({
    listOfItem: [],
    numOfItem: 0,
  });
  const [filter, setFilter] = useState({
    pageIndex: 0,
    pageSize: 10,
    itemName: "",
    categoryId: props.category.CategoryId,
  });
  const itemList = allItems.listOfItem;
  const numberOfItem = allItems.numOfItem;

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
    navigate(`/admin/itemUpdate/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      // Remove item API
      await itemApi.delete(id || "");

      toast.success("Remove item successfully!");

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      setFilter(newFilter);
    } catch (error) {
      // Toast error
      console.log("Failed to fetch item", error);
      if (error.response.status == 401) {
        localStorage.removeItem("access_token");
        navigate("/auth/login");
      }
    }
  };

  function gotoView(id) {
    navigate(`/admin/itemView/${id}`);
  }

  useEffect(() => {
    async function getAllItems() {
      const response = await itemApi.getAll(filter);
      setAllItems(response);
    }
    getAllItems();
  }, [filter]);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Grid container sx={{ mt: 1, mb: 1 }}>
          <Grid xs={6} sx={{ pl: 1 }}>
            <h2>{props.category.CategoryName}</h2>
          </Grid>
        </Grid>
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
                    tabIndex={row.ItemId}
                    key={row.ItemId}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          {column.onclick ? (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              onClick={() => gotoView(row.ItemId)}
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
                        value={row.ItemId}
                        onClick={(e) => handleUpdate(e.target.value)}
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        value={row.ItemId}
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
