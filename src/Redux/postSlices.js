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
    editPostStart: (state) => {
      state.pending = true;
      state.error = false;
    },
    editPostSuccess: (state) => {
      state.pending = false;
      state.error = false;
    },
    editPostFailed: (state) => {
      state.pending = false;
      state.error = true;
    },
    getUserPostStart: (state) => {
      state.pending = true;
    },
    getUserPostSuccess: (state, action) => {
      state.pending = false;
      state.userPost = action.payload;
      state.error = false;
    },
    getUserPostFail: (state) => {
      state.error = true;
    },
  },
});

export const {
  createPostFailed,
  createPostStart,
  createPostSuccess,
  editPostFailed,
  editPostStart,
  editPostSuccess,
  getUserPostStart,
  getUserPostSuccess,
  getUserPostFail,
} = postSlice.actions;
export default postSlice.reducer;
