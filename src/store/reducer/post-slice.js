import { createSlice } from "@reduxjs/toolkit";

export const getAllPost = () => {
  return async (dispatch) => {
    try {
      const url = "http://localhost:8080/post/read";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("모든 게시물 조회 중 서버 응답 실패");
      }

      const responseData = await response.json();

      dispatch(postActions.setPostData(responseData));
      return true;
    } catch (error) {
      console.error("모든 게시물 조회 중 에러 발생");
      return false;
    }
  };
};

const postSlice = createSlice({
  name: "post",
  initialState: {
    postData: [],
    isMenuOpen: false,
  },
  reducers: {
    setPostData(state, action) {
      state.postData = action.payload;
    },
    setIsMenuOpen(state, action) {
      state.isMenuOpen = action.payload;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice;
