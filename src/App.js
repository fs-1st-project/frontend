import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup/Signup";
import WelcomeSignin from "./pages/WelcomeSignin/WelcomeSignin";
import Signin from "./pages/Signin/Signin";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome-signin" element={<WelcomeSignin />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  );
  return <div className="App"></div>;
}

export default App;
