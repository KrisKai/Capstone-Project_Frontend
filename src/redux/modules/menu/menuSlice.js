import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "api";

// initial state
const initialState = {
  openItem: ["dashboard"],
  openComponent: "buttons",
  drawerOpen: false,
  componentDrawerOpen: true,
  errorMsg: "",
  open: false,
};

// ==============================|| SLICE - MENU ||============================== //
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem;
    },

    activeComponent(state, action) {
      state.openComponent = action.payload.openComponent;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload.drawerOpen;
    },

    openComponentDrawer(state, action) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen;
    },

    openAlert(state, action) {
      state.open = action.payload.open;
      state.errorMsg = action.payload.errorMsg;
    },

    closeAlert(state, action) {
      state.open = action.payload.open;
    },

  },
});

// Actions
export const {
  activeItem,
  activeComponent,
  openDrawer,
  openComponentDrawer,
  openAlert,
  closeAlert,
} = menuSlice.actions;

// Reducer
export const menuReducer = menuSlice.reducer;
