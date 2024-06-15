import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signup-slice";
import signinSlice from "./signin-slice";
import googleSigninSlice from "./googleSignin-slice";

const store = configureStore({
  reducer: {
    signup: signupSlice.reducer,
    signin: signinSlice.reducer,
    googleSignin: googleSigninSlice.reducer,
  },
});

export default store;
