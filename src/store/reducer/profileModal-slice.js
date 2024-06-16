import { createSlice } from "@reduxjs/toolkit";

// 서버에 프로필 정보 업데이트 요청하는 함수

export const updateProfileInfoToServer = async (newName, base64Url) => {
  try {
    const url = "http://localhost:8080/profile/update";
    const token = localStorage.getItem("token");
    const requestBody = {
      fullName: newName,
      profileImage: base64Url,
    };
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("프로필 정보 업데이트 서버 응답 실패");
    }

    return true;
  } catch (error) {
    console.error("프로필 정보 업데이트 요청 중 에러 발생:", error);

    throw error;
  }
};

const profileModalSlice = createSlice({
  name: "profileModal",
  initialState: {
    isProfileModalOpen: false,
    profileFullName: "",
    profileImg: "",
    error: null,
  },

  reducers: {
    setIsProfileModalOpen(state, action) {
      // state.isProfileModalOpen = true;
    },
    setProfileFullName(state, action) {
      state.profileFullName = action.payload;
    },
    setProfileImg(state, action) {
      state.profileImg = action.payload;
    },
    updateProfileInfo: async (state, action) => {
      const { fullName, profileImage } = action.payload;

      try {
        // 서버에 프로필 정보 업데이트 요청
        const success = await updateProfileInfoToServer(fullName, profileImage);
        if (success) {
          console.log("프로필 정보 업데이트 성공");
          state.error = null; // 에러 초기화
        } else {
          console.error("프로필 정보 업데이트 실패");
        }
      } catch (error) {
        console.error("프로필 정보 업데이트 요청 중 에러 발생:", error);
        state.error = error.message; // 에러 상태 업데이트
      }
    },
  },
});

export const profileModalActions = profileModalSlice.actions;
export default profileModalSlice;
