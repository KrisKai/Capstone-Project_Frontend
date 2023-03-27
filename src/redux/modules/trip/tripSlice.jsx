import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 15,
  },
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    getTripList(state, action) {
      state.loading = true;
    },
    getTripListSuccess(state, action) {
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    getTripListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action) {
      state.filter = action.payload;
    },


    setFilterWithDebounce(state, action) {},
  },
});

// Actions
export const tripActions = tripSlice.actions;

// Selectors
export const selectTripList = (state) => state.trip.list;
export const selectTripLoading = (state) => state.trip.loading;
export const selectTripFilter = (state) => state.trip.filter;
export const selectTripPagination = (state) => state.trip.pagination;
// Reducer
const tripReducer = tripSlice.reducer;
export default tripReducer;