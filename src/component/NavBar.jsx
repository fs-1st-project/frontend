import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Link to="/signup">Join Now</Link>
      <Link to="/welcome-signin">Sign in</Link>
    </div>
  );
};

export default NavBar;
