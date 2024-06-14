import React from "react";
import useProfileData from "./GoogleProfileData";
import ProfileComponent from "./GoogleProfile";

const Home = () => {
  const { userData, loading } = useProfileData();

  return (
    <div>
      <ProfileComponent userData={userData} loading={loading} />
    </div>
  );
};

export default Home;
