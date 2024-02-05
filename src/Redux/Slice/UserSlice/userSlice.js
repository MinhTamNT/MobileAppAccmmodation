import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: {},
  },
  reducers: {
    addProfile: (state) => {
      state.regitser.isFetching = true;
    },
  },
});
export const { addProfile } = userSlice.actions;
export default userSlice.reducer;
