import React from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  deleteCommentModalActions,
} from "../../store/reducer/deleteCommentModal-slice";
import {
  commentActions,
  getAllComment,
} from "../../store/reducer/comment-slice";
import "../DeletePostModal/DeletePostModal.css";
import "./DeleteCommentModal.css";

const DeleteCommentModal = () => {
  const dispatch = useDispatch();

  const isDeleteCommentOpen = useSelector(
    (state) => state.deleteCommentModal.isDeleteCommentOpen
  );
  const commentOpenPostId = useSelector(
    (state) => state.comment.commentOpenPostId
  );
  const deleteCommentId = useSelector(
    (state) => state.deleteCommentModal.deleteCommentId
  );
  const deleteCommentPostId = useSelector(
    (state) => state.deleteCommentModal.deleteCommentPostId
  );

  // cancel 버튼 눌렀을 때
  const cancelClickHandler = (e) => {
    e.preventDefault();
    dispatch(deleteCommentModalActions.setIsDeleteCommentOpen());
    dispatch(commentActions.setIsCommentPopupOpen(false));
  };

  // delete 버튼 눌렀을 때
  const deleteClickHandler = (e) => {
    e.preventDefault();

    dispatch(deleteComment(commentOpenPostId, deleteCommentId)).then(
      (success) => {
        if (success === true) {
          dispatch(deleteCommentModalActions.reset());
          dispatch(commentActions.setIsCommentPopupOpen(false));
          console.log("댓글 삭제1");
          dispatch(getAllComment());
          console.log("댓글 삭제2");
        }
      }
    );
  };

  if (!isDeleteCommentOpen) return null;

  return createPortal(
    <div className="overlays-delete-comment">
      <div className="delete-comment-modal-container">
        <div className="delete-comment">
          Are you sure you want to delete your comment?
        </div>
        <div className="line-container">
          <div className="line"></div>
        </div>
        <div className="check-statement">
          All likes and replies on this comment will also be removed.
        </div>
        <div className="line-container">
          <div className="line"></div>
        </div>
        <div className="buttons-cancel-delete-comment">
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

export default DeleteCommentModal;
