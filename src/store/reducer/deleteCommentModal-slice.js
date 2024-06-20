import { createSlice } from "@reduxjs/toolkit";

export const deleteComment = (postId, deleteCommentId) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:8080/comment/delete/${postId}/${deleteCommentId}`;

      const requestOptions = {
        method: "DELETE",
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("댓글 삭제 요청 서버 응답 실패");
      }
      console.log(response, "댓글 삭제 요청 서버 응답");

      return true;
    } catch (error) {
      console.error("댓글 삭제 요청 중 에러 발생:", error);
      return false;
    }
  };
};

const deleteCommentModalSlice = createSlice({
  name: "deleteCommentModal",
  initialState: {
    isDeleteCommentOpen: false,
    deleteCommentPostId: null,
    deleteCommentId: null,
  },
  reducers: {
    setIsDeleteCommentOpen(state, action) {
      state.isDeleteCommentOpen = !state.isDeleteCommentOpen;
    },
    setDeleteCommentPostId(state, action) {
      state.deleteCommentPostId = action.payload;
    },
    setDeleteCommentId(state, action) {
      state.deleteCommentId = action.payload;
    },

    reset(state, action) {
      state.isDeleteCommentOpen = !state.isDeleteCommentOpen;
      state.deleteCommentId = null;
    },
  },
});

export const deleteCommentModalActions = deleteCommentModalSlice.actions;

export default deleteCommentModalSlice;
