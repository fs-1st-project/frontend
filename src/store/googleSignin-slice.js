import { createSlice } from "@reduxjs/toolkit";

const googleSigninSlice = createSlice({
  name: "goolgeSignin",
  initialState: {
    isGoogleClicked: false,
    googleUserData: null,
    googleLoading: true,
  },
  reducers: {
    setIsGoogleClicked(state, action) {
      state.isGoogleClicked = true;
    },
    setGoogleUserData(state, action) {
      state.googleUserData = action.payload;
    },
    setGoogleLoading(state, action) {
      state.googleLoading = false;
    },
  },
});

export const googleSigninActions = googleSigninSlice.actions;

export default googleSigninSlice;
