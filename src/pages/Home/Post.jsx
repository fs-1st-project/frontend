import React, { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, postActions } from "../../store/reducer/post-slice";

import like from "../../component/svg/like.svg";
import comment from "../../component/svg/comment.svg";
import repost from "../../component/svg/repost.svg";
import send from "../../component/svg/send.svg";
import edit from "../../component/svg/edit.svg";
import deleteicon from "../../component/svg/delete.svg";
import EditPostModal from "../../component/EditPostModal/EditPostModal";
import { editPostModalActions } from "../../store/reducer/editPostModal-slice";
import { deletePostModalActions } from "../../store/reducer/deletePostModal-slice";
import DeletePostModal from "../../component/DeletePostModal/DeletePostModal";

const Post = () => {
  const dispatch = useDispatch();

  const [menuIndex, setMenuIndex] = useState(null);

  // post Slice 전역 상태들
  const postData = useSelector((state) => state.post.postData);
  const isMenuOpen = useSelector((state) => state.post.isMenuOpen);

  // 각 포스트의 댓글 상태를 관리하기 위한 state
  const [openComments, setOpenComments] = useState({});

  // 홈 가운데 전체 게시글 띄우기 요청
  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  const handleToggle = (postId) => {
    setOpenComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  // 팝업 메뉴
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

  const deletePostClickHandler = (postId) => {
    dispatch(deletePostModalActions.setDeletePostId(postId));
    dispatch(deletePostModalActions.setIsDeletePostOpen());
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
                <img src={post.profilePicture} alt="ProfilePicture" />
              </div>
              <div className="post-owner-info">
                <div className="post-owner-info_name">{post.fullName}</div>
                <div className="post-owner-info_intro">{post.introduction}</div>
                <div className="post-owner-info_time">
                  {formatDistance(new Date(post.createdAt), new Date(), {
                    addSuffix: true,
                    locale: ko,
                  })}
                </div>
              </div>
            </div>
            <div className="post-top-icons">
              <button
                className="follow-icon-menu"
                onClick={() => toggleMenu(index)}
              >
                ∙∙∙
              </button>
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
              <button className="follow-icon">+ Follow</button>
            </div>
          </div>
          <div className="post-contents">{post.content}</div>
          <div className="post-comments-count">{/* */}</div>
          <div className="post-bottom-buttons">
            <button type="button" className="post-bottom-buttons_like">
              <img src={like} alt="like" />
              Like
            </button>
            <button
              type="button"
              className={`post-bottom-buttons_comment ${
                openComments[post.userId] ? "open" : ""
              }`}
              onClick={() => handleToggle(post.userId)}
            >
              <img src={comment} alt="comment" />
              Comment
            </button>
            <button type="button" className="post-bottom-buttons_repost">
              <img src={repost} alt="repost" />
              repost
            </button>
            <button type="button" className="post-bottom-buttons-send">
              <img src={send} alt="send" />
              send
            </button>
          </div>
          <div
            className={`post-bottom-buttons_comment_container ${
              openComments[post.userId] ? "open" : ""
            }`}
          >
            {openComments[post.userId] && (
              <div className="comments">
                <div className="comments-top">
                  <img
                    src={post.profilePicture}
                    alt="profilePicture"
                    className="comments-top_userPicture"
                  />
                  <input
                    type="text"
                    className="comments-top_text"
                    placeholder="Add a comment…"
                  ></input>
                </div>
                {/* 예시 댓글들 */}
                <div className="comment">Comment 1</div>
                <div className="comment">Comment 2</div>
                <div className="comment">Comment 3</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Post;
