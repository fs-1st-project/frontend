import { createSlice } from "@reduxjs/toolkit";

const googleSigninSlice = createSlice({
  name: "googleSignin",
  initialState: {
    isGoogleClicked: false,
    googleUserData: [],
    googleLoading: true,
  },
  reducers: {
    setIsGoogleClicked(state) {
      state.isGoogleClicked = true;
    },
    setGoogleUserData(state, action) {
      state.googleUserData = action.payload;
    },
    setGoogleLoading(state, action) {
      state.googleLoading = action.payload;
    },
  },
});

export const googleSigninActions = googleSigninSlice.actions;

export default googleSigninSlice;
