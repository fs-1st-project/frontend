import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomeSignin.css";

const WelcomeSignin = () => {
  const navigate = useNavigate();

  return (
    <div>
      <main className="signin-container">
        <div className="header_logo-container">
          <img src="/LinkedIn-logo.png" className="main-logo" />
        </div>
        <h1 className="title">Welcome back</h1>
        <h2 className="subtitle">
          Don't miss your next opportunity. Sign in to stay updated on your
          professional world.
        </h2>
        <div className="sign_existing-account">jeongmin choi</div>
        <div
          className="sign_another-account"
          onClick={() => navigate("/signin")}
        >
          Sign in using another account
        </div>
        <p className="bottom-title">
          New to LinkedIn? <span className="highlight">Join now</span>
        </p>
      </main>
    </div>
  );
};

export default WelcomeSignin;
