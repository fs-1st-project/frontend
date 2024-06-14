import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FirstPage from "./pages/FirstPage/FirstPage";
import Signup from "./pages/Signup/Signup";
import WelcomeSignin from "./pages/WelcomeSignin/WelcomeSignin";
import Signin from "./pages/Signin/Signin";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome-signin" element={<WelcomeSignin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
