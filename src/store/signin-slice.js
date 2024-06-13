import { createSlice } from "@reduxjs/toolkit";

export const postSigninEmailPasswordToServer = (signinData) => {
  return async (dispatch) => {
    try {
      // 데이터를 서버에 보낼 엔드포인트 URL
      const url = "http://localhost:8080/users/login";

      // 서버로 전송할 데이터와 요청 옵션 설정
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinData),
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("로그인 이메일, 패스워드 POST 서버 응답 실패");
      }

      // 로그인 성공 시, 로컬 스토리지에 토큰 저장
      const responseData = await response.json();

      console.log("토큰", responseData.token);

      localStorage.setItem("token", responseData.token);
      console.log("데이터");
      return true;
    } catch (error) {
      console.error("로그인 이메일,패스워드 post 요청 중 에러 발생:", error);
      return false;
    }
  };
};

const signinSlice = createSlice({
  name: "signin",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
  },
});

export const signinActions = signinSlice.actions;

export default signinSlice;
