import React, { useEffect } from "react";

import "./Post.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { postActions } from "../../store/reducer/post-slice";

const Post = () => {
  const postData = useSelector((state) => state.post.postData);

  // 홈 가운데 전체 게시글 띄우기 요청
  useEffect(() => {
    const getAllpost = async () => {
      const response = await axios.get("http://localhost:8080/home/post", {
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
        <div className="post-container">
          <div className="post-top">
            <div className="post-owner">{/* post owner 정보 */}</div>
            <div className="post-top-icons">
              <div className="more-icon"></div>
              <div className="follow-icon"></div>
            </div>
          </div>
          <div className="post-contents">{/* post 내용 */}</div>
          <div className="post-comments-count">{/* 댓글 수 */}</div> 
          <div className="post-bottom-buttons">{/* 하단 버튼 */}</div>
        </div>
      ))}
    </>
  );
};

export default Post;
