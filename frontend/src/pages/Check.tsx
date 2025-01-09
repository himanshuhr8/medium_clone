import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface User {
  email: string;
  name: string;
}

export default function Check() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await axios.get<{
          user: User;
        }>(`${BACKEND_URL}/api/v1/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.user.email) {
          navigate("/blogs");
        } else {
          navigate("/signup");
        }
      } catch (err) {
        navigate("/signup");
      }
    };
    checkAuthorization();
  }, [navigate]);

  return null; // No UI is rendered for this component
}
