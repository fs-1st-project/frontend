import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import "./PostModal.css";
import {
  createPostToServer,
  postModalActions,
} from "../../store/reducer/postModal-slice";
import { getAllPost } from "../../store/reducer/post-slice";

const PostModal = () => {
  const dispatch = useDispatch();
  const imgFileInputRef = useRef(null);

  // 모달 상태들
  const isStartPostOpen = useSelector(
    (state) => state.postModal.isStartPostOpen
  );
  const postContent = useSelector((state) => state.postModal.postContent);
  const imgContent = useSelector((state) => state.postModal.imgContent);

  // 구글 유저 데이터
  const googleUserData = useSelector(
    (state) => state.googleSignin.googleUserData
  );

  // 일반 유저 데이터
  const normalUserData = useSelector((state) => state.signin.normalUserData);

  // X 아이콘 눌렀을 때
  const clickExitHandler = (e) => {
    e.preventDefault();

    // start a post 클릭한 state를 false로 만들어줌
    dispatch(postModalActions.setIsStartPostOpen());
  };

  // 게시글 content를 쓰는 textarea에 변화가 생겼을 때
  const writePostContentHandler = (e) => {
    const postContent = e.target.value;
    dispatch(postModalActions.setPostContent(postContent));
  };

  // 이미지 파일을 업로드 하기 위해 사진 모양의 아이콘 눌렀을 때
  const imgFileUploadClickHandler = () => {
    imgFileInputRef.current.click();
  };

  // 이미지 파일을 올렸을 때
  const handleImgFileChange = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result;
        dispatch(postModalActions.setImgContent(base64Url));
      };
      reader.readAsDataURL(imgFile);
    }
  };

  // post 버튼 눌렀을 때
  const clickPostHandler = (e) => {
    e.preventDefault();
    const currentUserId = localStorage.getItem("userId");

    dispatch(createPostToServer(postContent, imgContent, currentUserId))
      .then((success) => {
        if (success === true) {
          dispatch(postModalActions.reset());
          dispatch(getAllPost());
        }
      })
      .catch((e) => alert("게시글 작성에 실패했습니다."));
  };

  // post textarea에 쓰여진 글씨가 1글자 이상일 때와 아닐 때 구분
  const postButton = () => {
    if (postContent.trim().length > 1) {
      return (
        <button className="post-button-able" onClick={clickPostHandler}>
          Post
        </button>
      );
    } else {
      return <button className="post-button-disable">Post</button>;
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

  if (!isStartPostOpen) return null;

  return createPortal(
    <div className="overlays-post">
      <div className="post-modal-container">
        <div className="modal-top">
          <div className="top-picture-name-anyone">
            <div className="top-profile-picture">
              {googleUserData ? (
                <img
                  src={`data:image/jpeg;base64,${googleUserData.profilePicture}`}
                  alt="profilePicture"
                  className="top-profile-picture-img"
                />
              ) : normalUserData ? (
                <img
                  src={`data:image/jpeg;base64,${normalUserData.profilePicture}`}
                  alt="profilePicture"
                  className="top-profile-picture-img"
                />
              ) : (
                <img
                  src="/user.jpeg"
                  alt="Default user-picture"
                  className="top-profile-picture-img"
                />
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
            onChange={writePostContentHandler}
          />
        </div>
        <img className="smile-icon" src="smile.png" alt="smile" />
        <div className="modal-bottom--content-icons">
          <div className="upload-imgContent-container">
            <label
              htmlFor="img-file-input"
              className="picture-icon"
              onClick={imgFileUploadClickHandler}
            >
              <img src="picture.png" alt="picture" />
            </label>
            <input
              className="img-file-input"
              type="file"
              style={{ display: "none" }}
              ref={imgFileInputRef}
              onChange={handleImgFileChange}
            />
          </div>
          <img className="calendar-icon" src="calendar.png" alt="calendar" />
          <img className="plus-icon" src="plus.png" alt="plus" />
        </div>
        <div className="bottom-line-container">
          <div className="bottom-line"></div>
        </div>
        <div className="modal-bottom--footer">
          <img className="clock-icon" src="clock.png" alt="clock" />
          {postButton()}
        </div>
      </div>
    </div>,
    document.getElementById("overlays-modal")
  );
};

export default PostModal;
