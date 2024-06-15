// UserProfile.js
import React from "react";
import LoginNav from "../Home/LoginNav";
import "./UserProfile.css";
import education from "./education.svg";

const UserProfile = () => (
  <div>
    <LoginNav />
    <div className="home-body">
      <div className="user-content-layout">
        <div className="user-content-body">
          <div className="scaffold-layout-main">
            <div className="profile-layout">
              {/*프로필 레이어는 배경사진 등을 묶는 박스*/}
              <div className="profile-layout-background-picture">
                {/*배경사진*/}
                <img
                  src="https://th.bing.com/th/id/R.482217a0290b9a99687f84df3bc52dcf?rik=bzq1HZD3Qi1EOA&riu=http%3a%2f%2fdata.1freewallpapers.com%2fdownload%2fdream-house.jpg&ehk=JNLcBFl%2fLmMeKee508BFM6WcARgKV1MO4dIkrJsmasQ%3d&risl=&pid=ImgRaw&r=0"
                  alt="Default Background"
                  className="userprofile-background-image"
                />
              </div>
              {/*유저프로필사진*/}
              <div className="profile-layout-user-picture">
                <img
                  src="https://cdn-lostark.game.onstove.com/uploadfiles/user/2021/04/06/637533445557572173.png"
                  alt="Default user-picture"
                  className="userprofile-picture-image"
                />
              </div>
              {/*이름/한줄소개 등*/}
              <div className="profile-layout-introduce">
                <div className="profile-introduce-card">
                  <div className="userprofile-name-edu-box">
                    <div className="userprofile-name">김연희</div>
                    <div className="userprofile-edu-layout">
                      <div className="userprofile-edu-icon">
                        <img src={education} alt="education" />
                      </div>
                      <div className="userprofile-edu-text">에듀케이션</div>
                    </div>
                  </div>
                  <div className="userprofile-one-line-introduce">
                    안녕하세요 어쩌구저쩌구입니다 잘부탁드립니다
                  </div>
                  <div className="userprofile-location-contact-box">
                    <div className="userprofile-location">지역</div>
                    <div className="userprofile-contact">contact</div>
                  </div>
                  {/*버튼 만들기 */}
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
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default UserProfile;
