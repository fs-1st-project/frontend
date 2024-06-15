import React from "react";
import { useSelector } from "react-redux";
import "../../pages/Home/Home.css";

const NormalProfile = () => {
  const normalUserData = useSelector((state) => state.signin.normalUserData);
  const isLoading = useSelector((state) => state.signin.isLoading);

  if (isLoading) {
    return <p>일반 로그인 유저 데이터를 불러오는 중입니다...</p>;
  }

  if (!normalUserData) {
    return <p>일반 로그인 유저 정보가 없습니다.</p>;
  }

  return (
    <div className="home-body_profile">
      {normalUserData.profileBackgroundPicture ? (
        <img
          src={`data:image/jpeg;base64,${normalUserData.profileBackgroundPicture}`}
          alt="User Background"
        />
      ) : (
        <p>No background picture</p>
      )}
      {normalUserData.profilePicture ? (
        <img
          src={`data:image/jpeg;base64,${normalUserData.profilePicture}`}
          alt="User Avatar"
        />
      ) : (
        <p>No profile picture</p>
      )}
      <h2> {normalUserData.fullName}</h2>
      <p>{normalUserData.introduction}</p>
    </div>
  );
};

export default NormalProfile;
