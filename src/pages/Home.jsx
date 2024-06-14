import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { googleSigninActions } from "../store/googleSignin-slice";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Firebase auth 객체 가져오기
import { signinActions } from "../store/signin-slice";
import NormalProfile from "../component/NormalProfile/NormalProfile";
import GoogleProfile from "../component/GoogleProfile/GoogleProfile";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 구글 로그인 state
  const isGoogleClicked = useSelector(
    (state) => state.googleSignin.isGoogleClicked
  );

  // 일반 로그인 state
  const isNormalLoginClicked = useSelector(
    (state) => state.signin.isNormalLoginClicked
  );

  // 구글 유저 데이터 가져오기
  const fetchGoogleUserData = async () => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const idToken = await currentUser.getIdToken(true);
        const uid = currentUser.uid;

        const response = await axios.get(
          `http://localhost:8080/api/users/${uid}/profile`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        dispatch(googleSigninActions.setGoogleUserData(response.data));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      dispatch(googleSigninActions.setGoogleLoading());
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
    } finally {
      dispatch(signinActions.setIsLoading());
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

  const showComponentBySigninButton = () => {
    if (isGoogleClicked) {
      return <GoogleProfile />;
    } else if (isNormalLoginClicked) {
      return <NormalProfile />;
    } else {
      return <div>로그인 유저 데이터가 없습니다</div>;
    }
  };

  return <div>{showComponentBySigninButton()}</div>;
};

export default Home;
