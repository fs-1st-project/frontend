import { createSlice } from "@reduxjs/toolkit";

const postModalSlice = createSlice({
  name: "postModal",
  initialState: {
    isStartPostOpen: false,
    postContent: "",
  },
  reducers: {
    setIsStartPostOpen(state, action) {
      state.isStartPostOpen = !state.isStartPostOpen;
    },
    setPostContent(state, action) {
      state.postContent = action.payload;
    },
  },
});

export const postModalActions = postModalSlice.actions;

export default postModalSlice;
