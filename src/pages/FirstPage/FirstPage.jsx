import React from "react";
import NavBar from "../../component/NavBar";
import { Link } from "react-router-dom";
import "./FirstPage.css";
import google from "../../component/google-logo.png";

const FirstPage = () => {
  return (
    <div>
      <NavBar />
      <div className="Main">
        <div className="Main-Section">
          <div className="Main-left">
            <div className="Main-left_head">Community for Pros</div>
            <div className="Main-left_body">
              <div className="goole-button">
                <button className="button-google">
                  <img src={google} className="google-logo" />
                  Continue with Google
                </button>
              </div>
              {/* <div className="Main-left_body-divider-left-right">
                ::before
                <div className="Main-bottom_divider-or"> or </div>
                ::after
              </div> */}
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
