import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebaseConfig"; // Firebase auth 객체 가져오기

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 현재 인증된 사용자 가져오기
        const currentUser = auth.currentUser;

        if (currentUser) {
          // 현재 사용자의 새로운 idToken 가져오기 (강제 갱신)
          const idToken = await currentUser.getIdToken(true);
          const uid = currentUser.uid;

          // 서버에 GET 요청을 보냅니다.
          const response = await axios.get(
            `http://localhost:8080/firebase/auth/user/${uid}`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`, // 헤더에 새로운 토큰 추가
              },
            }
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
