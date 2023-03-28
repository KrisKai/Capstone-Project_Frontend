import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    currentUser: null
};

const authSlice = createSlice({
  name: 'auth',
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
export const authActions = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsInitialized = (state) => state.auth.isInitialized;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;