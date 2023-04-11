import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// initial state
const initialState = {
  openItem: ["dashboard"],
  openComponent: "buttons",
  drawerOpen: false,
  componentDrawerOpen: true,
  currentUser: {
    name: "",
    role: "",
    userId: ""
  },
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

    setInfo(state, action) {
      state.currentUser = action.payload;
    },
  },
});

// Actions
export const {
  activeItem,
  activeComponent,
  openDrawer,
  openComponentDrawer,
  setInfo
} = menuSlice.actions;

// Reducer
export const menuReducer = menuSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.menu.currentUser;