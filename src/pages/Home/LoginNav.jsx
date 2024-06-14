import React from "react";
import home from "../../component/home.svg";
import person from "../../component/person.svg";
import Recruitmentnotice from "../../component/Recruitmentnotice.svg";
import alarm from "../../component/alarm.svg";
import message from "../../component/message.svg";
import "./Loginnav.css";

const LoginNav = () => {
  return (
    <div className="LoginNav">
      <div className="LoginNav-logo">
        <img src="LinkedIn_Login_icon" alt="LinkedIn_login_logo" />
      </div>
      <div>
        <input type="text" placeholder="Search" />
      </div>
      <div className="LoginNav-menu">
        <div className="LoginNav-menu_pages">
          <div className="LoginNav-menu_pages-icons">
            <div className="LoginNav-menu_pages-icons-click">
              <img src={home} alt="home" />
              <div className="LoginNav-menu_font">writing</div>
            </div>
          </div>
          <div className="LoginNav-menu_pages-icons">
            <div className="LoginNav-menu_pages-icons-click">
              <img src={person} alt="My network" />
              <div className="LoginNav-menu_font">My Network</div>
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
              <div className="LoginNav-menu_font">message</div>
            </div>
          </div>
          <div className="LoginNav-menu_pages-icons">
            <div className="LoginNav-menu_pages-icons-click">
              <img src={alarm} alt="alarm" />
              <div className="LoginNav-menu_font">Notifications</div>
            </div>
          </div>
          <div classname="LoginNav-menu_pages-icons">
            <div className="">{/* user information */}</div>
          </div>
        </div>
        <div>
          <div className="LoginNav-menu_click">
            <div class="verticla-loginLine"></div>
            <div class="LoginNav-menu_click-icons">
              <img src="" art="" />
              <div class="LoginNav-menu_click-">Business</div>
            </div>
            <div class="LoginNav-menu_click-icons">
              <img src="" art="" />
              <div class=""></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginNav;
