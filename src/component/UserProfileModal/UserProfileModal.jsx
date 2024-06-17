import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  updateProfileInfoToServer,
  profileModalActions,
} from "../../store/reducer/profileModal-slice";

import "./UserProfileModal.css"; // 모달 창 스타일링을 위한 CSS

const UserProfileModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgFileInputRef = useRef(null);

  // 모달 상태와 프로필 정보 가져오기
  const {
    isProfileModalOpen,
    profileFullName,
    profileIntroduce,
    profileEducation,
    profileLocation,
    profileImg,
  } = useSelector((state) => state.profileModal);

  // 프로필 이미지 파일 선택 시
  const handleImgFileChange = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result;
        dispatch(profileModalActions.setProfileImg(base64Url));
      };
      reader.readAsDataURL(imgFile);
    }
  };

  // 풀 네임 변경 시
  const handleFullNameChange = (e) => {
    const newName = e.target.value;
    dispatch(profileModalActions.setProfileFullName(newName));
  };

  // 소개 변경 시
  const handleIntroduceChange = (e) => {
    const newIntroduce = e.target.value;
    dispatch(profileModalActions.setProfileIntroduce(newIntroduce));
  };

  // 교육 변경 시
  const handleEducationChange = (e) => {
    const newEducation = e.target.value;
    dispatch(profileModalActions.setProfileEducation(newEducation));
  };

  // 지역 변경 시
  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    dispatch(profileModalActions.setProfileLocation(newLocation));
  };

  // 모달 닫기
  const clickExitHandler = (e) => {
    e.preventDefault();
    dispatch(profileModalActions.setIsProfileModalOpen(false));
  };

  // 저장 버튼 클릭 시 프로필 정보 업데이트
  const clickSaveHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateProfileInfoToServer({
          fullName: profileFullName,
          introduction: profileIntroduce,
          profilePicture: profileImg,
          education: profileEducation,
          location: profileLocation,
        })
      );
      dispatch(profileModalActions.setIsProfileModalOpen(false));
      navigate("/home");
      console.log("프로필 업데이트 성공");
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  // Save 버튼 활성화 여부 체크
  const SaveButton = () => {
    if (profileFullName.trim().length > 0) {
      return (
        <button className="post-button-able" onClick={clickSaveHandler}>
          Save
        </button>
      );
    } else {
      return (
        <button className="post-button-disable" disabled>
          Save
        </button>
      );
    }
  };

  // 모달 열려있지 않으면 null 반환
  if (!isProfileModalOpen) {
    return null;
  }

  return createPortal(
    <div className="user-profile-modal">
      <div className="modal-content">
        <div className="modal-title-container">
          <h2>Edit Profile</h2>
          <img
            className="top-exit-icon"
            src="/exit.png"
            alt="exit"
            onClick={clickExitHandler}
          />
        </div>

        {/* 프로필 사진 변경 버튼 */}
        <button
          onClick={() => imgFileInputRef.current.click()}
          className="btn-img"
        >
          Change Profile Picture
        </button>
        <input
          type="file"
          accept="image/*"
          ref={imgFileInputRef}
          style={{ display: "none" }}
          onChange={handleImgFileChange}
        />

        {/* 풀 네임 입력 */}
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={profileFullName}
            onChange={handleFullNameChange}
            name="name"
          />
        </div>

        {/* 소개 입력 */}
        <div className="input-container">
          <label htmlFor="intro">Introduction</label>
          <input
            type="text"
            value={profileIntroduce}
            onChange={handleIntroduceChange}
            name="intro"
          />
        </div>

        {/* 교육 입력 */}
        <div className="input-container">
          <label htmlFor="edu">Education</label>
          <input
            type="text"
            value={profileEducation}
            onChange={handleEducationChange}
            name="edu"
          />
        </div>

        {/* 지역 입력 */}
        <div className="input-container">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            value={profileLocation}
            onChange={handleLocationChange}
            name="location"
          />
        </div>

        {/* Save 버튼 */}
        {SaveButton()}
      </div>
    </div>,
    document.getElementById("overlays-modal")
  );
};

export default UserProfileModal;
