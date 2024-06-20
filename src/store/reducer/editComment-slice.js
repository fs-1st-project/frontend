import { createSlice } from "@reduxjs/toolkit";

export const editComment = (editPostId, editCommentId, editCommentcontent) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:8080/comment/update/${editPostId}/${editCommentId}`;

      const keyOfEditComment = Object.keys(editCommentcontent)[0];
      const valuOfEditComment = editCommentcontent[keyOfEditComment];

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentContent: valuOfEditComment,
        }),
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("댓글 수정 요청 중 서버 응답 실패");
      }
      return true;
    } catch (error) {
      console.error("댓글 수정 요청 중 에러 발생:", error);
      return false;
    }
  };
};

const editCommentSlice = createSlice({
  name: "editComment",
  initialState: {
    isEditCommentOpen: {},
    editCommentPostId: null,
    editCommentId: null,
    editCommentContent: {},
  },
  reducers: {
    setIsEditCommentOpen(state, action) {
      const commentId = action.payload;
      state.isEditCommentOpen[commentId] = !state.isEditCommentOpen[commentId];
    },
    setEditCommentPostId(state, action) {
      state.editCommentPostId = action.payload;
    },
    setEditCommentId(state, action) {
      state.editCommentId = action.payload;
    },
    setEditCommentContent(state, action) {
      const { commentId, editCommentContent } = action.payload;
      state.editCommentContent[commentId] = editCommentContent;
    },
    reset(state, action) {
      const commentId = action.payload;

      state.isEditCommentOpen[[commentId]] =
        !state.isEditCommentOpen[[commentId]];

      state.editCommentPostId = null;
      state.editCommentId = null;
      state.editCommentContent[commentId] = "";
    },
  },
});

export const editCommentActions = editCommentSlice.actions;

export default editCommentSlice;
