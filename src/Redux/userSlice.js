import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      currentUser: null,
      pending: false,
      error: false,
    },
    otherUser: {
      otherUser: null,
      loading: false,
      error: false,
    },
  },
  reducers: {
    getUserStart: (state) => {
      state.otherUser.loading = true;
    },
    getUserSuccess: (state, action) => {
      state.otherUser.loading = false;
      state.otherUser.otherUser = action.payload;
      state.otherUser.error = false;
    },
    getUserFailed: (state) => {
      state.otherUser.loading = false;
      state.otherUser.error = true;
    },
    updateStart: (state) => {
      state.user.pending = true;
    },
    updateSuccess: (state, action) => {
      state.user.pending = false;
      state.user.currentUser = action.payload;
      state.user.error = false;
    },
    updateFail: (state) => {
      state.user.pending = false;
      state.user.error = true;
    },
  },
});

export const {
  updateStart,
  updateSuccess,
  updateFail,
  getUserStart,
  getUserSuccess,
  getUserFailed,
} = userSlice.actions;
export default userSlice.reducer;
