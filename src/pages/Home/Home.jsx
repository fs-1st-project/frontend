import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { googleSigninActions } from "../../store/reducer/googleSignin-slice";
import { useNavigate } from "react-router-dom";
import { signinActions } from "../../store/reducer/signin-slice";
import NormalProfile from "../../component/NormalProfile/NormalProfile";
import GoogleProfile from "../../component/GoogleProfile/GoogleProfile";
import { auth } from "../../firebaseConfig"; // Firebase auth 객체 가져오기
import "./Home.css";
import vijay from "../../component/svg/vijay.jpeg";
import LoginNav from "./LoginNav";
import StartPost from "./HomeMiddle";
import PostModal from "../../component/PostModal/PostModal";
import HomeMiddle from "./HomeMiddle";

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

  return (
    <div>
      <PostModal />
      <LoginNav />
      <div className="home-body">
        {showComponentBySigninButton()}
        <HomeMiddle />
        <div className="followers">
          <div className="followers-title">Add to LinkedIn Home</div>
          <div className="followers-person">
            {/* <div className="followers-person-img"> */}
            <img src={vijay} alt="vijay" />
            <div className="followers-person-info">
              <div className="followers-person-info-name">vijay verma</div>
              <div className="followers-perosn-info-intro">
                A Wizard@overlayz stdio ✦ maker of 3dicons.co
              </div>
              <div className="followers-person-info-button"> + follower</div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
