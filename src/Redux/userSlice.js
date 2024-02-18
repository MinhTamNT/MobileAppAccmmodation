import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    pending: false,
    error: false,
    otherUser: null,
    loading: false,
  },
  reducers: {
    getUserStart: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.otherUser = action.payload;
      state.error = false;
    },
    getUserFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    updateStart: (state) => {
      state.pending = true;
    },
    updateSuccess: (state, action) => {
      state.pending = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    updateFail: (state) => {
      state.pending = false;
      state.error = true;
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
