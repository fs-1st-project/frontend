import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { googleSigninActions } from "../../store/reducer/googleSignin-slice";

import "./UserProfileModal.css"; // 모달 창 스타일링을 위한 CSS

const UserProfileModal = () => {
  const dispatch = useDispatch();

  const imgFileInputRef = useRef(null);

  const profileFullName = useSelector(
    (state) => state.googleSignin.googleUserData.fullName
  );

  const profileImg = useSelector(
    (state) => state.googleSignin.googleUserData.profilePicture
  );

  const isProfileModalOpen = useSelector(
    (state) => state.profileModal.isProfileModalOpen
  );

  const handleProfilePictureChange = () => {
    imgFileInputRef.current.click();
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

  const handleNameChange = (e) => {
    const newName = e.target.value;

    dispatch(googleSigninActions.setProfileFullName(newName));
  };

  const closeModal = () => {
    dispatch(googleSigninActions.setIsUserProfileModalOpen(false));
  };

  if (!isProfileModalOpen) {
    return null;
  }

  console.log(isProfileModalOpen, "모달 오픈 상태");

  return createPortal(
    <div className="user-profile-modal">
      <div className="modal-content">
        <h2>프로필 수정</h2>
        <button onClick={handleProfilePictureChange}>프로필 사진 변경</button>

        <input
          type="file"
          accept="image/*"
          ref={imgFileInputRef}
          style={{ display: "none" }}
          onChange={handleImgFileChange}
        />
        <img src={profileImg} alt="Profile" />

        <input
          type="text"
          value={profileFullName}
          onChange={handleNameChange}
        />
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>,
    document.getElementById("overlays-modal")
  );
};

export default UserProfileModal;
