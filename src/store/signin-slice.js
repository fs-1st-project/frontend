import { createSlice } from "@reduxjs/toolkit";

export const postEmailPasswordToServer = (signinData) => {
  return async (dispatch) => {
    try {
      // 데이터를 서버에 보낼 엔드포인트 URL
      const url = "http://localhost:8080/users/signin";

      // 서버로 전송할 데이터와 요청 옵션 설정
      const requestOptions = {
        method: "POST", // HTTP 요청 메서드
        headers: {
          "Content-Type": "application/json", // 요청 헤더의 컨텐츠 타입 설정
        },
        body: JSON.stringify(signinData), // 데이터를 JSON 문자열로 변환하여 요청 본문에 설정
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("이메일, 패스워드 POST 서버 응답 실패");
      }

      // POST 한 후, 서버로부터 돌아오는 답이 필요할까?
      // const responseData = await response.json();
      return true;
    } catch (error) {
      console.error("서버에 이메일,패스워드 post 요청 중 에러 발생:", error);
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
