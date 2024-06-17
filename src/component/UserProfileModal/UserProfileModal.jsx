import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { googleSigninActions } from "../../store/reducer/googleSignin-slice";

import "./UserProfileModal.css"; // 모달 창 스타일링을 위한 CSS
import { profileModalActions } from "../../store/reducer/profileModal-slice";

const UserProfileModal = () => {
  const dispatch = useDispatch();
  const imgFileInputRef = useRef(null);
  const backgroundImgFileInputRef = useRef(null);

  //모달 상태
  const isProfileModalOpen = useSelector(
    (state) => state.profileModal.isProfileModalOpen
  );

  //-------------------<<<<<<<<<이전 값 가져오기:구글슬라이스에서>>>>>>>--------------------------
  //이름
  const profileFullName = useSelector(
    (state) => state.googleSignin.googleUserData.fullName
  );

  //소개
  const profileIntroduce = useSelector(
    (state) => state.googleSignin.googleUserData.introduction
  );

  //교육
  const profileEducation = useSelector(
    (state) => state.googleSignin.googleUserData.education
  );

  //지역
  const profileLocation = useSelector(
    (state) => state.googleSignin.googleUserData.location
  );

  //현재 프로필 사진 (배경 사진은 안가져오는 걸로)
  const profileImg = useSelector(
    (state) => state.googleSignin.googleUserData.profilePicture
  );

  //-------------------<<<<<<<<<변경 하는 핸들링 함수 모음>>>>>>>--------------------------
  //프로필 핸들링 함수
  const handleProfileImgChange = () => {
    imgFileInputRef.current.click();
  };

  //배경 핸들링 함수
  const handleProfileBackgroundImgChange = () => {
    backgroundImgFileInputRef.current.click();
  };

  const handleImgFileChange = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result;
        dispatch(googleSigninActions.setProfileImg(base64Url));
      };
      reader.readAsDataURL(imgFile);
    }
  };

  const handleBackgroundImgFileChange = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result;
        dispatch(googleSigninActions.setProfileBackgroundImg(base64Url));
      };
      reader.readAsDataURL(imgFile);
    }
  };

  //새로운 이름으로 변경하기
  const handleFullNameChange = (e) => {
    const newName = e.target.value;
    dispatch(profileModalActions.setProfileFullName(newName));
  };
  //소개 변경
  const handleIntroduceChange = (e) => {
    const newIntroduce = e.target.value;
    dispatch(profileModalActions.ssetProfileIntroduce(newIntroduce));
  };
  //교육 변경
  const handleEducationChange = (e) => {
    const newEducation = e.target.value;
    dispatch(profileModalActions.setProfileEducation(newEducation));
  };
  //지역 변경
  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    dispatch(profileModalActions.setProfileLocation(newLocation));
  };

  //닫는 모달
  const closeModal = (e) => {
    e.preventDefault();
    dispatch(profileModalActions.setIsProfileModalOpen());
  };

  if (!isProfileModalOpen) {
    return null;
  }

  console.log(isProfileModalOpen, "모달 오픈 상태");

  //-------------------------------------<<<<리턴 부분>>>>>>------------------------------
  return createPortal(
    <div className="user-profile-modal">
      <div className="modal-content">
        <h2>Edit intro</h2>

        <button onClick={handleProfileBackgroundImgChange} className="btn-img">
          배경 사진 변경
        </button>
        <input
          type="file"
          accept="image/*"
          ref={backgroundImgFileInputRef}
          style={{ display: "none" }}
          onChange={handleBackgroundImgFileChange}
        />

        <button onClick={handleProfileImgChange} className="btn-img">
          프로필 사진 변경
        </button>
        <input
          type="file"
          accept="image/*"
          ref={imgFileInputRef}
          style={{ display: "none" }}
          onChange={handleImgFileChange}
        />

        {/*풀네임--0*/}
        <div className="input-container">
          <label for="name">Name</label>
          <input
            type="text"
            value={profileFullName}
            onChange={handleFullNameChange}
            name="name"
          />
        </div>

        {/*소개*/}
        <div className="input-container">
          <label for="intro">Headline</label>
          <input
            type="text"
            value={profileIntroduce}
            onChange={handleIntroduceChange}
            name="intro"
          />
        </div>

        {/*교육*/}
        <div className="input-container">
          <label for="edu">Education</label>
          <input
            type="text"
            value={profileEducation}
            onChange={handleEducationChange}
            name="edu"
          />
        </div>

        {/*지역*/}
        <div className="input-container">
          <label for="location">Location</label>
          <input
            type="text"
            value={profileLocation}
            onChange={handleLocationChange}
            name="location"
          />
        </div>

        <button onClick={closeModal}>닫기</button>
      </div>
    </div>,
    document.getElementById("overlays-modal")
  );
};

export default UserProfileModal;
