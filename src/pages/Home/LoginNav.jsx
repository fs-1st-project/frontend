import React from "react";
import home from "../../component/home.svg";
import person from "../../component/person.svg";
import Recruitmentnotice from "../../component/Recruitmentnotice.svg";
import alarm from "../../component/alarm.svg";
import message from "../../component/message.svg";
import menu from "../../component/menu.svg";
import logo from "../../component/LinkedIn_login_logo.png";

import "./LoginNav.css";

const LoginNav = () => {
  return (
    <div className="LoginNav">
      <div className="LoginNav-menu_left">
        <div className="LoginNav-logo">
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
              <div className="LoginNav-menu_font">Writing</div>
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
          <div classname="LoginNav-menu_pages-icons">
            <div className="">{/* user information */}</div>
          </div>
          <div class="verticla-loginLine-login"></div>
        </div>
        <div>
          <div className="LoginNav-menu_click">
            <div class="LoginNav-menu_click-icons">
              <img src={menu} art="menu" />
              <div class="LoginNav-menu_click-font">Business</div>
            </div>
            <div class="LoginNav-menu_click-icons">
              <img src={menu} art="menu" />
              <div class="LoginNav-menu_click-font">aaaa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginNav;
