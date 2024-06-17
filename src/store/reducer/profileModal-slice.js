import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
import { auth } from "../../firebaseConfig";

// 서버에 프로필 정보 업데이트 요청하는 비동기 액션 생성자 함수 //구글
export const updateGoogleProfileInfoToServer = createAsyncThunk(
  "profileModal/updateGoogleProfileInfoToServer",
  async (payload, thunkAPI) => {
    const {
      fullName,
      introduction,
      profilePicture,
      profileBackgroundPicture,
      education,
      location,
    } = payload;

    try {
      const currentUser = auth.currentUser;
      const uid = currentUser.uid;
      const url = `http://localhost:8080/api/users/${uid}/profile`;

      const token = localStorage.getItem("token");

      const requestBody = {
        fullName,
        profileImage: profilePicture,
        introduction,
        education,
        location,
      };

      // 콘솔에 requestBody 출력
      console.log("Request Body:", requestBody);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(url, requestBody, { headers });

      if (!response.data) {
        throw new Error("프로필 정보 업데이트 서버 응답 실패");
      }

      return response.data; // 서버에서 반환된 데이터를 payload로 사용할 수 있음
    } catch (error) {
      console.error("프로필 정보 업데이트 요청 중 에러 발생:", error);
      throw error;
    }
  }
);

// 서버에 프로필 정보 업데이트 요청하는 비동기 액션 생성자 함수
export const updateProfileInfoToServer = createAsyncThunk(
  "profileModal/updateProfileInfoToServer",
  async (payload, thunkAPI) => {
    const {
      fullName,
      introduction,
      profilePicture,
      profileBackgroundPicture,
      education,
      location,
    } = payload;

    try {
      // 로컬 스토리지에서 이메일 가져오기
      const state = thunkAPI.getState();
      const { email } = state.signin.normalUserData; // 이곳에서 이메일 가져오기
      const url = `http://localhost:8080/home/${email}/profile`;

      const token = localStorage.getItem("token");

      const requestBody = {
        fullName,
        profileImage: profilePicture,
        introduction,
        education,
        location,
      };

      // 콘솔에 requestBody 출력
      console.log("Request Body:", requestBody);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(url, requestBody, { headers });

      if (!response.data) {
        throw new Error("프로필 정보 업데이트 서버 응답 실패");
      }

      return response.data; // 서버에서 반환된 데이터를 payload로 사용할 수 있음
    } catch (error) {
      console.error("프로필 정보 업데이트 요청 중 에러 발생:", error);
      throw error;
    }
  }
);

// 프로필 모달 슬라이스 정의
const profileModalSlice = createSlice({
  name: "profileModal",
  initialState: {
    isProfileModalOpen: false,
    profileFullName: "",
    profileIntroduce: "",
    profileImg: "",
    profileBackgroundImg: "",
    profileEducation: "",
    profileLocation: "",
    error: null,
  },
  reducers: {
    setIsProfileModalOpen(state, action) {
      state.isProfileModalOpen = !state.isProfileModalOpen;
    },
    setProfileFullName(state, action) {
      state.profileFullName = action.payload;
    },
    setProfileIntroduce(state, action) {
      state.profileIntroduce = action.payload;
    },
    setProfileImg(state, action) {
      state.profileImg = action.payload;
    },
    setProfileBackgroundImg(state, action) {
      state.profileBackgroundImg = action.payload;
    },
    setProfileEducation(state, action) {
      state.profileEducation = action.payload;
    },
    setProfileLocation(state, action) {
      state.profileLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileInfoToServer.fulfilled, (state, action) => {
        console.log("일반 사용자 프로필 정보 업데이트 성공");
        state.error = null; // 에러 초기화
      })
      .addCase(updateProfileInfoToServer.rejected, (state, action) => {
        console.error(
          "일반 사용자 프로필 정보 업데이트 실패:",
          action.error.message
        );
        state.error = action.error.message; // 에러 상태 업데이트
      })
      .addCase(updateGoogleProfileInfoToServer.fulfilled, (state, action) => {
        console.log("구글 사용자 프로필 정보 업데이트 성공");
        state.error = null; // 에러 초기화
      })
      .addCase(updateGoogleProfileInfoToServer.rejected, (state, action) => {
        console.error(
          "구글 사용자 프로필 정보 업데이트 실패:",
          action.error.message
        );
        state.error = action.error.message; // 에러 상태 업데이트
      });
  },
});

export const profileModalActions = profileModalSlice.actions;
export default profileModalSlice;
