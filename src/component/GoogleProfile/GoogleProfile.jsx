import React from "react";
import { useSelector } from "react-redux";
import "../../pages/Home/Home.css";

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
      {googleUserData.profileBackgroundPicture ? (
        <img
          src={`data:image/jpeg;base64,${googleUserData.profileBackgroundPicture}`}
          alt="User Background"
        />
      ) : (
        <p>No background picture</p>
      )}
      {googleUserData.profilePicture ? (
        <img
          src={`data:image/jpeg;base64,${googleUserData.profilePicture}`}
          alt="User Avatar"
        />
      ) : (
        <p>No profile picture</p>
      )}
      <h2> {googleUserData.fullName}</h2>
      <p>{googleUserData.introduction}</p>
    </div>
  );
};

export default GoogleProfile;
