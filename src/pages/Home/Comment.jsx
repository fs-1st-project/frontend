import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  commentActions,
  createComment,
  getAllComment,
} from "../../store/reducer/comment-slice";

import edit from "../../component/svg/edit.svg";
import deleteicon from "../../component/svg/delete.svg";
import "./Post.css";

import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";
import { deleteCommentModalActions } from "../../store/reducer/deleteCommentModal-slice";
import { current } from "@reduxjs/toolkit";
import DeleteCommentModal from "../../component/DeleteCommentModal/DeleteCommentModal";

const Comment = ({ postId }) => {
  const [menuIndex, setMenuIndex] = useState(null);

  const googleUserData = useSelector(
    (state) => state.googleSignin.googleUserData
  );
  const normalUserData = useSelector((state) => state.signin.normalUserData);

  const isCommentOpen = useSelector((state) => state.comment.isCommentOpen);
  const isCommentPopupOpen = useSelector(
    (state) => state.comment.isCommentPopupOpen
  );
  const commentContent = useSelector((state) => state.comment.commentContent);
  const commentData = useSelector((state) => state.comment.commentData);

  const dispatch = useDispatch();

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    console.log(isCommentOpen[postId], "해당 포스트의 댓글창이 열렸는지 확인");
    if (isCommentOpen[postId]) {
      dispatch(deleteCommentModalActions.setDeleteCommentPostId(postId));
    }
  }, [isCommentOpen, postId, dispatch]);

  // 댓글 입력 핸들러
  const handleCommentChange = (e) => {
    const commentContent = e.target.value.trim();
    dispatch(commentActions.setCommentContent(commentContent));
  };

  //댓글 post 버튼 생기게 하기
  const showCommentPostButton = (postId) => {
    if (commentContent.length >= 1) {
      return (
        <button
          className="comments-post-button"
          onClick={() => commentPostHandler(postId, commentContent)}
        >
          Post
        </button>
      );
    }
  };

  // 댓글 추가 핸들러
  const commentPostHandler = (postId, commentContent) => {
    dispatch(createComment(postId, commentContent)).then((success) => {
      if (success === true) {
        dispatch(getAllComment(postId));
        dispatch(commentActions.setCommentContentReset(""));
      } else {
        alert("댓글 작성 실패");
      }
    });
  };

  // comment 팝업 메뉴
  const toggleMenu = (index) => {
    if (menuIndex === index) {
      dispatch(commentActions.setIsCommentPopupOpen(false));
      setMenuIndex(null);
    } else {
      dispatch(commentActions.setIsCommentPopupOpen(true));
      setMenuIndex(index);
    }
  };

  // 팝업메뉴에서 delete 눌렀을 때
  const deleteCommentHandler = (commentId) => {
    dispatch(deleteCommentModalActions.setDeleteCommentId(commentId));
    dispatch(deleteCommentModalActions.setIsDeleteCommentOpen());
  };

  return (
    <>
      <DeleteCommentModal />
      <div
        className={`post-bottom-buttons_comment_container ${
          isCommentOpen[postId] ? "open" : ""
        }`}
      >
        {isCommentOpen[postId] && (
          <div className="comments">
            <div className="comments-top">
              <img
                src={
                  googleUserData
                    ? googleUserData.profilePicture
                    : normalUserData.profilePicture
                }
                alt="profilePicture"
              />
              <input
                type="text"
                className="comments-top_text"
                placeholder="Add a comment…"
                value={commentContent}
                onChange={handleCommentChange}
              />
              {showCommentPostButton(postId)}
            </div>
            {commentData[postId] &&
              commentData[postId].map((comment, index) => (
                <div className="comment-container">
                  <img src={comment.profilePicture} alt="profilePicture" />
                  <div className="comment-container-top">
                    <div className="comment-container-top_intro">
                      <div className="comment-container-top_intro-info">
                        <div className="comment-container-top_intro-name">
                          {comment.fullName}
                        </div>
                        <div className="comment-container-top_intro-job">
                          {comment.introduction}
                        </div>
                      </div>
                      <div className="comment-container-top_intro-menu">
                        <div className="comment-container-top_intro-time">
                          {formatDistance(
                            new Date(comment.createdAt),
                            new Date(),
                            {
                              addSuffix: true,
                              locale: ko,
                            }
                          )}
                        </div>
                        {currentUserId == comment.userId && (
                          <button
                            className="comment-container-top-intro-btn"
                            onClick={() => toggleMenu(index)}
                          >
                            ∙∙∙
                          </button>
                        )}

                        {isCommentPopupOpen && menuIndex === index && (
                          <div className="comment-popup-menu show">
                            <div className="comment-popup-menu-item_edit">
                              <img src={edit} alt="edit" />
                              <div>Edit comment</div>
                            </div>
                            <div className="comment-popup-menu-item_delete">
                              <img src={deleteicon} alt="delete" />
                              <div
                                onClick={() => deleteCommentHandler(comment.id)}
                              >
                                Delete comment
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="comment-container-text">
                      {comment.commentContent}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
