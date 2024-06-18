import React, { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../store/reducer/post-slice";

import like from "../../component/svg/like.svg";
import comment from "../../component/svg/comment.svg";
import repost from "../../component/svg/repost.svg";
import send from "../../component/svg/send.svg";
import edit from "../../component/svg/edit.svg";
import deleteicon from "../../component/svg/delete.svg";

const Post = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [menuIndex, setMenuIndex] = useState(null);
  const [showCommentPopup, setShowCommentPopup] = useState({}); // 댓글 팝업 메뉴 상태
  const postData = useSelector((state) => state.post.postData);

  // 홈 가운데 전체 게시글 띄우기 요청
  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  // 각 포스트의 댓글 상태를 관리하기 위한 state
  const [openComments, setOpenComments] = useState({});

  const handleToggle = (postId) => {
    setOpenComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  // post 팝업 메뉴
  const toggleMenu = (index) => {
    if (menuIndex === index) {
      setShowMenu(false);
      setMenuIndex(null);
    } else {
      setShowMenu(true);
      setMenuIndex(index);
    }
  };

  // 댓글 팝업 메뉴 토글 함수
  const toggleCommentPopup = (commentId) => {
    setShowCommentPopup((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  return (
    <>
      {postData.map((post, index) => (
        <div className="post-container" key={post.userId}>
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
              {showMenu && menuIndex === index && (
                <div className="popup-menu show">
                  <div className="popup-menu-item_edit">
                    <img src={edit} alt="edit" />
                    <div>Edit post</div>
                  </div>
                  <div className="popup-menu-item_delete">
                    <img src={deleteicon} alt="delete" />
                    <div>Delete post</div>
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
                <div className="comment-container">
                  <img src={post.profilePicture} alt="profilePicture" />
                  <div className="comment-container-top">
                    <div className="comment-container-top_intro">
                      <div className="comment-container-top_intro-info">
                        <div className="comment-container-top_intro-name">
                          Kim
                        </div>
                        <div className="comment-container-top_intro-job">
                          engineer
                        </div>
                      </div>
                      <div className="comment-container-top_intro-menu">
                        <div className="comment-container-top_intro-time">
                          1h
                        </div>
                        <button
                          className="comment-container-top-intro-btn"
                          onClick={() => toggleCommentPopup(index)} // 댓글 팝업 메뉴 토글 함수 연결
                        >
                          ∙∙∙
                        </button>
                        {showCommentPopup[index] && (
                          <div className="comment-popup-menu show">
                            <div className="comment-popup-menu-item_edit">
                              <img src={edit} alt="edit" />
                              <div>Edit comment</div>
                            </div>
                            <div className="comment-popup-menu-item_delete">
                              <img src={deleteicon} alt="delete" />
                              <div>Delete comment</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="comment-container-text">test</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Post;
