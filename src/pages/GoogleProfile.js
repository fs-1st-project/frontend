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
      {userData.profileBackgroundPicture ? (
        <img
          src={`data:image/jpeg;base64,${userData.profileBackgroundPicture}`}
          alt="User Background"
        />
      ) : (
        <p>No background picture</p>
      )}
      {userData.profilePicture ? (
        <img
          src={`data:image/jpeg;base64,${userData.profilePicture}`}
          alt="User Avatar"
        />
      ) : (
        <p>No profile picture</p>
      )}
      <h2> {userData.fullName}</h2>
      <p>{userData.introduction}</p>
    </div>
  );
};

export default ProfileComponent;
