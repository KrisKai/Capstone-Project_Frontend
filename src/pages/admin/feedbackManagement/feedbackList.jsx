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
import { feedbackApi } from "api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const columns = [
  { id: "tripId", label: "Trip Id", minWidth: 100, onclick: true },
  {
    id: "fullname",
    label: "Username",
    minWidth: 150,
    align: "center",
  },
  {
    id: "feedbackDescription",
    label: "Feedback",
    minWidth: 100,
    align: "center",
  },
  {
    id: "rate",
    label: "Rate",
    minWidth: 170,
    align: "center",
  },
  {
    id: "like",
    label: "Like",
    minWidth: 100,
    align: "center",
  },
  {
    id: "dislike",
    label: "Dislike",
    minWidth: 100,
    align: "center",
  },
  {
    id: "locationName",
    label: "Location Name",
    minWidth: 100,
    align: "center",
  },
];

export default function StickyHeadTableFeedback() {
  let navigate = useNavigate();
  const [filter, setFilter] = useState({
    pageIndex: 0,
    pageSize: 10,
    feedbackName: "",
  });
  const [allFeedbacks, setAllFeedbacks] = useState({
    listOfFeedback: [],
    numOfFeedback: 0,
  });
  const feedbackList = allFeedbacks.listOfFeedback;
  const numOfFeedback = allFeedbacks.numOfFeedback;

  const [search, setSearch] = useState("");

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (event) => {
    if ((event.type && event.type === "click") || !event) {
      setFilter({
        ...filter,
        feedbackName: search,
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

  const handleDelete = async (id) => {
    try {
      // Remove feedback API
      await feedbackApi.delete(id || "");
      toast.success("Remove feedback successfully!");

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      setFilter(newFilter);
    } catch (error) {
      // Toast error
      console.log("Failed to fetch feedback", error);
      if (error.response.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/auth/login");
      }
    }
  };

  function gotoView(id) {
    navigate(`/admin/feedbackView/${id}`);
  }

  useEffect(() => {
    async function getAllFeedbacks() {
      const response = await feedbackApi.getAll(filter);
      setAllFeedbacks(response);
    }
    getAllFeedbacks();
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
                <TableCell key="edit" align="center">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbackList?.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={row.FeedbackId}
                    key={row.FeedbackId}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          {column.onclick ? (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ textDecoration: "underline" }}
                              onClick={() => gotoView(row.FeedbackId)}
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
                        value={row.FeedbackId}
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
          count={numOfFeedback}
          rowsPerPage={filter.pageSize}
          page={filter.pageIndex}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
