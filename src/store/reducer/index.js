import { combineReducers } from "@reduxjs/toolkit";

import signupSlice from "./signup-slice";
import signinSlice from "./signin-slice";
import googleSigninSlice from "./googleSignin-slice";
import postModalSlice from "./postModal-slice";
import profileModalSlice from "./profileModal-slice";
import postSlice from "./post-slice";

const rootReducer = combineReducers({
  signup: signupSlice.reducer,
  signin: signinSlice.reducer,
  googleSignin: googleSigninSlice.reducer,
  postModal: postModalSlice.reducer,
  profileModal: profileModalSlice.reducer,
  post: postSlice.reducer,
});

export default rootReducer;
