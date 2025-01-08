import { Quote } from "../components/Quote";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <div className="flex justify-center flex-col h-screen">
          <div className="flex justify-center">
            <div>
              <Heading
                label="Don't have an account?"
                toText="SignUp"
                to="/signup"
              />
              <div className="pt-8">
                <InputBox
                  label="Username"
                  placeholder="himanshu@gmail.com"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputBox
                  label="Password"
                  placeholder="12345678"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  label="SignIn"
                  onClick={async () => {
                    try {
                      const response = await axios.post(
                        `${BACKEND_URL}/api/v1/user/signin`,
                        {
                          email: email,
                          password: password,
                        }
                      );
                      localStorage.setItem("token", response.data.token);
                      navigate("/blogs");
                    } catch (e) {
                      alert("Internal Server Error");
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="invisible lg:visible">
        <Quote />
      </div>
    </div>
  );
};
export default SignIn;
