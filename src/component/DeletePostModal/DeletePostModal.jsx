import React from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import "./DeletePostModal.css";
import {
  deletePostModalActions,
  deletePostToServer,
} from "../../store/reducer/deletePostModal-slice";
import { getAllPost, postActions } from "../../store/reducer/post-slice";

const DeletePostModal = () => {
  const dispatch = useDispatch();
  const deletePostId = useSelector(
    (state) => state.deletePostModal.deletePostId
  );

  const isDeletePostOpen = useSelector(
    (state) => state.deletePostModal.isDeletePostOpen
  );

  const cancelClickHandler = (e) => {
    e.preventDefault();
    dispatch(deletePostModalActions.setIsDeletePostOpen());
    dispatch(postActions.setIsMenuOpen(false));
  };

  const deleteClickHandler = (e) => {
    e.preventDefault();

    dispatch(deletePostToServer(deletePostId)).then((success) => {
      if (success === true) {
        dispatch(deletePostModalActions.reset());
        dispatch(postActions.setIsMenuOpen(false));
        dispatch(getAllPost());
      }
    });
  };

  if (!isDeletePostOpen) return null;

  return createPortal(
    <div className="overlays-delete-post">
      <div className="delete-post-modal-container">
        <div className="delete">Delete post?</div>
        <div className="check-statement1">
          Are you sure you want to permanently remove
        </div>
        <div className="check-statement2">this post from LinkedIn?</div>
        <div className="line-container">
          <div className="line"></div>
        </div>
        <div className="buttons-cancel-delete">
          <button className="button-cancel" onClick={cancelClickHandler}>
            Cancel
          </button>
          <button className="button-delete" onClick={deleteClickHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("overlays-modal")
  );
};

export default DeletePostModal;
