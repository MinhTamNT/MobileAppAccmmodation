import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    regitser: { isFetching: false, error: false, success: false },
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    loginStarts: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFail: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.regitser.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.regitser.isFetching = false;
      state.regitser.success = action.payload;
      state.regitser.error = false;
    },
    registerFail: (state) => {
      state.regitser.isFetching = false;
      state.regitser.error = true;
    },
  },
});
export const {
  registerStart,
  registerSuccess,
  registerFail,
  loginStarts,
  loginFail,
  loginSuccess,
} = authSlice.actions;
export default authSlice.reducer;
