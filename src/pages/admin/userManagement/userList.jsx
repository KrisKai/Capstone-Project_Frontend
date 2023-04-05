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
import { userApi } from "api";
import {
  userActions,
  getUserList,
  selectAllUserList,
  selectUserFilter,
} from "../../../redux/modules/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// assets

const columns = [
  { id: "fldUsername", label: "UserName", minWidth: 100 },
  {
    id: "fldFullname",
    label: "Full Name",
    minWidth: 150,
    align: "center",
  },
  {
    id: "fldRole",
    label: "Role",
    minWidth: 100,
    align: "center",
  },
  {
    id: "fldBirthday",
    label: "Birthday",
    minWidth: 130,
    align: "center",
  },
  {
    id: "fldPhone",
    label: "Phone Number",
    minWidth: 130,
    align: "center",
  },
  {
    id: "fldEmail",
    label: "Email",
    minWidth: 170,
    align: "center",
  },
  {
    id: "fldAddress",
    label: "Address",
    minWidth: 170,
    align: "center",
  },
  {
    id: "fldActiveStatus",
    label: "Active Status",
    minWidth: 100,
    align: "center",
  },
  {
    id: "fldCreateDate",
    label: "Create Date",
    minWidth: 100,
    align: "center",
  },
  {
    id: "fldCreateBy",
    label: "Create By",
    minWidth: 100,
    align: "center",
  },
];

export default function StickyHeadTableUser() {
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector(selectAllUserList);
  const filter = useAppSelector(selectUserFilter);
  const userList = allUsers.listOfUser;
  const numOfUser = allUsers.numOfUser;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // call api
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    dispatch(
      userActions.setFilter({
        ...filter,
        pageIndex: newPage,
      })
    );
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(
      userActions.setFilter({
        ...filter,
        pageIndex: 0,
        pageSize: +event.target.value,
      })
    );
  };

  const handleUpdate = (id) => {
    // update
    navigate(`/admin/userUpdate/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      // Remove user API
      await userApi.delete(id || "");

      toast.success('Remove user successfully!');

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      dispatch(userActions.setFilter(newFilter));
    } catch (error) {
      // Toast error
      console.log("Failed to fetch user", error);
    }
  };

  function gotoCreate() {
    navigate("/admin/userCreate");
  }

  useEffect(() => {
    dispatch(getUserList(filter));
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
              {userList.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={row.fldUserId}
                    key={row.fldUserId}
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
                        value={row.fldUserId}
                        onClick={(e) => handleUpdate(e.target.value)}
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        value={row.fldUserId}
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
          count={numOfUser}
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
