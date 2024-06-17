import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../../firebaseConfig";

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
      const currentUser = auth.currentUser;
      const idToken = await currentUser.getIdToken(true);
      const uid = currentUser.uid;
      const url = `http://localhost:8080/api/users/${uid}/profile`;

      const token = localStorage.getItem("token");

      const requestBody = {
        fullName,
        profileImage: profilePicture,
      };

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
    builder.addCase(updateProfileInfoToServer.fulfilled, (state, action) => {
      console.log("프로필 정보 업데이트 성공");
      state.error = null; // 에러 초기화
    });
    builder.addCase(updateProfileInfoToServer.rejected, (state, action) => {
      console.error("프로필 정보 업데이트 실패:", action.error.message);
      state.error = action.error.message; // 에러 상태 업데이트
    });
  },
});

export const profileModalActions = profileModalSlice.actions;
export default profileModalSlice;
