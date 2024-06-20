import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NormalProfile from "../../component/NormalProfile/NormalProfile";
import GoogleProfile from "../../component/GoogleProfile/GoogleProfile";
import "./Home.css";
import vijay from "../../component/svg/vijay.jpeg";
import LoginNav from "./LoginNav";
import PostModal from "../../component/PostModal/PostModal";
import HomeMiddle from "./HomeMiddle";
import {
  fetchGoogleUserData,
  fetchNormalUserData,
} from "../../store/reducer/profile-slice";

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

  const googleUserData = useSelector(
    (state) => state.googleSignin.googleUserData
  );

  // 구글이나 일반 유저 로그인 후, home 왼쪽에 유저 간단 프로필 띄우기
  useEffect(() => {
    console.log("구글유저 로그인 첫 렌더");
    if (!isGoogleClicked && !isNormalLoginClicked) {
      navigate("/");
    } else if (isGoogleClicked) {
      console.log("구글유저데이터 렌더랑");
      dispatch(fetchGoogleUserData());
      console.log("구글유저데이터", googleUserData);
    } else {
      dispatch(fetchNormalUserData());
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
        <div className="scaffold-layout-aside">
          <div className="profile-info-section">
            <div className="aside-box">
              <div className="followers-title">Other similar profiles</div>
              <div className="new-user-add">
                <div className="followers-person">
                  <img
                    src="/jeongmin.png"
                    alt="jeonmin"
                    className="jeongmin-img"
                  />
                  <div className="followers-person-info">
                    <div className="followers-person-info-name">
                      Jeongmin Choi
                    </div>
                    <div className="followers-perosn-info-intro">
                      안녕하세유 최정민입니다
                    </div>
                    <div className="followers-person-info-button">
                      {" "}
                      + follower
                    </div>
                  </div>
                </div>
              </div>
              <div className="new-user-add">
                <div className="followers-person">
                  <img
                    src="/yeonhee.jpg"
                    alt="yeonhee"
                    className="yeonhee-img"
                  />
                  <div className="followers-person-info">
                    <div className="followers-person-info-name">
                      Yeonhee Kim
                    </div>
                    <div className="followers-perosn-info-intro">
                      하이루 저는 김연희입니다
                    </div>
                    <div className="followers-person-info-button">
                      {" "}
                      + follower
                    </div>
                  </div>
                </div>
              </div>
              <div className="new-user-add">
                <div className="followers-person">
                  <img
                    src="/sangyoon.jpg"
                    alt="sangyoon"
                    className="sangyoon-img"
                  />
                  <div className="followers-person-info">
                    <div className="followers-person-info-name">
                      Sangyoon Kim
                    </div>
                    <div className="followers-perosn-info-intro">
                      할라우 저는 김상윤입니다!
                    </div>
                    <div className="followers-person-info-button">
                      {" "}
                      + follower
                    </div>
                  </div>
                </div>
              </div>
              <div className="new-user-add">
                <div className="followers-person new-user-1">
                  <img src={vijay} alt="vijay" />
                  <div className="followers-person-info">
                    <div className="followers-person-info-name">
                      vijay verma
                    </div>
                    <div className="followers-perosn-info-intro">
                      A Wizard@overlayz ✦
                    </div>
                    <div className="followers-person-info-button">
                      {" "}
                      + follower
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
