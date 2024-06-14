import React from "react";
import { useSelector } from "react-redux";
import "./GoogleProfile.css";

const GoogleProfile = () => {
  const googleUserData = useSelector(
    (state) => state.googleSignin.googleUserData
  );
  console.log(googleUserData);
  const googleLoading = useSelector(
    (state) => state.googleSignin.googleLoading
  );

  console.log(
    googleLoading,
    googleUserData,
    "구글 로딩과 유저데이터 확인 로그"
  );

  if (googleLoading) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  if (!googleUserData) {
    return <p>사용자 정보가 없습니다.</p>;
  }

  return (
    <div className="Main">
      <div className="Main-profile">
        <div className="user-background-picture">
          {googleUserData.profileBackgroundPicture ? (
            <img
              src={`data:image/jpeg;base64,${googleUserData.profileBackgroundPicture}`}
              alt="User Background"
            />
          ) : (
            <p>No background picture</p>
          )}
        </div>

        <div className="user-picture">
          {googleUserData.profilePicture ? (
            <img
              src={`data:image/jpeg;base64,${googleUserData.profilePicture}`}
              alt="User Avatar"
            />
          ) : (
            <p>No profile picture</p>
          )}
        </div>

        <div className="user-descript-box">
          <div className="user-name">{googleUserData.fullName}</div>
          <div className="user-introduction">{googleUserData.introduction}</div>
        </div>
      </div>
    </div>
  );
};

export default GoogleProfile;
