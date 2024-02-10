import { configureStore } from "@reduxjs/toolkit";
import autheslice from "./autheslice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: autheslice,
    user: userSlice,
  },
});
