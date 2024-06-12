import React from "react";
import { Link } from "react-router-dom";
import writing from "./writing.svg";
import person from "./person.svg";
import onlineclass from "./onlineclass.svg";
import Recruitmentnotice from "./Recruitmentnotice.svg";
import game from "./game.svg";
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
              <img
                src={person}
                alt="person"
                style={{ width: "22.5%", height: "10%", marginBottom: "4px" }}
              />
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
              <img
                src={Recruitmentnotice}
                alt="Recruitment notice"
                style={{ width: "25%", height: "auto", marginBottom: "6px" }}
              />
              <div className="NavBar-menu_font">Recruitment</div>
              <div className="NavBar-menu_font">notice</div>
            </div>
          </div>
          <div className="NavBar-menu_pages-icons">
            <div className="NavBar-menu_pages-icons-click">
              <img
                src={game}
                alt="game"
                style={{ width: "26.25%", height: "auto", marginBottom: "4px" }}
              />
              <div className="NavBar-menu_font">game</div>
            </div>
          </div>
        </div>
        <div className="NavBar-menu_click">
          <div className="line"> </div>
          <a className="NavBar-menu_click-box" href="/signup">
            <div className="NavBar-menu_click-box1">join the membership</div>
          </a>

          <a className="NavBar-menu_click-box" href="/login">
            <div className="NavBar-menu_click-box2">log in</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
