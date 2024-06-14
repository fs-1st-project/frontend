import { createSlice } from "@reduxjs/toolkit";

export const postRegisterEmailPasswordToServer = (registrationData) => {
  return async (dispatch) => {
    try {
      // 데이터를 서버에 보낼 엔드포인트 URL
      const url = "http://localhost:8080/register";

      // 서버로 전송할 데이터와 요청 옵션 설정
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("회원 가입 이메일, 패스워드 POST 서버 응답 실패");
      }

      return true;
    } catch (error) {
      console.error("회원 가입 이메일,패스워드 post 요청 중 에러 발생:", error);
      return false;
    }
  };
};

const signupSlice = createSlice({
  name: "signup",
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

export const signupActions = signupSlice.actions;

export default signupSlice;
