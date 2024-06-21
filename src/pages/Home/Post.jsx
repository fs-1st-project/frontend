import React, { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale/ko";
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, postActions } from "../../store/reducer/post-slice";

import like from "../../component/svg/like.svg";
import commenticon from "../../component/svg/comment.svg";
import repost from "../../component/svg/repost.svg";
import send from "../../component/svg/send.svg";
import edit from "../../component/svg/edit.svg";
import deleteicon from "../../component/svg/delete.svg";
import EditPostModal from "../../component/EditPostModal/EditPostModal";
import { editPostModalActions } from "../../store/reducer/editPostModal-slice";

import { deletePostModalActions } from "../../store/reducer/deletePostModal-slice";
import DeletePostModal from "../../component/DeletePostModal/DeletePostModal";

import {
  commentActions,
  getAllComment,
} from "../../store/reducer/comment-slice";
import Comment from "./Comment";

const Post = () => {
  const dispatch = useDispatch();

  const [menuIndex, setMenuIndex] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null); // 로그인한 사용자의 userId

  const isCommentOpen = useSelector((state) => state.comment.isCommentOpen);

  // post Slice 전역 상태들
  const postData = useSelector((state) => state.post.postData);
  const isMenuOpen = useSelector((state) => state.post.isMenuOpen);

  const normalUserData = useSelector((state) => state.signin.normalUserData);
  const googleUserData = useSelector(
    (state) => state.googleSignin.googleUserData
  );

  // 홈 가운데 전체 게시글 띄우기 요청
  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setLoggedInUserId(userId);
  }, []);

  // 클릭한 게시글의 comment 열기
  const handleToggle = (postId) => {
    dispatch(getAllComment(postId));
    dispatch(commentActions.toggleIsCommentOpen(postId));
  };

  // post 팝업 메뉴
  const toggleMenu = (index) => {
    if (menuIndex === index) {
      dispatch(postActions.setIsMenuOpen(false));
      setMenuIndex(null);
    } else {
      dispatch(postActions.setIsMenuOpen(true));
      setMenuIndex(index);
    }
  };

  // edit post 눌렀을 때
  const editPostClickHandler = (postId) => {
    dispatch(editPostModalActions.setEditPostId(postId));
    dispatch(editPostModalActions.setIsEditPostOpen());
  };

  // delete post 눌렀을 때
  const deletePostClickHandler = (postId) => {
    dispatch(deletePostModalActions.setDeletePostId(postId));
    dispatch(deletePostModalActions.setIsDeletePostOpen());
  };

  // 작성 시간 제대로 뜨게 하기
  const formattedDistance = (post) => {
    const postTime = formatDistance(new Date(post.createdAt), new Date(), {
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

  const dispalyEmail = () => {
    if (normalUserData.length !== 0) {
      return normalUserData.email;
    } else if (googleUserData.length !== 0) {
      return googleUserData.email;
    }
  };

  return (
    <>
      <EditPostModal />
      <DeletePostModal />
      {postData.map((post, index) => (
        <div className="post-container" key={post.id}>
          <div className="post-top">
            <div className="post-owner">
              {/* post owner 정보 */}
              <div className="post-owner-picture">
                {post.profilePicture ? (
                  <img
                    src={`data:image/jpeg;base64,${post.profilePicture}`}
                    alt="ProfilePicture"
                    className="post-owner-picture-img"
                  />
                ) : (
                  <img
                    src="/user.jpeg"
                    alt="Default user-picture"
                    className="post-owner-picture-img"
                  />
                )}
              </div>
              <div className="post-owner-info">
                <div className="info-name-container">
                  <div className="post-owner-info_name">
                    {post.fullName ? post.fullName : dispalyEmail()}
                  </div>
                  {loggedInUserId == post.userId && (
                    <div className="you">- You</div>
                  )}
                </div>
                <div className="post-owner-info_intro">{post.introduction}</div>
                <div className="post-owner-info_time">
                  {formattedDistance(post)}
                </div>
              </div>
            </div>
            <div className="post-top-icons">
              {loggedInUserId == post.userId && (
                <button
                  className="follow-icon-menu"
                  onClick={() => toggleMenu(index)}
                >
                  ∙∙∙
                </button>
              )}
              {isMenuOpen && menuIndex === index && (
                <div className="popup-menu show">
                  <div
                    className="popup-menu-item_edit"
                    onClick={() => editPostClickHandler(post.id)}
                  >
                    <img src={edit} alt="edit" />
                    <div>Edit post</div>
                  </div>
                  <div className="popup-menu-item_delete">
                    <img src={deleteicon} alt="delete" />
                    <div onClick={() => deletePostClickHandler(post.id)}>
                      Delete post
                    </div>
                  </div>
                </div>
              )}
              {loggedInUserId != post.userId && ( // 작성자와 로그인한 사용자의 userId 비교
                <button className="follow-icon">+ Follow</button>
              )}
            </div>
          </div>
          <div className="post-contents">{post.content}</div>
          <div className="post-bottom-buttons">
            <div className="button-container">
              <button type="button" className="post-bottom-buttons_like">
                <img src={like} alt="like" />
                Like
              </button>
            </div>
            <div className="button-container">
              <button
                type="button"
                className={`post-bottom-buttons_comment ${
                  isCommentOpen[post.id] ? "open" : ""
                }`}
                onClick={() => handleToggle(post.id)}
              >
                <img src={commenticon} alt="comment" />
                Comment
              </button>
            </div>
            <div className="button-container">
              <button type="button" className="post-bottom-buttons_repost">
                <img src={repost} alt="repost" />
                repost
              </button>
            </div>
            <div className="button-container">
              <button type="button" className="post-bottom-buttons-send">
                <img src={send} alt="send" />
                send
              </button>
            </div>
          </div>
          <Comment postId={post.id} postUserId={post.userId} />
        </div>
      ))}
    </>
  );
};
export default Post;
