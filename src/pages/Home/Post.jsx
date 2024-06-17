import React, { useEffect } from "react";

import "./Post.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { postActions } from "../../store/reducer/post-slice";

import like from "../../component/svg/like.svg";
import comment from "../../component/svg/comment.svg";
import repost from "../../component/svg/repost.svg";
import send from "../../component/svg/send.svg";

const Post = () => {
  const postData = useSelector((state) => state.post.postData);

  // 홈 가운데 전체 게시글 띄우기 요청
  useEffect(() => {
    const getAllpost = async () => {
      const response = await axios.get("http://localhost:8080/post/read", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatchEvent(postActions.setPostData(response));
    };

    getAllpost();
  }, [postData]);

  return (
    <>
      {postData.map((post) => (
        <div className="post-container" Key={post.id}>
          <div className="post-top">
            <div className="post-owner">
              {/* post owner 정보 */}
              <div className="post-owner-picture"></div>
              <div className="post-owner-info">
                <div className="post-owner-info_name">{post.full_name}</div>
                <div className="post-owner-info_intro">kim's intro</div>
                <div className="post-owner-info_time">2w</div>
              </div>
            </div>
            <div className="post-top-icons">
              {/* <div className="more-icon">more-icon</div> */}
              <button className="follow-icon">+ Follow</button>
            </div>
          </div>
          <div className="post-contents">contents{/* post 내용 */}</div>
          <div className="post-comments-count">
            commentscount{/* 댓글 수 */}
          </div>
          <div className="post-bottom-buttons">
            <button type="button" className="post-bottom-buttons_like">
              <img src={like} alt="like" />
              Like
            </button>
            <button type="button" className="post-bottom-buttons_comment">
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
        </div>
      ))}
    </>
  );
};

export default Post;
