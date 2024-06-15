import React from "react";
import { Link } from "react-router-dom";
import writing from "./svg/writing.svg";
import person from "./svg/person.svg";
import onlineclass from "./svg/onlineclass.svg";
import Recruitmentnotice from "./svg/Recruitmentnotice.svg";
import game from "./svg/game.svg";

import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="NavBar">
      <div className="NavBar-logo">
        <img src="LinkedIn-logo.png" alt="LinkedIn-logo" />
      </div>
      <div className="NavBar-menu">
        <div className="NavBar-menu_pages">
          <div className="NavBar-menu_pages-icons">
            <div className="NavBar-menu_pages-icons-click">
              <img src={writing} alt="writing" />
              <div className="NavBar-menu_font">writing</div>
            </div>
          </div>
          <div className="NavBar-menu_pages-icons">
            <div className="NavBar-menu_pages-icons-click">
              <img src={person} alt="person" />
              <div className="NavBar-menu_font">person</div>
            </div>
          </div>
          <div className="NavBar-menu_pages-icons">
            <div className="NavBar-menu_pages-icons-click">
              <img src={onlineclass} alt="online class" />
              <div className="NavBar-menu_font">online class</div>
            </div>
          </div>
          <div className="NavBar-menu_pages-icons">
            <div className="NavBar-menu_pages-icons-click">
              <img src={Recruitmentnotice} alt="Recruitment notice" />
              <div className="NavBar-menu_font">Recruitment</div>
              <div className="NavBar-menu_font">notice</div>
            </div>
          </div>
          <div className="NavBar-menu_pages-icons">
            <div className="NavBar-menu_pages-icons-click">
              <img src={game} alt="game" />
              <div className="NavBar-menu_font">game</div>
            </div>
          </div>
        </div>
        <div className="NavBar-menu_click">
          <div class="verticla-line"></div>
          <div className="joinnow">
            <Link to="/signup">Join now</Link>
          </div>
          <div className="welcom-signin">
            <Link to="/welcome-signin">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
