import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [userData, setUserData] = useState(null); // 사용자 데이터를 저장할 상태 변수

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 로컬 스토리지에서 UID를 가져옵니다.
        const uid = localStorage.getItem("uid");

        if (uid) {
          // 서버에 GET 요청을 보냅니다.
          const response = await axios.get(
            `http://localhost:8080/firebase/auth/user/${uid}`
          );
          // 서버에서 받은 사용자 데이터를 상태 변수에 저장합니다.
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>사용자 정보</h2>
      {userData ? (
        <div>
          <p>이름: {userData.displayName}</p>
          <p>Email: {userData.email}</p>
          <img src={userData.photoUrl} alt="User Avatar" />
        </div>
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default Home;
