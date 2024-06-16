import React from "react";

import "./Post.css";

const Post = () => {
  return (
    <div className="post-container">
      <div className="post-top"></div>
      <div className="post-post-owner"></div>
      <div className="post-contents"></div>
      <div className="post-comments-count"></div>
      <div className="post-bottom-buttons"></div>
    </div>
  );
};

export default Post;
