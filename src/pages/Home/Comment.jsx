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
import "./Comment.css";

import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale/ko";
import { deleteCommentModalActions } from "../../store/reducer/deleteCommentModal-slice";
import DeleteCommentModal from "../../component/DeleteCommentModal/DeleteCommentModal";
import {
  editComment,
  editCommentActions,
} from "../../store/reducer/editComment-slice";

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

  const isEditCommentOpen = useSelector(
    (state) => state.editComment.isEditCommentOpen
  );

  const editCommentPostId = useSelector(
    (state) => state.editComment.editCommentPostId
  );
  const editCommentContent = useSelector(
    (state) => state.editComment.editCommentContent
  );

  const dispatch = useDispatch();

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (isCommentOpen[postId]) {
      dispatch(deleteCommentModalActions.setDeleteCommentPostId(postId));
      dispatch(editCommentActions.setEditCommentPostId(postId));
    }
  }, [isCommentOpen, postId, dispatch]);

  // 댓글 입력 핸들러
  const handleCommentChange = (e) => {
    const commentContent = e.target.value;
    dispatch(commentActions.setCommentContent({ postId, commentContent }));
  };

  //댓글 post 버튼 생기게 하기
  const showCommentPostButton = (postId) => {
    if (commentContent[postId]) {
      return (
        <button
          className="comments-post-button"
          onClick={() => commentPostHandler(postId, commentContent[postId])}
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
        dispatch(commentActions.setCommentContentReset(postId));
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

  // 팝업메뉴에서 edit 눌렀을 때
  const editCommentClickHandler = (commentId) => {
    dispatch(commentActions.setIsCommentPopupOpen(false));
    dispatch(editCommentActions.setEditCommentId(commentId));
    dispatch(editCommentActions.setIsEditCommentOpen(commentId));
  };

  // 댓글 수정창이 변경되었을 때
  const editCommentChangeHandler = (e, commentId) => {
    const editCommentContent = e.target.value;
    dispatch(
      editCommentActions.setEditCommentContent({
        commentId,
        editCommentContent,
      })
    );
  };

  // edit cancel 버튼 눌렀을 때
  const editCancelHandler = (e, commentId) => {
    e.preventDefault();
    dispatch(editCommentActions.setIsEditCommentOpen(commentId));
  };

  // edit save 버튼 눌렀을 때
  const editSaveHandler = async (e, commentId) => {
    e.preventDefault();

    dispatch(
      editComment(editCommentPostId, commentId, editCommentContent)
    ).then((success) => {
      if (success === true) {
        dispatch(editCommentActions.reset(commentId));
        dispatch(getAllComment(postId));
      }
    });
  };

  // 작성 시간 제대로 뜨게 하기
  const formattedDistance = (comment) => {
    const postTime = formatDistance(new Date(comment.createdAt), new Date(), {
      addSuffix: true,
      locale: ko,
    });

    if (postTime === "1분 미만 전") {
      return "방금 전";
    }

    if (postTime === "1분 미만 후") {
      return "방금 전";
    }

    return postTime;
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
              <div className="comments-top-user-img-container">
                <img
                  src={`
                  data:image/jpeg;base64,${
                    googleUserData
                      ? googleUserData.profilePicture
                      : normalUserData.profilePicture
                  }
                `}
                  alt="profilePicture"
                  className="comments-top-user-img"
                />
              </div>
              <input
                type="text"
                className="comments-top_text"
                placeholder="Add a comment…"
                value={commentContent[postId]}
                onChange={handleCommentChange}
              />
              {showCommentPostButton(postId)}
            </div>
            {commentData[postId] &&
              commentData[postId].map((comment, index) => (
                <div className="comment-container">
                  <div className="comment-container-profile">
                    <img
                      src={`data:image/jpeg;base64,${comment.profilePicture}`}
                      alt="profilePicture"
                      className="comment-container-profile-img"
                    />
                  </div>

                  <div className="comment-container-top">
                    <div className="comment-container-top_intro">
                      <div className="comment-container-top_intro-info">
                        <div className="comment-container-top_intro-name">
                          <div className="comment-owner-info_name">
                            {comment.fullName}
                          </div>
                          {currentUserId == comment.userId && (
                            <>
                              <div>-</div>
                              <div className="you-comment">You</div>
                            </>
                          )}
                        </div>
                        <div className="comment-container-top_intro-job">
                          {comment.introduction}
                        </div>
                      </div>
                      <div className="comment-container-top_intro-menu">
                        <div className="comment-container-top_intro-time">
                          {formattedDistance(comment)}
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
                              <div
                                onClick={() => {
                                  editCommentClickHandler(comment.id);
                                }}
                              >
                                Edit comment
                              </div>
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
                    {isEditCommentOpen[comment.id] ? (
                      <div className="comment-edit-container">
                        <textarea
                          onChange={(e) => {
                            editCommentChangeHandler(e, comment.id);
                          }}
                          className="edit-textarea"
                        >
                          {comment.commentContent}
                        </textarea>
                        <div className="edit-buttons">
                          <button
                            className="save-button"
                            onClick={(e) => editSaveHandler(e, comment.id)}
                          >
                            Save Changes
                          </button>
                          <button
                            className="cancel-button"
                            onClick={(e) => editCancelHandler(e, comment.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="comment-container-text">
                        {comment.commentContent}
                      </div>
                    )}
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
