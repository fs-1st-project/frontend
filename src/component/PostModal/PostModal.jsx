import React from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import "./PostModal.css";
import { postModalActions } from "../../store/reducer/postModal-slice";

const PostModal = () => {
  const isStartPostOpen = useSelector(
    (state) => state.postModal.isStartPostOpen
  );
  const dispatch = useDispatch();

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
          <div className="top-profile-picture"></div>
          <div className="top-name">Jeongmin Choi</div>
          <img
            className="top-exit-icon"
            src="exit.png"
            alt="exit"
            onClick={clickExitHandler}
          />
        </div>
        <div className="modal-middle--content">
          <input
            className="content-input"
            placeholder="What do you want to talk about?"
          />
        </div>
        <div className="modal-bottom--content-icons"></div>
        <div className="modal-bottom--footer">
          <img />
          <button>Post</button>
        </div>
      </div>
    </div>,
    document.getElementById("overlays-modal")
  );
};

export default PostModal;
