import { Quote } from "../components/Quote";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import axios from "axios";
import { BACKEND_URL } from "../config";
const SignUp = () => {
  const [name, setName] = useState("");
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
                label="Already have an account?"
                toText="SignIn"
                to="/signin"
              />
              <div className="pt-8">
                <InputBox
                  label="Name"
                  placeholder="Himanshu"
                  onChange={(e) => setName(e.target.value)}
                />
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
                  label="Sign Up"
                  onClick={async () => {
                    try {
                      const response = await axios.post(
                        `${BACKEND_URL}/api/v1/user/signup`,
                        {
                          name: name,
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
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
export default SignUp;
