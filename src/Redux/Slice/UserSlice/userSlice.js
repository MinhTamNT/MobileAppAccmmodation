import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    error: false,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.error = false;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
      state.error = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentUser, clearCurrentUser, setError } = userSlice.actions;
export default userSlice.reducer;
