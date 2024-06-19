import { createSlice } from "@reduxjs/toolkit";

export const getAllComment = (postId) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:8080/comment/read/${postId}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("모든 게시물 조회 중 서버 응답 실패");
      }

      const responseData = await response.json();

      dispatch(commentActions.setCommentData(responseData));
      console.log(responseData);
      return true;
    } catch (error) {
      console.error("모든 게시물 조회 중 에러 발생");
      return false;
    }
  };
};

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    isCommentPopupOpen: false,
    commentContent: "",
    isCommentOpen: {},
    commentData: [],
  },
  reducers: {
    setIsCommentPopupOpen(state, action) {
      state.isCommentPopupOpen = !state.isCommentPopupOpen;
    },
    setCommentContent(state, action) {
      state.commentContent = action.payload;
    },
    toggleIsCommentOpen(state, action) {
      const postId = action.payload;
      state.isCommentOpen[postId] = !state.isCommentOpen[postId];
    },
    setCommentData(state, action) {
      state.commentData = action.payload;
    },
  },
});

export const commentActions = commentSlice.actions;

export default commentSlice;
