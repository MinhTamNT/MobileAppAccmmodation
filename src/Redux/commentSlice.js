import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "commennt",
  initialState: {
    userComment: {
      comment: null,
      pending: false,
      error: false,
    },
    addComment: {
      pending: false,
      error: false,
      success: false,
    },
    deletdCommeng: {
      pending: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    addCommentstart: (state) => {
      state.addComment.pending = true;
    },
    addCommentSucess: (state) => {
      state.addComment.pending = false;
      state.addComment.error = false;
      state.addComment.success = true;
    },
    addCommentFail: (state) => {
      state.addComment.pending = false;
      state.addComment.error = true;
      state.addComment.success = false;
    },
  },
});
export const { addCommentSucess, addCommentFail, addCommentstart } =
  commentSlice.actions;
export default commentSlice.reducer;
