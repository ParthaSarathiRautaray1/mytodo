import React, { useState } from "react";
import { Input } from "../shadcncomponent/ui/input";
import { Button } from "../shadcncomponent/ui/button";
import axios from "axios";
import { useToast } from "../shadcncomponent/ui/use-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value }); //updating user state based on the input field changes
  };

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);

      if (res.data.success) {
        toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
          className: "success",
        });

        navigate("/");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast({
          title: "Error",
          description:
            error.response?.data?.message || "An error occurred during login",
          variant: "destructive",
        });
      }
    } finally {
      setUser({
        email: "",
        password: "",
      });
    }
  };

  const registerHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        {
          fullName: user.fullName,
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
          className: "success",
        });
        setIsLogin(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast({
          title: "Error",
          description:
            error.response?.data?.message ||
            "An error occurred during registration",
          variant: "destructive",
        });
      }
    } finally {
      setUser({
        fullName: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="m-10 p-10 w-fit items-center bg-gray-700">
        <h1 className="text-center text-4xl p-2 mb-5">{isLogin ? "Login":"Register"}</h1>
        <div className="flex flex-col gap-5 items-center ">
        {!isLogin && (
            <Input
              className="ring-0 focus-visible:ring-0"
              value={user.fullName}
              name="fullName"
              onChange={changeHandler}
              type="text"
              placeholder="fullName"
            />
          )}
          <Input
            className="ring-0 focus-visible:ring-0"
            value={user.email}
            name="email"
            onChange={changeHandler}
            type="email"
            placeholder="Email"
          />
          <Input
            className="ring-0 focus-visible:ring-0"
            value={user.password}
            name="password"
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
          <Button onClick={isLogin ? loginHandler: registerHandler}>{isLogin ? "Login" : "Register"}</Button>
          <p className="text-sm cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
