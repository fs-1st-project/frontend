import { combineReducers } from "@reduxjs/toolkit";

import signupSlice from "./signup-slice";
import signinSlice from "./signin-slice";
import googleSigninSlice from "./googleSignin-slice";
import postModalSlice from "./postModal-slice";
import profileModalSlice from "./profileModal-slice";

const rootReducer = combineReducers({
  signup: signupSlice.reducer,
  signin: signinSlice.reducer,
  googleSignin: googleSigninSlice.reducer,
  postModal: postModalSlice.reducer,
  profileModal: profileModalSlice.reducer,
});

export default rootReducer;
