import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      error: false,
      isLoading: false,
      success: false,
      message: null,
    },
    registration: {
      isLoading: false,
      success: false,
      error: null,
    },
    logout: {
      error: false,
      isLoading: false,
      success: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isLoading = true;
      state.login.error = false;
    },
    loginSuccess: (state, action) => {
      state.login.isLoading = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFail: (state) => {
      state.login.isLoading = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.registration.isLoading = true;
      state.registration.error = null;
    },
    registerSuccess: (state) => {
      state.registration.isLoading = false;
      state.registration.success = true;
    },
    registerFail: (state, action) => {
      state.registration.isLoading = false;
      state.registration.error = action.payload;
    },
    logoutStart: (state) => {
      state.logout.isLoading = true;
    },
    logoutSuccess: (state) => {
      state.logout.isLoading = false;
      state.logout.success = true;
    },
    logoutFailed: (state) => {
      state.logout.isLoading = false;
      state.logout.error = true;
      state.logout.success = false;
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
