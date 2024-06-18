import React, { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import { ko } from "date-fns/locale";
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { postActions } from "../../store/reducer/post-slice";
import { getAllPost, postActions } from "../../store/reducer/post-slice";

import like from "../../component/svg/like.svg";
import comment from "../../component/svg/comment.svg";
import repost from "../../component/svg/repost.svg";
import send from "../../component/svg/send.svg";
import edit from "../../component/svg/edit.svg";
import deleteicon from "../../component/svg/delete.svg";
import UserProfile from "../UserProfile/UserProfile";
import EditPostModal from "../../component/EditPostModal/EditPostModal";
import { editPostModalActions } from "../../store/reducer/editPostModal-slice";

const Post = () => {
  const dispatch = useDispatch();

  const [menuIndex, setMenuIndex] = useState(null);
  const [showCommentPopup, setShowCommentPopup] = useState({}); // 댓글 팝업 메뉴 상태
  const [commentText, setCommentText] = useState(""); // 댓글 텍스트 상태 추가(입력 시 포스트버튼 나오게)
  const [loggedInUserId, setLoggedInUserId] = useState(null); // 로그인한 사용자의 userId

  // post Slice 전역 상태들
  const postData = useSelector((state) => state.post.postData);
  const isMenuOpen = useSelector((state) => state.post.isMenuOpen);

  // 각 포스트의 댓글 상태를 관리하기 위한 state
  const [openComments, setOpenComments] = useState({});

  // 홈 가운데 전체 게시글 띄우기 요청
  useEffect(() => {
    const getAllpost = async () => {
      const response = await axios.get("http://localhost:8080/post/read");

      console.log(response);
      dispatch(postActions.setPostData(response.data));
    };

    getAllpost();
  }, [dispatch]);

  console.log("UserProfile: ", localStorage.getItem(UserProfile));
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setLoggedInUserId(userId);
    console.log("local_userId: ", userId);
  }, []);

  const handleToggle = (postId) => {
    setOpenComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
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

  // comment 팝업 메뉴 토글 함수
  const toggleCommentPopup = (commentId) => {
    setShowCommentPopup((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  // 댓글 입력 핸들러
  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  // 댓글 추가 핸들러
  const handleAddComment = (postId) => {
    // 여기서 서버로 댓글을 보내고 처리하는 로직을 추가해야 합니다.
    console.log(`Adding comment "${commentText}" to post ${postId}`);

    // post 후 초기화
    setCommentText("");
    // edit post 눌렀을 때
    const editPostClickHandler = (postId) => {
      dispatch(editPostModalActions.setEditPostId(postId));
      dispatch(editPostModalActions.setIsEditPostOpen());
    };

    return (
      <>
        <EditPostModal />
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
                  <div className="post-owner-info_intro">
                    {post.introduction}
                  </div>
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
                      <div>Delete post</div>
                    </div>
                  </div>
                )}
                {loggedInUserId != post.userId && ( // 작성자와 로그인한 사용자의 userId 비교
                  <button className="follow-icon">+ Follow</button>
                )}
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
                    <img src={post.profilePicture} alt="profilePicture" />
                    <input
                      type="text"
                      className="comments-top_text"
                      placeholder="Add a comment…"
                      value={commentText}
                      onChange={handleCommentChange}
                    />
                    {commentText && (
                      <button
                        className="comments-post-button"
                        onClick={() => handleAddComment(post.userId)}
                      >
                        Post
                      </button>
                    )}
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
};
export default Post;
