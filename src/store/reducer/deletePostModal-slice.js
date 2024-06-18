import { createSlice } from "@reduxjs/toolkit";

export const deletePostToServer = (deletePostId) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:8080/post/delete/${deletePostId}`;

      const requestOptions = {
        method: "DELETE",
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("게시글 삭제 요청 서버 응답 실패");
      }

      return true;
    } catch (error) {
      console.error("게시글 삭제 요청 중 에러 발생:", error);
      return false;
    }
  };
};

const deletePostModalSlice = createSlice({
  name: "deletePostModal",
  initialState: {
    isDeletePostOpen: false,
    deletePostId: null,
  },
  reducers: {
    setIsDeletePostOpen(state, action) {
      state.isDeletePostOpen = !state.isDeletePostOpen;
    },
    setDeletePostId(state, action) {
      state.deletePostId = action.payload;
    },
    reset(state, action) {
      state.isDeletePostOpen = !state.isDeletePostOpen;
      state.deletePostId = null;
    },
  },
});

export const deletePostModalActions = deletePostModalSlice.actions;

export default deletePostModalSlice;
