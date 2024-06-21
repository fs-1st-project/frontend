import React from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import "../PostModal/PostModal.css";
import "./EditPostModal.css";

import {
  editPostModalActions,
  updatePostToServer,
} from "../../store/reducer/editPostModal-slice";
import { getAllPost, postActions } from "../../store/reducer/post-slice";

const EditPostModal = () => {
  const dispatch = useDispatch();
  // 구글 유저 데이터
  const googleUserData = useSelector(
    (state) => state.googleSignin.googleUserData
  );

  // 일반 유저 데이터
  const normalUserData = useSelector((state) => state.signin.normalUserData);

  // editPostModal 상태
  const editPostModalStates = useSelector((state) => state.editPostModal);

  // X 아이콘 눌렀을 때
  const clickExitHandler = (e) => {
    e.preventDefault();

    dispatch(editPostModalActions.setIsEditPostOpen());
  };

  // 게시글 수정 content를 쓰는 textarea에 변화가 생겼을 때
  const writeEditContentHandler = (e) => {
    const editContent = e.target.value;
    dispatch(editPostModalActions.setEditPostContent(editContent));
  };

  // save 버튼 눌렀을 때
  const saveClickHandler = (e) => {
    e.preventDefault();

    dispatch(
      updatePostToServer(
        editPostModalStates.editPostId,
        editPostModalStates.editPostContent
      )
    )
      .then((success) => {
        if (success === true) {
          dispatch(editPostModalActions.reset());
          dispatch(postActions.setIsMenuOpen(false));
          dispatch(getAllPost());
        }
      })
      .catch((e) => alert("게시글 수정에 실패했습니다."));
  };

  // textarea에 쓰여진 글씨가 1글자 이상일 때와 아닐 때 구분
  const saveButton = () => {
    if (editPostModalStates.editPostContent.trim().length > 1) {
      return (
        <button className="edit-post-button-able" onClick={saveClickHandler}>
          Save
        </button>
      );
    } else {
      return <button className="edit-post-button-disable">Save</button>;
    }
  };

  const displayName = () => {
    if (normalUserData.length !== 0) {
      if (!normalUserData.fullName) {
        return normalUserData.email;
      }
      return normalUserData.fullName;
    }

    if (googleUserData.length !== 0) {
      if (!googleUserData.fullName) {
        return googleUserData.email;
      }
      return googleUserData.fullName;
    }
  };

  if (!editPostModalStates.isEditPostOpen) return null;

  return createPortal(
    <div className="overlays-edit-post">
      <div className="edit-post-modal-container">
        <div className="modal-top">
          <div className="top-picture-name-anyone">
            <div className="top-profile-picture">
              {googleUserData && googleUserData.profilePicture ? (
                <img
                  src={`data:image/jpeg;base64,${googleUserData.profilePicture}`}
                  alt="Google User Profile"
                  className="top-profile-picture-img"
                />
              ) : normalUserData && normalUserData.profilePicture ? (
                <img
                  src={`data:image/jpeg;base64,${normalUserData.profilePicture}`}
                  alt="Normal User Profile"
                  className="top-profile-picture-img"
                />
              ) : (
                <img src="/user.jpeg" alt="Default user-picture" />
              )}
            </div>
            <div className="name-anyone">
              <div className="top-name">{displayName()}</div>
              <div className="top-anyone">Post to Anyone</div>
            </div>
          </div>
          <img
            className="top-exit-icon"
            src="exit.png"
            alt="exit"
            onClick={clickExitHandler}
          />
        </div>
        <div className="modal-middle--content">
          <textarea
            className="content-text"
            placeholder="What do you want to talk about?"
            onChange={writeEditContentHandler}
          />
        </div>
        <img className="edit-smile-icon" src="smile.png" alt="smile" />
        <div className="bottom-line-container">
          <div className="bottom-line"></div>
        </div>
        <div className="modal-bottom--footer">{saveButton()}</div>
      </div>
    </div>,
    document.getElementById("overlays-modal")
  );
};

export default EditPostModal;
