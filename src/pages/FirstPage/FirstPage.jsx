import React from "react";
import NavBar from "../../component/NavBar";
import "./FirstPage.css";
import google from "../../component/google-logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./FirstPage.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithCustomToken,
} from "firebase/auth";
import {
  postSigninEmailPasswordToServer,
  signinActions,
} from "../../store/signin-slice";
import { auth } from "../../firebaseConfig";

const FirstPage = () => {
  const navigate = useNavigate();
  const email = useSelector((state) => state.signin.email);
  const password = useSelector((state) => state.signin.password);
  const dispatch = useDispatch();

  // slice의 이메일 상태값 변경하는 함수
  const emailInputChangeHandler = (e) => {
    const emailInput = e.target.value;
    dispatch(signinActions.setEmail(emailInput));
  };

  // slice의 패스워드 상태값 변경하는 함수
  const passwordInputChangeHandler = (e) => {
    const passwordInput = e.target.value;
    dispatch(signinActions.setPassword(passwordInput));
  };

  // sign in 버튼 눌렀을 때 핸들
  const signinClickHandler = (e) => {
    e.preventDefault();
    // 비밀번호 6자 이하 또는 12자 이상 alert 띄우기
    if (password.trim().length < 6) {
      alert("비밀번호 6자 이상 입력이 필요합니다");
      return;
    } else if (password.trim().length > 12) {
      alert("비밀번호 12자 이하 입력이 필요합니다");
      return;
    }

    // 서버에 입력된 이메일과 패스워드 요청 보내기
    const signinData = {
      email,
      password,
    };
    dispatch(postSigninEmailPasswordToServer(signinData)).then((success) => {
      if (success == true) {
        navigate("/home");
      } else {
        console.error("Sign in failed");
        alert("아이디나 패스워드가 일치하지 않습니다.");
      }
    });
  };

  const loginWithGoogle = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken(); // id 토큰을 백엔드 API로 전달하여 커스텀 토큰을 요청

      const response = await axios.post(
        "http://localhost:8080/firebase/auth/google",

        { idToken }
      );

      const customToken = response.data.customToken; // 커스텀 토큰으로 firebase에 로그인

      await signInWithCustomToken(auth, customToken);

      console.log("User authenticated successfully");

      setTokenRefreshInterval();

      navigate("/home");
    } catch (error) {
      console.error("Error during authentication", error);
    }
  };

  const refreshToken = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const idToken = await user.getIdToken(true); // 새로운 idToken을 강제로 가져옴

        const response = await axios.post(
          "http://localhost:8080/firebase/auth/google",

          { idToken }
        );

        const customToken = response.data.customToken;

        await signInWithCustomToken(auth, customToken);

        console.log("User authenticated successfully with new custom token");
      }
    } catch (error) {
      console.error("Error during token refresh", error);
    }
  };

  const setTokenRefreshInterval = () => {
    setInterval(refreshToken, 3600000); // 1시간
  };

  return (
    <div>
      <NavBar />
      <div className="Main">
        <div className="Main-Section">
          <div className="Main-left">
            <div className="Main-left_head">
              Welcome to your professional community
            </div>
            <div className="Main-left_body">
              <div className="goole-button">
                <button
                  className="button-google-first"
                  onClick={loginWithGoogle}
                >
                  <img src={google} className="google-logo" />
                  Continue with Google
                </button>
              </div>
              <div class="container-first">
                <div class="line"></div>
                <div class="or-text">or</div>
                <div class="line"></div>
              </div>
              <div className="Main-left_body-form">
                <div className="Main-bottom_form-input">
                  <div>Email or phone</div>
                  <input
                    class="input-large"
                    type="email"
                    value={email}
                    onChange={emailInputChangeHandler}
                    required
                  ></input>
                </div>
                <div className="Main-bottom_form-input">
                  <div>Password</div>
                  <input
                    class="input-large"
                    type="password"
                    value={password}
                    onChange={passwordInputChangeHandler}
                    required
                  ></input>
                </div>
                <div class="forgot-pw">Forgot password?</div>
                <div className="Main-bottom_form-signin"></div>
                <button
                  className="button-signin-first"
                  onClick={signinClickHandler}
                >
                  Sign in
                </button>
              </div>
            </div>
            <div className="Main-footer">
              <span>New to Linkedin?</span>
              <Link to="/signup">Join now</Link>
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
