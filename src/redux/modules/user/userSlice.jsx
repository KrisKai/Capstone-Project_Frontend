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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state) {
      state.isInitialized = true;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.isInitialized = false;
      state.currentUser = action.payload;
    },
    loginFailed(state) {
      state.isInitialized = false;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = undefined;
    },
  },
});

// Actions
export const userActions = userSlice.actions;

// Selectors
// export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
// export const selectIsInitialized = (state) => state.auth.isInitialized;

// Reducer
const userReducer = userSlice.reducer;
export default userReducer;