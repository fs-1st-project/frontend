import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Signup.css";
import { useDispatch, useSelector } from "react-redux";
import {
  postRegisterEmailPasswordToServer,
  signupActions,
} from "../../store/signup-slice";

import axios from "axios";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithCustomToken,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

const Signup = () => {
  const [isChecked, setIsChecked] = useState(false);
  const email = useSelector((state) => state.signup.email);
  const password = useSelector((state) => state.signup.password);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // all agree 체크박스에 체크했을 때 핸들하는 함수
  const handleAllAgreeCheck = () => {
    setIsChecked(!isChecked);
  };

  // slice의 이메일 상태값 변경하는 함수
  const emailInputChangeHandler = (e) => {
    const inputEmail = e.target.value;
    dispatch(signupActions.setEmail(inputEmail));
  };

  // slice의 패스워드 상태값 변경하는 함수
  const passwordInputChangeHandler = (e) => {
    const inputPassword = e.target.value;
    dispatch(signupActions.setPassword(inputPassword));
  };

  // agree 체크하고 이메일 아이디 입력한 다음 제출 버튼 눌렀을 때 핸들하는 함수
  const joinSubmitHandler = async (e) => {
    e.preventDefault();

    // 비밀번호 6자 이하 또는 12자 이상 alert 띄우기
    if (password.trim().length < 6) {
      alert("비밀번호 6자 이상 입력이 필요합니다");
      return;
    } else if (password.trim().length > 12) {
      alert("비밀번호 12자 이하 입력이 필요합니다");
      return;
    }

    // 이메일과 패스워드를 한꺼번에 만들어 보내기
    const registrationData = {
      email,
      password,
    };

    // POST 호출 함수 후 성공 시 signin 페이지로 redirect
    dispatch(postRegisterEmailPasswordToServer(registrationData)).then(
      (success) => {
        if (success == true) {
          navigate("/signin");
        } else {
          console.error("Registration failed");
          alert("회원 가입에 실패하였습니다");
        }
      }
    );
  };

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
    <div className="signup-container">
      <main className="main-container">
        <div className="main-logo--container">
          <img src="/LinkedIn-logo.png" className="main-logo" />
        </div>
        <h1 className="main-title">Make the most of your professional life</h1>
        <section className="consent-signup-container">
          <div className="container">
            <h2 className="main-subtitle">Join LinkedIn</h2>
            <p className="consent-understanding">
              To create a LinkedIn account, you must understand how LinkedIn
              processes your personal information by selecting learn more for
              eact item listed.
            </p>
            <div>
              <input
                type="checkbox"
                className="agree-all-terms"
                checked={isChecked}
                onChange={handleAllAgreeCheck}
                required
              />
              <label for="agree-all-terms" className="agree-all-terms--label">
                Agree to all terms
              </label>
              <div className="term1-term2--container">
                <div className="agree-term1">
                  <input type="checkbox" checked={isChecked} />
                  <label>
                    We collect and use personal information{" "}
                    <span className="hightlight">Learn more</span>
                  </label>
                </div>
                <div className="agree-term2">
                  <input
                    type="checkbox"
                    className="agree-term2"
                    checked={isChecked}
                  />
                  <label for="agree-term2">
                    We share personal infromation with third parties to provide
                    out services. <span className="hightlight">Learn more</span>
                  </label>
                </div>
              </div>
            </div>
            <p className="further-information">
              Futher information is available in out{" "}
              <span className="hightlight">Korea Privacy Addendum.</span>
            </p>

            <section className="form-container">
              <form
                className="email-password-form"
                onSubmit={joinSubmitHandler}
              >
                <div className="email-container">
                  <label>Email</label>
                  <input
                    type="email"
                    className="email"
                    value={email}
                    onChange={emailInputChangeHandler}
                    required
                  ></input>
                </div>
                <div className="password-container">
                  <label>Password(6+ characters)</label>
                  <input
                    type="password"
                    className="password"
                    value={password}
                    onChange={passwordInputChangeHandler}
                    required
                  ></input>
                </div>
                <p className="bottom-agree">
                  By clicking Agree & Join, you agree to the LinkedIn{" "}
                  <span className="hightlight">
                    User Agreement, Privacy Policy, and Cookie Policy
                  </span>
                </p>
                <button className="agree-join--button">Agree & Join</button>
              </form>
            </section>
            <div className="google-login-button--container">
              <span className="or-span">or</span>
              <button onClick={loginWithGoogle} className="google-login-button">
                Continue with Google
              </button>
            </div>
            <p className="already">
              Already on LinkedIn? <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </section>
        <p className="bottom-get-help">
          Looking to create a page for a business?{" "}
          <span className="hightlight">Get help</span>
        </p>
      </main>
    </div>
  );
};

export default Signup;
