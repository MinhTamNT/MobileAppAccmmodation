import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/AutheSlice/autheslice";
import userSlice from "./Slice/UserSlice/userSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
  },
});
