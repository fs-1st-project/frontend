import { createSlice } from "@reduxjs/toolkit";

const googleSigninSlice = createSlice({
  name: "goolgeSignin",
  initialState: {
    isGoogleClicked: false,
    googleUserData: null,
  },
  reducers: {
    setIsGoogleClicked(state, action) {
      state.isGoogleClicked = true;
    },
    setGoogleUserData(state, action) {
      state.googleUserData = action.payload;
    },
  },
});

export const googleSigninActions = googleSigninSlice.actions;

export default googleSigninSlice;
