import { createSlice } from "@reduxjs/toolkit";

export const accommodationSlice = createSlice({
  name: "accommodation",
  initialState: {
    createAccommodation: {
      userAccommdation: null,
      error: null,
      pending: false,
    },
  },
  reducers: {
    createAccommodationStart: (state) => {
      state.createAccommodation.pending = true;
    },
    createAccommodationSuccess: (state, action) => {
      state.createAccommodation.pending = false;
      state.createAccommodation.userAccommdation = action.payload;
      state.createAccommodation.error = false;
    },
    createAccommodationFailed: (state) => {
      state.createAccommodation.pending = false;
      state.createAccommodation.error = false;
    },
  },
});
export const {
  createAccommodationFailed,
  createAccommodationStart,
  createAccommodationSuccess,
} = accommodationSlice.actions;
export default accommodationSlice.reducer;
