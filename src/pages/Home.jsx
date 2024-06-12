import React from "react";
import NavBar from "../component/NavBar";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="Main">
        <div className="Main-Section">
          <div className="Main-left">
            <div className="Main-left_head">Community for Pros</div>
            <div className="Main-left_body">
              <button className="goole-button-click">
                <div className="goole-button_des">
                  <div className="goole-button_logo">
                    <img src="/goole-logo.png" alt="" />
                  </div>
                  Continue with Google
                </div>
              </button>
              <div className="Main-left_body-divider-left-right">
                {
                  "---------------------------------  or  ----------------------------------"
                }
              </div>
              <div className="Main-left_body-form">
                <div className="Main-bottom_form-input">
                  <div>email or phone</div>
                  <div className="Main-bottom_form-input-box">
                    <input className="Main-bottom_form-input-box_input"></input>
                    <div className="Main-bottom_form-input-box_pass"></div>
                  </div>
                </div>
                <div className="Main-bottom_form-input">
                  <div>password</div>
                  <div className="Main-bottom_form-input-box">
                    <input className="Main-bottom_form-input-box_input"></input>
                    <div className="Main-bottom_form-input-box_pass">mark</div>
                  </div>
                </div>
                <div className="Main-bottom_form-signin"></div>
              </div>
              <div className="forgot_password">Forgot your password?</div>
            </div>
            <div className="Main-footer">
              <div className="login-button-click">log in</div>
              <div className="NewtoLinkedin">
                <span>New to Linkedin?</span>
                <a className="Join-membership" href="/signup">
                  <span className="Join-membership_click">
                    join the membership
                  </span>
                </a>
              </div>
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

export default Home;
