import React from "react";

const ProfileComponent = ({ userData, loading }) => {
  if (loading) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  if (!userData) {
    return <p>사용자 정보가 없습니다.</p>;
  }

  return (
    <div>
      <h2>사용자 정보</h2>
      <p>이름: {userData.fullName}</p>
      <p>Email: {userData.email}</p>
      {userData.profilePicture && (
        <img
          src={`data:image/jpeg;base64,${userData.profilePicture}`}
          alt="User Avatar"
        />
      )}
      {userData.profileBackgroundPicture && (
        <img
          src={`data:image/jpeg;base64,${userData.profileBackgroundPicture}`}
          alt="User Background"
        />
      )}
      <p>소개글: {userData.introduction}</p>
      <p>교육: {userData.education}</p>
      <p>위치: {userData.location}</p>
      {userData.bio && <p>소개: {userData.bio}</p>}
      {userData.certification && <p>인증: {userData.certification}</p>}
    </div>
  );
};

export default ProfileComponent;
