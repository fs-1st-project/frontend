import React from "react";
import { useSelector } from "react-redux";
import "../../pages/Home/Home.css";
import "./GoogleProfile.css";
import UserProfile from "../../pages/UserProfile/UserProfile";
import { Route, Link } from "react-router-dom";

const GoogleProfile = () => {
  const googleUserData = useSelector(
    (state) => state.googleSignin.googleUserData
  );
  const googleLoading = useSelector(
    (state) => state.googleSignin.googleLoading
  );

  if (googleLoading) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  if (!googleUserData) {
    return <p>사용자 정보가 없습니다.</p>;
  }

  return (
    <div className="home-body_profile">
      <div className="Main-profile">
        <div className="user-background-picture">
          {googleUserData.profileBackgroundPicture ? (
            <img
              src={`data:image/jpeg;base64,${googleUserData.profileBackgroundPicture}`}
              alt="User Background"
              className="background-image"
            />
          ) : (
            <img
              src="https://th.bing.com/th/id/R.482217a0290b9a99687f84df3bc52dcf?rik=bzq1HZD3Qi1EOA&riu=http%3a%2f%2fdata.1freewallpapers.com%2fdownload%2fdream-house.jpg&ehk=JNLcBFl%2fLmMeKee508BFM6WcARgKV1MO4dIkrJsmasQ%3d&risl=&pid=ImgRaw&r=0"
              alt="Default Background"
              className="background-image"
            />
          )}
        </div>
        <div className="user-picture">
          {googleUserData.profilePicture ? (
            <img
              src={`data:image/jpeg;base64,${googleUserData.profilePicture}`}
              alt="User Avatar"
              className="picture-image"
            />
          ) : (
            <img
              src="/user.jpeg"
              alt="Default user-picture"
              className="picture-image"
            />
          )}
        </div>
        <div className="user-descript-box">
          <div className="user-name">
            <Link
              to={`/profile/${encodeURIComponent(googleUserData.fullName)}`}
              className="link-no-underline"
            >
              {googleUserData.fullName}
            </Link>
          </div>
          <div className="user-introduction">{googleUserData.introduction}</div>
        </div>
      </div>

      <div className="Main-profile profile-state-feed">
        <div className="headline-text-1">Find customers with Sales Nav</div>
        <div className="headline-text-2">Try for ₩0</div>
      </div>
    </div>
  );
};

export default GoogleProfile;
