import { useState, useEffect } from "react";
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
import { userApi } from "api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "redux/hooks";
import { selectCurrentUser } from "redux/modules/admin/authenticate/authSlice";

const columns = [
  { id: "fldUsername", label: "UserName", minWidth: 100, onclick: true },
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
    id: "fldEmail",
    label: "Email",
    minWidth: 170,
    align: "center",
  },
  {
    id: "fldActiveStatus",
    label: "Active Status",
    minWidth: 100,
    align: "center",
  },
];

export default function StickyHeadTableUser() {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [filter, setFilter] = useState({
    pageIndex: 0,
    pageSize: 10,
    userName: "",
  });
  const [allUsers, setAllUsers] = useState({
    listOfUser: [],
    numOfUser: 0,
  });
  const userList = allUsers.listOfUser;
  const numOfUser = allUsers.numOfUser;
  const currentUser = useAppSelector(selectCurrentUser);
  const isAdmin = Boolean(currentUser.role === "Admin");

  const [search, setSearch] = useState("");

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClickOpen = (e) => {
    setOpen(true);
    setDeleteId(e);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    if ((event.type && event.type === "click") || !event) {
      setFilter({
        ...filter,
        userName: search,
      });
    }
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
    navigate(`/admin/userUpdate/${id}`);
  };

  const handleReset = async (id) => {
    const response = await userApi.reset(id);
    if (response > 0) {
      toast.success("Change Password To Qwe1234!");
    } else {
      toast.error("Reset Password Failed!");
    }
  };

  const handleChangeStatus = async (id, status) => {
    let response = await userApi.changeStatus({
      fldUserId: id,
      fldActiveStatus: status,
    });
    switch (response.Code) {
      case "G001":
        return toast.error(response.Message);
      case "U001":
        return toast.error(response.Message);
      case "I001":
        return toast.error(response.Message);
      case "V001":
        return toast.error(response.Message);
      default: {
        if (response > 0) {
          toast.success("Change Status Successed!");
          window.location.reload(false);
        }
      }
    }
  };

  const handleDelete = async () => {
    try {
      // Remove user API
      await userApi.delete(deleteId || "");
      toast.success("Remove user successfully!");

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      setFilter(newFilter);
      setOpen(false);
    } catch (error) {
      // Toast error
      console.log("Failed to fetch user", error);
      if (error.response.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/auth/login");
      }
    }
  };

  function gotoCreate() {
    navigate("/admin/userCreate");
  }

  function gotoView(id) {
    navigate(`/admin/userView/${id}`);
  }

  useEffect(() => {
    async function getAllUsers() {
      const response = await userApi.getAll(filter);
      setAllUsers(response);
    }
    getAllUsers();
  }, [filter]);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ mt: 1, mb: 1 }} textAlign="right">
          <TextField
            id="search"
            type="search"
            label="Search"
            value={search}
            onKeyDown={handleChange}
            onChange={onSearchChange}
            sx={{ width: 400 }}
          />
          <Button variant="outlined" onClick={handleChange} sx={{ height: 42 }}>
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
                {isAdmin && (
                  <>
                    <TableCell key="status" align="center">
                      Change Status
                    </TableCell>
                    <TableCell key="reset" align="center">
                      Reset Password
                    </TableCell>
                  </>
                )}
                <TableCell key="edit" align="center">
                  Edit || Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList?.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={row.fldUserId}
                    key={row.fldUserId}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];

                      if (column.onclick) {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ textDecoration: "underline" }}
                            onClick={() => gotoView(row.fldUserId)}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    {isAdmin && (
                      <>
                        <TableCell key="status" align="center">
                          {row.fldActiveStatus !== "ACTIVE" && (
                            <Button
                              variant="outlined"
                              value={row.fldUserId}
                              onClick={(e) =>
                                handleChangeStatus(e.target.value, "ACTIVE")
                              }
                              color="primary"
                            >
                              Active
                            </Button>
                          )}
                          {row.fldActiveStatus !== "INACTIVE" && (
                            <Button
                              variant="outlined"
                              value={row.fldUserId}
                              onClick={(e) =>
                                handleChangeStatus(e.target.value, "INACTIVE")
                              }
                              color="warning"
                            >
                              Inactive
                            </Button>
                          )}
                          {row.fldActiveStatus !== "BANNED" && (
                            <Button
                              variant="outlined"
                              value={row.fldUserId}
                              onClick={(e) =>
                                handleChangeStatus(e.target.value, "BANNED")
                              }
                              color="error"
                            >
                              Banned
                            </Button>
                          )}
                        </TableCell>
                        <TableCell key="reset" align="center">
                          <Button
                            variant="outlined"
                            value={row.fldUserId}
                            onClick={(e) => handleReset(e.target.value)}
                            color="success"
                          >
                            Reset Password
                          </Button>
                        </TableCell>
                      </>
                    )}
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
          count={numOfUser}
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
