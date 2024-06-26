import React from "react";

import media from "../../component/svg/media.svg";
import event from "../../component/svg/event.svg";
import write from "../../component/svg/write.svg";

import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { postModalActions } from "../../store/reducer/postModal-slice";

const StartPost = () => {
  const dispatch = useDispatch();
  const clickStartPostHandler = (e) => {
    e.preventDefault();
    dispatch(postModalActions.setIsStartPostOpen());
  };

  //구글유저
  const googleUserData = useSelector(
    (state) => state.googleSignin.googleUserData
  );

  //일반유저
  const normalUserData = useSelector((state) => state.signin.normalUserData);

  return (
    <>
      <div className="home-body_middle_write">
        <div className="home-body_middle_write-top">
          <div className="home-body_middle_write-top-profile">
            {googleUserData?.profilePicture ||
            normalUserData?.profilePicture ? (
              <img
                src={`data:image/jpeg;base64,${
                  googleUserData?.profilePicture ||
                  normalUserData.profilePicture
                }`}
                alt="profilePicture"
                className="home-body_middle_write-top-profile-image"
              />
            ) : (
              <img
                src={"/user.jpeg"}
                alt="profilePicture"
                className="home-body_middle_write-top-profile-image"
              />
            )}
          </div>
          <div
            className="home-body_middle_write-top-update"
            onClick={clickStartPostHandler}
          >
            <p className="update-write">Start a post</p>
          </div>
        </div>
        <div className="home-body-middle_write-bottom">
          <div className="home-body-middle_write-bottom-icons">
            <img src={media} alt="media" />
            <div className="middle-font">Media</div>
          </div>
          <div className="home-body-middle_write-bottom-icons">
            <img src={event} alt="event" />
            <div className="middle-font">Event</div>
          </div>
          <div className="home-body-middle_write-bottom-icons">
            <img src={write} alt="write" />
            <div className="middle-font">Writing</div>
          </div>
        </div>
      </div>
      <div className="container-first">
        <div className="line"></div>
        <div className="or-text">Sort By: Top</div>
      </div>
    </>
  );
};

export default StartPost;
