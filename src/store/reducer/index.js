import { combineReducers } from "@reduxjs/toolkit";

import signupSlice from "./signup-slice";
import signinSlice from "./signin-slice";
import googleSigninSlice from "./googleSignin-slice";
import postModalSlice from "./postModal-slice";

const rootReducer = combineReducers({
  signup: signupSlice.reducer,
  signin: signinSlice.reducer,
  googleSignin: googleSigninSlice.reducer,
  postModal: postModalSlice.reducer,
});

export default rootReducer;
