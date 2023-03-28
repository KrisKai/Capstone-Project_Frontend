import React, { useEffect } from 'react';
import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { Link, useNavigate } from 'react-router-dom';
//import { tripActions, LoginPayload } from "../../redux/modules/trip/tripSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from 'react-toastify';
import {
  selectTripLoading,
  selectTripFilter,
  selectTripList,
  selectTripPagination,
  tripActions,
} from '../../redux/modules/trip/tripSlice';
import TripTable from '../../components/models/trip/TripTable';
import TripFilters from '../../components/models/trip/TripFilters';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function TripList() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pagination = useAppSelector(selectTripPagination);
  const filter = useAppSelector(selectTripFilter);
  const loading = useAppSelector(selectTripLoading);
  const tripList = useAppSelector(selectTripList);
  console.log(tripList)

  useEffect(() => {
    dispatch(tripActions.getTripList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e, page) => {
    dispatch(
      tripActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter) => {
    dispatch(tripActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter) => {
    dispatch(tripActions.setFilter(newFilter));
  };

  const handleRemoveTrip = async (trip) => {
    try {
      // Remove trip API
      //await tripApi.remove(trip?.id || '');

      toast.success('Remove trip successfully!');

      // Trigger to re-fetch trip list with current filter
      const newFilter = { ...filter };
      dispatch(tripActions.setFilter(newFilter));
    } catch (error) {
      // Toast error
      console.log('Failed to fetch trip', error);
    }
  };

  const handleEditTrip = async (trip) => {
    navigate.push(`trips/${trip.id}`);
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      {/* <Box className={classes.titleContainer}>
        <Typography variant="h4">Trips</Typography>

        <Link to={`trips/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new trip
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <TripFilters
          filter={filter}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box> */}

      <TripTable
        tripList={tripList}
        onEdit={handleEditTrip}
        onRemove={handleRemoveTrip}
      />

      {/* <Box my={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box> */}
    </Box>
  );
}