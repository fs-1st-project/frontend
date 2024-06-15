import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../firebaseConfig"; // Firebase auth 객체 가져오기
import "./Home.css";
import media from "../../component/media.svg";
import event from "../../component/event.svg";
import write from "../../component/write.svg";
import vijay from "../../component/vijay.jpeg";
import LoginNav from "./LoginNav";

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
      <LoginNav />
      <div className="home-body">
        <div className="home-body_profile"></div>
        <div className="home-body_middle">
          <div className="home-body_middle_write">
            <div className="home-body_middle_write-top">
              <div className="home-body_middle_write-top-profile"></div>
              <input
                className="home-body_middle_write-top-update"
                type="input"
                placeholder="Update Write"
              />
            </div>
            <div className="home-body-middle_write-bottom">
              <div className="home-body-middle_write-bottom-icons">
                <img src={media} alt="media" />
                <div className="middle-font">media</div>
              </div>
              <div className="home-body-middle_write-bottom-icons">
                <img src={event} alt="event" />
                <div className="middle-font">event</div>
              </div>
              <div className="home-body-middle_write-bottom-icons">
                <img src={write} alt="write" />
                <div className="middle-font">writing</div>
              </div>
            </div>
          </div>
          <div class="container-first">
            <div class="line"></div>
            <div class="or-text">Sort By: Top</div>
          </div>
          <div className="home-body_middle_post"></div>
        </div>
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
