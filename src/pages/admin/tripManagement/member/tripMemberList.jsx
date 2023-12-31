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
import { tripMemberApi } from "api";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";

const columns = [
  { id: "nickName", label: "Nick Name", minWidth: 100, onclick: true },
  {
    id: "fullname",
    label: "Fullname",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "center",
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
    align: "center",
  },
  {
    id: "memberRole",
    label: "Role",
    minWidth: 130,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 130,
    align: "center",
  },
];

export default function StickyHeadTableTrip() {
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [allMembers, setAllMembers] = useState({
    listOfMember: [],
    numOfMember: 0,
  });
  const { tripId } = useParams();
  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState({
    pageIndex: 0,
    pageSize: 10,
    tripId: tripId,
    memberName: "",
  });
  const memberList = allMembers.listOfMember;
  const numOfMember = allMembers.numOfMember;

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
      memberName: event.target.value,
    });
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setFilter({
      ...filter,
      memberName: event.target.value,
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
    navigate(`/admin/tripMemberUpdate/${tripId}/${id}`);
  };

  const handleSendMail = async (id) => {
    try {
      // Remove trip API
      const data = await tripMemberApi.sendMail(id || "");
      switch (data.Code) {
        case "G001":
          return toast.error(data.Message);
        case "U001":
          return toast.error(data.Message);
        default:
          toast.success("Send mail successfully!");
      }
    } catch (error) {
      // Toast error
      console.log("Failed to fetch trip member", error);
      if (error.response.status == 401) {
        localStorage.removeItem("access_token");
        navigate("/auth/login");
      }
    }
  };

  const handleDelete = async () => {
    try {
      // Remove trip API
      const data = await tripMemberApi.delete(deleteId || "");
      switch (data.Code) {
        case "G001":
          return toast.error(data.Message);
        case "D001":
          return toast.error(data.Message);
        default:
          toast.success("Remove trip member successfully!");

          // Trigger to re-fetch student list with current filter
          const newFilter = { ...filter };
          setFilter(newFilter);
          setOpen(false);
          setDeleteId(null);
      }
    } catch (error) {
      // Toast error
      console.log("Failed to fetch trip member", error);
      if (error.response.status == 401) {
        localStorage.removeItem("access_token");
        navigate("/auth/login");
      }
    }
  };

  function gotoCreate() {
    navigate(`/admin/tripMemberCreate/${tripId}`);
  }

  function gotoList() {
    navigate(`/admin/tripDetail/${tripId}`);
  }

  function gotoView(id) {
    navigate(`/admin/tripMemberView/${id}`);
  }

  useEffect(() => {
    async function getAllMembers() {
      const response = await tripMemberApi.getAll(filter);
      setAllMembers(response);
    }
    getAllMembers();
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
                <TableCell key="confirm" align="center">
                  Confirmed
                </TableCell>
                <TableCell key="edit" align="center">
                  Edit || Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memberList.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={row.memberId}
                    key={row.memberId}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.onclick) {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            onClick={() => gotoView(row.memberId)}
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
                    <TableCell
                      key={`confirm_${row.memberId}`}
                      align="center"
                    >
                      {row.Confirmation === "Y" ? (
                        "Yes"
                      ) : (
                        <Button
                          variant="outlined"
                          value={row.memberId}
                          onClick={(e) => handleSendMail(e.target.value)}
                          color="primary"
                        >
                          Send confirm mail
                        </Button>
                      )}
                    </TableCell>
                    <TableCell key={`edit_${row.memberId}`} align="center">
                      <Button
                        variant="outlined"
                        value={row.memberId}
                        onClick={(e) => handleUpdate(e.target.value)}
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        value={row.memberId}
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
          count={numOfMember}
          rowsPerPage={filter.pageSize}
          page={filter.pageIndex}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Button variant="outlined" onClick={gotoList}>
            Return to Detail
          </Button>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <Button variant="contained" onClick={gotoCreate}>
            Create
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this member?"}
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
