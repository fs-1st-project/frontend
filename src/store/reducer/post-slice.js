import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postData: null,
  },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice;
