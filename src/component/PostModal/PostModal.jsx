import React from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import "./PostModal.css";
import { postModalActions } from "../../store/reducer/postModal-slice";

const PostModal = () => {
  const dispatch = useDispatch();
  const isStartPostOpen = useSelector(
    (state) => state.postModal.isStartPostOpen
  );
  const googleUserData = useSelector(
    (state) => state.googleSignin.googleUserData
  );
  const normalUserData = useSelector((state) => state.signin.normalUserData);

  const clickExitHandler = (e) => {
    e.preventDefault();

    // start a post 클릭한 state를 false로 만들어줌
    dispatch(postModalActions.setIsStartPostOpen());
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
                />
              ) : (
                <img
                  src={`data:image/jpeg;base64,${normalUserData.profilePicture}`}
                />
              )}
            </div>
            <div className="name-anyone">
              <div className="top-name">
                {googleUserData
                  ? googleUserData.fullName
                  : normalUserData.fullName}
              </div>
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
          />
        </div>
        <img className="smile-icon" src="smile.png" alt="smile" />
        <div className="modal-bottom--content-icons">
          <img className="picture-icon" src="picture.png" alt="picture" />
          <img className="calendar-icon" src="calendar.png" alt="calendar" />
          <img className="plus-icon" src="plus.png" alt="plus" />
        </div>
        <div className="bottom-line-container">
          <div className="bottom-line"></div>
        </div>
        <div className="modal-bottom--footer">
          <img className="clock-icon" src="clock.png" alt="clock" />
          <button className="post-button">Post</button>
        </div>
      </div>
    </div>,
    document.getElementById("overlays-modal")
  );
};

export default PostModal;
