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
                    <img
                      src="https://blog.kakaocdn.net/dn/HDY7T/btrY2our4Rw/Fw6bz0QroBUp1YxglkkwEK/img.webp"
                      alt=""
                    ></img>
                  </div>
                  Continue with Google
                </div>
              </button>
              <div className="Main-left_body-divider-left-right">
                ::before
                <div className="Main-bottom_divider-or"> or </div>
                ::after
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

export default Home;
