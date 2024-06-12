import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";
import Home from "./pages/Home";
import Signup from "./pages/Signup/Signup";

// Firebase 프로젝트 설정에서 가져온 구성 객체

const firebaseConfig = {};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const loginWithGoogle = async (e) => {
    e.preventDefault(); // 기본 동작 막기

    const provider = new GoogleAuthProvider();

    try {
      // Firebase로 Google 로그인
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // id 토큰을 백엔드 API로 전달하여 커스텀 토큰을 요청
      const response = await axios.post(
        "http://localhost:8080/firebase/auth/google",
        { idToken }
      );
      const customToken = response.data;

      // 커스텀 토큰으로 firebase에 로그인
      await auth.signInWithCustomToken(customToken);

      console.log("User authenticated successfully");
    } catch (error) {
      console.error("Error during authentication", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <button onClick={loginWithGoogle}>Google Login</button>
      </div>
    </Router>
  );
}

export default App;
