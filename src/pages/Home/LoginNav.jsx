import React from "react";
import { useNavigate } from "react-router-dom";
import home from "../../component/svg/home.svg";
import person from "../../component/svg/person.svg";
import Recruitmentnotice from "../../component/svg/Recruitmentnotice.svg";
import alarm from "../../component/svg/alarm.svg";
import message from "../../component/svg/message.svg";
import menu from "../../component/svg/menu.svg";
import logo from "../../component/svg/LinkedIn_login_logo.png";

import "./LoginNav.css";
import { useSelector } from "react-redux";

const LoginNav = () => {
  const navigate = useNavigate();

  //구글유저
  const googleUserData = useSelector(
    (state) => state.googleSignin.googleUserData
  );

  //일반유저
  const normalUserData = useSelector((state) => state.signin.normalUserData);

  return (
    <div className="LoginNav">
      <div className="LoginNav-menu_left">
        <div className="LoginNav-logo" onClick={() => navigate("/home")}>
          <img src={logo} alt="LinkedIn_login_logo" />
        </div>
        <div>
          <input type="text" placeholder="Search" className="search_input" />
        </div>
      </div>
      <div className="LoginNav-menu">
        <div className="LoginNav-menu_pages">
          <div className="LoginNav-menu_pages-icons">
            <div className="LoginNav-menu_pages-icons-click">
              <img src={home} alt="home" />
              <div className="LoginNav-menu_font">Home</div>
            </div>
          </div>
          <div className="LoginNav-menu_pages-icons">
            <div className="LoginNav-menu_pages-icons-click">
              <img src={person} alt="My network" />
              <div className="LoginNav-menu_font">MyNetwork</div>
            </div>
          </div>
          <div className="LoginNav-menu_pages-icons">
            <div className="LoginNav-menu_pages-icons-click">
              <img src={Recruitmentnotice} alt="Jobs" />
              <div className="LoginNav-menu_font">Jobs</div>
            </div>
          </div>
          <div className="LoginNav-menu_pages-icons">
            <div className="LoginNav-menu_pages-icons-click">
              <img src={message} alt="Message" />
              <div className="LoginNav-menu_font">Message</div>
            </div>
          </div>
          <div className="LoginNav-menu_pages-icons">
            <div className="LoginNav-menu_pages-icons-click">
              <img src={alarm} alt="alarm" />
              <div className="LoginNav-menu_font">Notifications</div>
            </div>
          </div>
          <div className="LoginNav-menu_pages-icons">
            <div className="LoginNav-menu_pages-icons-click">
              <div
                className="LoginNav-menu_pages-icons-img"
                onClick={() =>
                  navigate(
                    `/profile/${encodeURIComponent(
                      googleUserData?.fullName || normalUserData?.fullName
                        ? googleUserData.fullName || normalUserData.fullName
                        : null
                    )}`
                  )
                }
              >
                {googleUserData?.profilePicture ||
                normalUserData?.profilePicture ? (
                  <img
                    src={`data:image/jpeg;base64,${
                      googleUserData?.profilePicture ||
                      normalUserData.profilePicture
                    }`}
                    alt="profilePicture"
                    className="LoginNav-menu_pages-icons-picture"
                  />
                ) : (
                  <img
                    src={"/user.jpeg"}
                    alt="profilePicture"
                    className="LoginNav-menu_pages-icons-picture"
                  />
                )}
              </div>
              <div className="LoginNav-menu_font">My</div>
            </div>
          </div>
          <div className="verticla-loginLine-login"></div>
        </div>
        <div>
          <div className="LoginNav-menu_click">
            <div className="LoginNav-menu_click-icons">
              <div className="LoginNav-menu_click-icons-img">
                <img src={menu} art="menu" />
              </div>
              <div className="LoginNav-menu_click-font">Business</div>
            </div>
            <div className="LoginNav-menu_click-icons">
              <div className="LoginNav-menu_click-ADfont">AD</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginNav;
