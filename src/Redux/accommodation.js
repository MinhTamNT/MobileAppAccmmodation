import { createSlice } from "@reduxjs/toolkit";

export const accommodationSlice = createSlice({
  name: "accommodation",
  initialState: {
    createAccommodation: {
      userAccommdation: null,
      error: null,
      pending: false,
    },
    allAccommodation: {
      pending: false,
      accommodations: [],
      error: false,
    },
    oneAccmodation: {
      pending: false,
      accommodation: [],
      error: false,
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
    getAllAccommodationStart: (state) => {
      state.allAccommodation.pending = true;
    },
    getAllAccommodationSuccess: (state, action) => {
      state.allAccommodation.pending = false;
      state.allAccommodation.accommodations = [
        ...new Set([
          ...state.allAccommodation.accommodations,
          ...action.payload,
        ]),
      ];
      state.allAccommodation.error = false;
    },
    getAllAccommodationFail: (state) => {
      state.allAccommodation.error = true;
    },
  },
});
export const {
  createAccommodationFailed,
  createAccommodationStart,
  createAccommodationSuccess,
  getAllAccommodationFail,
  getAllAccommodationSuccess,
  getAllAccommodationStart,
} = accommodationSlice.actions;
export default accommodationSlice.reducer;
