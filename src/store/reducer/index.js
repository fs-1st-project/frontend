import { combineReducers } from "@reduxjs/toolkit";

import signupSlice from "./signup-slice";
import signinSlice from "./signin-slice";
import googleSigninSlice from "./googleSignin-slice";
import postModalSlice from "./postModal-slice";
import profileModalSlice from "./profileModal-slice";
import postSlice from "./post-slice";
import editPostModalSlice from "./editPostModal-slice";
import deletePostModalSlice from "./deletePostModal-slice";
import commentSlice from "./comment-slice";
import deleteCommentModalSlice from "./deleteCommentModal-slice";

const rootReducer = combineReducers({
  signup: signupSlice.reducer,
  signin: signinSlice.reducer,
  googleSignin: googleSigninSlice.reducer,
  post: postSlice.reducer,
  postModal: postModalSlice.reducer,
  editPostModal: editPostModalSlice.reducer,
  deletePostModal: deletePostModalSlice.reducer,
  profileModal: profileModalSlice.reducer,
  comment: commentSlice.reducer,
  deleteCommentModal: deleteCommentModalSlice.reducer,
});

export default rootReducer;
