import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  error: false,
  isFetching: false,
  success: false,
  message: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFail: (state) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },
    registerStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.isFetching = false;
      state.success = true;
    },
    registerFail: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logoutStart: (state) => {
      state.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.success = true;
    },
    logoutFailed: (state) => {
      state.isFetching = false;
      state.error = true;
      state.success = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  registerStart,
  registerSuccess,
  registerFail,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;
export default authSlice.reducer;
