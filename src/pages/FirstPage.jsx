import React from "react";
import NavBar from "../component/NavBar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./FirstPage.css";
//import loginWithGoogle from "./login/loginWithGoogle";
import axios from "axios";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithCustomToken,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const FirstPage = () => {
  const navigate = useNavigate();

  const loginWithGoogle = async (e) => {
    e.preventDefault(); // 기본 동작 막기

    const provider = new GoogleAuthProvider();

    try {
      // Firebase로 Google 로그인
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // id 토큰을 백엔드 API로 전달하여 커스텀 토큰을 요청
      const response = await axios.post(
        "http://localhost:8080/firebase/auth/google",
        { idToken }
      );
      const customToken = response.data;

      // 커스텀 토큰으로 firebase에 로그인
      await signInWithCustomToken(auth, customToken);
      console.log("User authenticated successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error during authentication", error);
    }
  };
  return (
    <div>
      <NavBar />
      <div className="Main">
        <div className="Main-Section">
          <div className="Main-left">
            <div className="Main-left_head">Community for Pros</div>
            <div className="Main-left_body">
              <div className="goole-button">
                <button onClick={loginWithGoogle}>Google Login</button>
              </div>
              <div className="Main-left_body-divider-left-right">
                ::before
                <div className="Main-bottom_divider-or"> or </div>
                ::after
              </div>
              <div className="Main-left_body-form">
                <div className="Main-bottom_form-input">
                  <div>email or phone</div>
                  <input></input>
                </div>
                <div className="Main-bottom_form-input">
                  <div>password</div>
                  <input></input>
                </div>
                <div className="Main-bottom_form-signin"></div>
              </div>
            </div>
            <div className="Main-footer">
              <span>New to Linkedin?</span>
              <Link to="/signup">Join the membership</Link>
            </div>
          </div>
          <div className="Main-right">
            <img src="/MainPhoto.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
