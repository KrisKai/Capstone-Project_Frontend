import { Box, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useState } from 'react';
// import { capitalizeString, getMarkColor } from 'utils';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  },
}));

export default function TripTable({
  tripList,
  onEdit,
  onRemove,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (trip) => {
    setSelectedTrip(trip);
    setOpen(true);
  };

  const handleRemoveConfirm = (trip) => {
    onRemove?.(trip);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tripList.length > 0 && tripList?.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell width={310}>{trip.id}</TableCell>
                <TableCell>{trip.name}</TableCell>
                <TableCell>{trip.gender}</TableCell>
                <TableCell>
                  <Box color={trip.mark} fontWeight="bold">
                    {trip.mark}
                  </Box>
                </TableCell>
                <TableCell>{trip.city}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    className={classes.edit}
                    color="primary"
                    onClick={() => onEdit?.(trip)}
                  >
                    Edit
                  </Button>

                  <Button size="small" color="secondary" onClick={() => handleRemoveClick(trip)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a trip?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove trip named "{selectedTrip?.name}". <br />
            This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={() => handleRemoveConfirm(selectedTrip)}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}