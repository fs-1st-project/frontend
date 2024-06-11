import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signup-slice";

const store = configureStore({
  reducer: {
    signup: signupSlice.reducer,
  },
});

export default store;
