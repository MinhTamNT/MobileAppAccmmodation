import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    currentUser: null,
    loading: false,
    error: null,
    registration: {
      isFetching: false,
      success: false,
      error: null,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.access_token;
      state.currentUser = action.payload.user;
      state.error = false;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    registerStart: (state) => {
      state.registration.isFetching = true;
      state.registration.error = null;
    },
    registerSuccess: (state) => {
      state.registration.isFetching = false;
      state.registration.success = true;
    },
    registerFail: (state, action) => {
      state.registration.isFetching = false;
      state.registration.error = action.payload;
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
} = authSlice.actions;
export default authSlice.reducer;
