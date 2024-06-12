import React from "react";
import "./Signin.css";
import google from "../../component/google-logo.png";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinActions } from "../../store/signin-slice";

const Signin = () => {
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
  const signinClickHandler = (e) => {};

  return (
    <div className="signin-page-container">
      <div className="header_logo-container">
        <img src="/LinkedIn-logo.png" className="main-logo" />
      </div>
      <main className="signin-main-container">
        <h1 className="signin-title">Sign in</h1>
        <h2 className="signin-subtitle">
          Stay updated on your professional world
        </h2>
        <form className="signin-form">
          <input
            className="input-email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={emailInputChangeHandler}
            required
          ></input>
          <input
            className="input-password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={passwordInputChangeHandler}
            required
          ></input>
          <span className="span-forgot-password">Forgot password?</span>
          <button className="button-signin" onClick={signinClickHandler}>
            Sign in
          </button>
          <p className="or">or</p>
          <button className="button-google">
            <img src={google} className="google-logo" />
            Continue with Google
          </button>
          <button className="button-apple">
            {" "}
            <img src="/apple-logo.png" className="apple-logo" />
            Sign in With Apple
          </button>
        </form>
      </main>
      <p className="to-signup">
        Need to LinkedIn?{" "}
        <Link to="/signup" className="join">
          Join now
        </Link>
      </p>
    </div>
  );
};

export default Signin;
