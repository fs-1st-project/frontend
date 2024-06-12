import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signup-slice";
import signinSlice from "./signin-slice";

const store = configureStore({
  reducer: {
    signup: signupSlice.reducer,
    signin: signinSlice.reducer,
  },
});

export default store;
