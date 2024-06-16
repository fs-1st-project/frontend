import React from "react";

import "./Home.css";

import StartPost from "./StartPost";
import Post from "./Post";

const HomeMiddle = () => {
  return (
    <div className="home-body_middle">
      <StartPost />
      <Post />
    </div>
  );
};

export default HomeMiddle;
