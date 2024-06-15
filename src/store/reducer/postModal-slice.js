import { createSlice } from "@reduxjs/toolkit";

const postModalSlice = createSlice({
  name: "postModal",
  initialState: {
    isStartPostOpen: false,
  },
  reducers: {
    setIsStartPostOpen(state, action) {
      state.isStartPostOpen = !state.isStartPostOpen;
    },
  },
});

export const postModalActions = postModalSlice.actions;

export default postModalSlice;
