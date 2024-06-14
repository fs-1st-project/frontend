import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebaseConfig"; // Firebase auth 객체 가져오기

const useProfileData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;

        if (currentUser) {
          const idToken = await currentUser.getIdToken(true);
          const uid = currentUser.uid;

          const response = await axios.get(
            `http://localhost:8080/api/users/${uid}/profile`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );

          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, loading };
};

export default useProfileData;
