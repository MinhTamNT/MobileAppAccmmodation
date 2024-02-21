import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "commennt",
  initialState: {
    pending: false,
    error: false,
    success: false,
  },
  reducers: {
    addCommentstart: (state) => {
      state.pending = true;
    },
    addCommentSucess: (state) => {
      state.pending = false;
      state.error = false;
      state.success = true;
    },
    addCommentFail: (state) => {
      state.pending = false;
      state.error = true;
      state.success = false;
    },
    relyCommentStart: (state) => {
      state.pending = true;
    },
    relyCommentSuccess: (state) => {
      state.pending = false;
      state.error = false;
      state.success = true;
    },
    relyCommentFail: (state) => {
      state.error = true;
    },
    deleteCommentStart: (state) => {
      state.pending = true;
      state.success = false;
      state.error = false;
    },
    deleteCommentSuccess: (state) => {
      state.pending = false;
      state.success = true;
    },
    deleteCommentFailed: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});
export const {
  addCommentSucess,
  addCommentFail,
  addCommentstart,
  relyCommentFail,
  relyCommentStart,
  relyCommentSuccess,
  deleteCommentFailed,
  deleteCommentSuccess,
  deleteCommentStart,
} = commentSlice.actions;
export default commentSlice.reducer;
