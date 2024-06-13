import React from "react";
import NavBar from "../../component/NavBar";
import "./FirstPage.css";
import google from "../../component/google-logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./FirstPage.css";
import axios from "axios";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithCustomToken,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

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
                <button className="button-google" onClick={loginWithGoogle}>
                  <img src={google} className="google-logo" />
                  Continue with Google
                </button>
              </div>
              <form className="Main-left_body-form">
                <div className="Main-bottom_form-input">
                  <div>Email</div>
                  <input type="email" className="form-email-input"></input>
                </div>
                <div className="Main-bottom_form-input">
                  <div>Password</div>
                  <input
                    type="password"
                    className="form-password-input"
                  ></input>
                </div>
                <div className="Main-bottom_form-signin"></div>
              </form>
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
