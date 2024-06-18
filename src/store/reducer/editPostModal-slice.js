import { createSlice } from "@reduxjs/toolkit";

export const updatePostToServer = (editPostId, editPostContent) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:8080/post/update/${editPostId}`;

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editPostContent,
        }),
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("게시글 수정 POST 서버 응답 실패");
      }

      return true;
    } catch (error) {
      console.error("게시글 수정 POST 요청 중 에러 발생:", error);
      return false;
    }
  };
};

const editPostModalSlice = createSlice({
  name: "editPostModal",
  initialState: {
    isEditPostOpen: false,
    editPostId: null,
    editPostContent: "",
  },
  reducers: {
    setIsEditPostOpen(state, action) {
      state.isEditPostOpen = !state.isEditPostOpen;
    },
    setEditPostId(state, action) {
      state.editPostId = action.payload;
    },
    setEditPostContent(state, action) {
      state.editPostContent = action.payload;
    },
    reset(state, action) {
      state.isEditPostOpen = false;
      state.editPostId = null;
      state.editPostContent = "";
    },
  },
});

export const editPostModalActions = editPostModalSlice.actions;

export default editPostModalSlice;
