import { createSlice } from "@reduxjs/toolkit";

export const createPostToServer = (postContent, imgContent) => {
  return async (dispatch) => {
    try {
      const url = "http://localhost:8080/post/create";

      const token = localStorage.getItem("token");

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: postContent,
          image: imgContent ? imgContent : "",
          created_at: new Date(),
        }),
      };

      console.log(imgContent, "이미지 컨텐츠까지 게시글 생성");
      console.log(postContent, "게시글 내용");
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

const postModalSlice = createSlice({
  name: "postModal",
  initialState: {
    isStartPostOpen: false,
    postContent: "",
    imgContent: "",
  },
  reducers: {
    setIsStartPostOpen(state, action) {
      state.isStartPostOpen = !state.isStartPostOpen;
    },
    setPostContent(state, action) {
      state.postContent = action.payload;
    },
    setImgContent(state, action) {
      state.imgContent = action.payload;
    },
    reset(state, action) {
      state.isStartPostOpen = false;
      state.postContent = "";
      state.imgContent = "";
    },
  },
});

export const postModalActions = postModalSlice.actions;

export default postModalSlice;
