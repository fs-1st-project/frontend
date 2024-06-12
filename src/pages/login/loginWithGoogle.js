import axios from "axios";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithCustomToken,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

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
    await signInWithCustomToken(auth, customToken);
    console.log("User authenticated successfully");
  } catch (error) {
    console.error("Error during authentication", error);
  }
};

export default loginWithGoogle;
