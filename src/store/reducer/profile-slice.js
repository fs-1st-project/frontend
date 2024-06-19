import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebaseConfig"; // Firebase auth 객체 가져오기
import axios from "axios";
import { googleSigninActions } from "../../store/reducer/googleSignin-slice";
import { signinActions } from "../../store/reducer/signin-slice";

// 구글 유저 데이터 가져오기
export const fetchGoogleUserData = () => {
  return async (dispatch) => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const idToken = await currentUser.getIdToken(true);
        const uid = currentUser.uid;

        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        };

        const url = `http://localhost:8080/api/users/${uid}/profile`;

        const response = await axios.get(url, requestOptions);

        const responseData = response.data;
        console.log(responseData, "구글 유저 데이터 확인");

        dispatch(googleSigninActions.setGoogleUserData(responseData));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      dispatch(googleSigninActions.setGoogleLoading());
    }
  };
};

// 일반 유저 데이터 가져오기
export const fetchNormalUserData = async () => {
  return async (dispatch) => {
    try {
      // 로컬 스토리지에서 토큰 받기
      const token = localStorage.getItem("token");

      // 서버에 GET 요청을 보내기 with token
      const response = await axios.get("http://localhost:8080/home/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(profileActions.setPostData(response.data));
      // 서버에서 받은 유저 데이터 저장
      //dispatch(signinActions.setNormalUserData(response.data));
    } catch (error) {
      console.error("기본 로그인 사용자 정보를 받아오지 못했습니다");
    }
    // } finally {
    //   dispatch(signinActions.setIsLoading());
    // }
  };
};

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: [],
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

export const profileActions = profileSlice.actions;

export default profileSlice;
