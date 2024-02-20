import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    comment: [],
    post: [],
    pending: false,
    error: false,
    userPost: null,
  },
  reducers: {
    createPostStart: (state) => {
      state.pending = true;
      state.error = false;
    },
    createPostSuccess: (state) => {
      state.pending = false;
      state.error = false;
    },
    createPostFailed: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const { createPostFailed, createPostStart, createPostSuccess } =
  postSlice.actions;
export default postSlice.reducer;
