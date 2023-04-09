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
  name: "",
  role: ""
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

    setInfo(state, action) {
      state.name = action.payload.name;
      state.role = action.payload.role;
    }
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
  setInfo,
} = menuSlice.actions;

export function getCurrentUser() {
  return async () => {
    try {
      //yield delay(1000);
      // call api login
      const response = await authApi.getCurrentUser();
      const userToken = response;
      console.log(response);
      // if (response.Code != "L001") {
      //   dispatch(authSlice.actions.loginSuccess(response));
      //   // save token in localStorage
      //   localStorage.setItem("access_token", userToken);
      //   window.location.replace("/admin/dashboard")
      // } else {
      //   dispatch(authSlice.actions.loginFailed(response));
      //   toast.error(response.Message, {
      //     position: toast.POSITION.TOP_CENTER,
      //   });
      // }
    } catch (error) {
      //dispatch(authSlice.actions.loginFailed(error));
    }
  };
}


// Reducer
export const menuReducer = menuSlice.reducer;
