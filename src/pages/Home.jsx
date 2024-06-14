import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { googleSigninActions } from "../store/googleSignin-slice";

const Home = () => {
  const dispatch = useDispatch();

  // 구글 로그인 state
  const isGoogleClicked = useSelector(
    (state) => state.googleSignin.isGoogleClicked
  );
  const googleUserData = useSelector(
    (state) => state.googleSignin.googleUserData
  );

  // 일반 로그인 state
  const isNormalLoginClicked = useSelector(
    (state) => state.signin.isNormalLoginClicked
  );

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
          dispatch(googleSigninActions.setGoogleUserData(response.data));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  return (
    <div>
      <h2>사용자 정보</h2>
      {googleUserData ? (
        <div>
          <p>이름: {googleUserData.displayName}</p>
          <p>Email: {googleUserData.email}</p>
          <img src={googleUserData.photoUrl} alt="User Avatar" />
        </div>
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default Home;
