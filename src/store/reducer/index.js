import { combineReducers } from "@reduxjs/toolkit";

import signupSlice from "./signup-slice";
import signinSlice from "./signin-slice";
import googleSigninSlice from "./googleSignin-slice";
import postModalSlice from "./postModal-slice";
import profileModalSlice from "./profileModal-slice";
import postSlice from "./post-slice";
import editPostModalSlice from "./editPostModal-slice";
import commentSlice from "./comment-slice";

const rootReducer = combineReducers({
  signup: signupSlice.reducer,
  signin: signinSlice.reducer,
  googleSignin: googleSigninSlice.reducer,
  post: postSlice.reducer,
  postModal: postModalSlice.reducer,
  editPostModal: editPostModalSlice.reducer,
  profileModal: profileModalSlice.reducer,
  comment: commentSlice.reducer,
});

export default rootReducer;
