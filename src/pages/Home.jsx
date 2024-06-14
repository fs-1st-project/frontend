import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { googleSigninActions } from "../store/googleSignin-slice";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Firebase auth 객체 가져오기
import { signinActions } from "../store/signin-slice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const normalUserData = useSelector((state) => state.signin.normalUserData);

  // 구글 유저 데이터 가져오기
  const fetchGoogleUserData = async () => {
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
        dispatch(googleSigninActions.setGoogleUserData(response.data));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // 일반 유저 데이터 가져오기
  const fetchNormalUserData = async () => {
    try {
      // 로컬 스토리지에서 토큰 받기
      const token = localStorage.getItem("token");

      // 서버에 GET 요청을 보내기 with token
      const response = await axios.get("http://localhost:8080/home/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // 서버에서 받은 유저 데이터 저장
      dispatch(signinActions.setNormalUserData(response.data));
      
    } catch (error) {
      console.error("기본 로그인 사용자 정보를 받아오지 못했습니다");
    }
  };

  useEffect(() => {
    if (!isGoogleClicked && !isNormalLoginClicked) {
      navigate("/");
    } else if (isGoogleClicked) {
      fetchGoogleUserData();
    } else {
      fetchNormalUserData();
    }
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
      ) : normalUserData ? (
        <div>
          <p>일반 유저 이메일 {normalUserData.email}</p>
        </div>
      ) : (
        <p>일반 로그인 유저 데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default Home;
