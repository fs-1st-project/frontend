import { createSlice } from "@reduxjs/toolkit";

export const getAllComment = (postId) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:8080/comment/read/${postId}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("모든 댓글 조회 중 서버 응답 실패");
      }

      const responseData = await response.json();

      dispatch(
        commentActions.setCommentData({
          postId: postId,
          commentData: responseData,
        })
      );
      return true;
    } catch (error) {
      console.error("모든 댓글 조회 중 에러 발생");
      return false;
    }
  };
};

export const createComment = (postId, commentContent) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:8080/comment/create/${postId}`;

      const currentUserId = localStorage.getItem("userId");

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentContent,
          createdAt: new Date(),
          userId: currentUserId,
          postId,
        }),
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("새 게시글 작성 POST 서버 응답 실패");
      }

      return true;
    } catch (error) {
      console.error("새 게시글 POST 요청 중 에러 발생:", error);
      return false;
    }
  };
};

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    isCommentPopupOpen: false,
    commentContent: {},
    isCommentOpen: {},
    commentData: {},
  },
  reducers: {
    setIsCommentPopupOpen(state, action) {
      state.isCommentPopupOpen = action.payload;
    },
    setCommentContent(state, action) {
      const { postId, commentContent } = action.payload;
      state.commentContent[postId] = commentContent;
    },
    toggleIsCommentOpen(state, action) {
      const postId = action.payload;
      state.isCommentOpen[postId] = !state.isCommentOpen[postId];
    },
    setCommentData(state, action) {
      const { postId } = action.payload;
      const { commentData } = action.payload;
      state.commentData[postId] = commentData;
    },
    setCommentContentReset(state, action) {
      const postId = action.payload;
      state.commentContent[postId] = "";
    },
  },
});

export const commentActions = commentSlice.actions;

export default commentSlice;
