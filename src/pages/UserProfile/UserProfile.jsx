import React, { useEffect, useState } from "react";
import LoginNav from "../Home/LoginNav";
import "./UserProfile.css";
import education from "./education.svg";
import pencil from "./pencil.svg";
import vijay from "../../component/svg/vijay.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { profileModalActions } from "../../store/reducer/profileModal-slice";
import UserProfileModal from "../../component/UserProfileModal/UserProfileModal";

const UserProfile = () => {
  const dispatch = useDispatch();
  //구글유저
  const googleUserData = useSelector(
    (state) => state.googleSignin.googleUserData
  );

  //일반유저
  const normalUserData = useSelector((state) => state.signin.normalUserData);

  const isGoogleUser = googleUserData !== null;
  const isNormalUser = normalUserData !== null;

  const userData = isGoogleUser
    ? googleUserData
    : isNormalUser
    ? normalUserData
    : {};

  console.log("유저데이터 배경사진", userData.profileBackgroundPicture);
  //profileBackGroundPicture;<< 대문자 G로 바꿔야함.

  const BackgroundImg = isGoogleUser
    ? googleUserData.profileBackgroundPicture
    : isNormalUser
    ? normalUserData.profileBackGroundPicture
    : null;

  const openProfileModal = (e) => {
    e.preventDefault();
    dispatch(profileModalActions.setIsProfileModalOpen());
  };

  return (
    <div>
      <UserProfileModal />
      <LoginNav />
      <div className="home-body">
        <div className="user-content-layout">
          <div className="user-content-body">
            <div className="user-content-body-align">
              <div className="scaffold-layout-main">
                <div className="profile-layout">
                  {/* 프로필 레이어는 배경사진 등을 묶는 박스 */}
                  <div className="profile-layout-background-picture">
                    {/* 배경사진 */}
                    {BackgroundImg ? (
                      <img
                        src={`data:image/jpeg;base64,${BackgroundImg}`}
                        alt="User Background"
                        className="userprofile-background-image"
                      />
                    ) : (
                      <img
                        src="https://th.bing.com/th/id/R.482217a0290b9a99687f84df3bc52dcf?rik=bzq1HZD3Qi1EOA&riu=http%3a%2f%2fdata.1freewallpapers.com%2fdownload%2fdream-house.jpg&ehk=JNLcBFl%2fLmMeKee508BFM6WcARgKV1MO4dIkrJsmasQ%3d&risl=&pid=ImgRaw&r=0"
                        alt="Default Background"
                        className="userprofile-background-image"
                      />
                    )}
                  </div>
                  {/* 유저프로필사진 */}
                  <div className="profile-layout-user-picture">
                    {userData.profilePicture ? (
                      <img
                        src={`data:image/jpeg;base64,${userData.profilePicture}`}
                        alt="User Profile"
                        className="userprofile-picture-image"
                      />
                    ) : (
                      <img
                        src="https://cdn-lostark.game.onstove.com/uploadfiles/user/2021/04/06/637533445557572173.png"
                        alt="Default user-picture"
                        className="userprofile-picture-image"
                      />
                    )}
                  </div>
                  {/* 이름/한줄소개 등 */}
                  <div className="profile-layout-introduce">
                    <div className="profile-artdeco-button">
                      <button onClick={openProfileModal}>
                        <img src={pencil} alt="Edit" />
                      </button>
                    </div>
                    <div className="profile-introduce-card">
                      <div className="userprofile-name-edu-box">
                        <div className="userprofile-name">
                          {userData.fullName || "Default Name"} {/* 이름 */}
                        </div>
                        <div className="userprofile-edu-layout">
                          <div className="userprofile-edu-icon">
                            <img src={education} alt="education" />
                          </div>
                          <div className="userprofile-edu-text">
                            {userData.education || "Default Education"}
                          </div>
                        </div>
                      </div>
                      <div className="userprofile-one-line-introduce">
                        {userData.introduction || "Default Introduction"}{" "}
                        {/* 소개 */}
                      </div>
                      <div className="userprofile-location-contact-box">
                        <div className="userprofile-location">
                          {userData.location || "Default Locatiom"}
                        </div>
                        <div className="userprofile-contact">Contact info</div>
                      </div>
                      {/* 버튼 만들기 */}
                      <div className="button-box">
                        <button className="first-button">Open to</button>
                        <button className="second-button">
                          Add profile section
                        </button>
                        <button className="third-button">More</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="suggest-for-you">
                  <div className="suggest-box-1">
                    <div className="suggest-box-1-text">suggest for you</div>
                    <div className="suggest-box-1-private">private to you</div>
                  </div>
                  <div className="suggest-box-2">
                    <div className="suggest-box-2-text">Intermediate</div>
                    <div className="suggest-box-line"></div>
                    <div className="suggest-box-2-allstar">
                      Complete 3 steps to achieve All-star
                    </div>
                  </div>
                  <div className="suggest-box-first-and-two">
                    <div className="suggest-box-first">
                      <div className="suggest-box-first-text-1">
                        Where are you located?
                      </div>
                      <div className="suggest-box-first-text-2">
                        Members who include a postal code location receive up to
                        70% as many profile views.
                      </div>
                      <button className="third-button button-default">
                        Add Location
                      </button>
                    </div>
                    <div className="suggest-box-two">
                      <div className="suggest-box-two-text-1">
                        Write a summary to highlight your personality or work
                        experience
                      </div>
                      <div className="suggest-box-two-text-2">
                        Members who include a summary receive up to 3.9 times as
                        many profile views.
                      </div>
                      <button className="third-button button-default">
                        Add a summary
                      </button>
                    </div>
                  </div>
                </div>
                <div className="suggest-for-you Activity">
                  <div className="suggest-box-1 activity-box-align">
                    <div className="activity-box-align">
                      <div className="suggest-box-1 Activity-box-1">
                        <div className="suggest-box-1-text Activity-box-1-text">
                          Activity
                        </div>
                        <div className="suggest-box-1-private Activity-box-1-follower">
                          0 followers
                        </div>
                      </div>
                      <div className="Activity-parent-container">
                        <div className="Activity-box-2">
                          <button className="Activity-button-default">
                            create a post
                          </button>
                          <div className="Activity-pencil-default">
                            <button>
                              <img src={pencil} alt="Edit" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="Activity-written-post">
                    <div className="Activity-written-post-user">
                      <div className="Activity-written-post-user-name">
                        {userData.fullName || "Default Name"} {/* 이름 */}
                      </div>
                      <div className="Activity-written-post-user-createdAt">
                        Posted this • 41m
                      </div>
                    </div>
                    <div className="Activity-written-post-content">
                      안녕하세요 오늘 링크드인에 가입했습니다
                    </div>
                  </div>
                </div>
              </div>
              <div className="scaffold-layout-aside">
                <div className="profile-info-section">
                  <div className="aside-box">
                    <div className="followers-title">Add to LinkedIn Home</div>
                    <div className="new-user-add">
                      <div className="followers-person new-user-1">
                        {/* <div className="followers-person-img"> */}
                        <img src={vijay} alt="vijay" />
                        <div className="followers-person-info">
                          <div className="followers-person-info-name">
                            vijay verma
                          </div>
                          <div className="followers-perosn-info-intro">
                            A Wizard@overlayz stdio ✦ maker of 3dicons.co
                          </div>
                          <div className="followers-person-info-button">
                            {" "}
                            + follower
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="new-user-add">
                      <div className="followers-person">
                        {/* <div className="followers-person-img"> */}
                        <img src={vijay} alt="vijay" />
                        <div className="followers-person-info">
                          <div className="followers-person-info-name">
                            vijay verma
                          </div>
                          <div className="followers-perosn-info-intro">
                            A Wizard@overlayz stdio ✦ maker of 3dicons.co
                          </div>
                          <div className="followers-person-info-button">
                            {" "}
                            + follower
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="new-user-add">
                      <div className="followers-person">
                        {/* <div className="followers-person-img"> */}
                        <img src={vijay} alt="vijay" />
                        <div className="followers-person-info">
                          <div className="followers-person-info-name">
                            vijay verma
                          </div>
                          <div className="followers-perosn-info-intro">
                            A Wizard@overlayz stdio ✦ maker of 3dicons.co
                          </div>
                          <div className="followers-person-info-button">
                            {" "}
                            + follower
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="new-user-add">
                      <div className="followers-person">
                        {/* <div className="followers-person-img"> */}
                        <img src={vijay} alt="vijay" />
                        <div className="followers-person-info">
                          <div className="followers-person-info-name">
                            vijay verma
                          </div>
                          <div className="followers-perosn-info-intro">
                            A Wizard@overlayz stdio ✦ maker of 3dicons.co
                          </div>
                          <div className="followers-person-info-button">
                            {" "}
                            + follower
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
