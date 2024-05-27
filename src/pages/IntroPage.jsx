import React, { useState } from "react";
import "../App.css";
import api from "../utils/api";
import { useNavigate, Navigate } from "react-router-dom";

import IntroComp from "../components/IntroComp";
import LoginComp from "../components/LoginComp";
import RegisterComp from "../components/RegisterComp";

const IntroPage = ({ user, setUser }) => {
  const [currentComponent, setCurrentComponent] = useState("IntroComp");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  let ComponentToRender;
  switch (currentComponent) {
    case "LoginComp":
      ComponentToRender = LoginComp;
      break;
    case "RegisterComp":
      ComponentToRender = RegisterComp;
      break;
    default:
      ComponentToRender = IntroComp;
  }
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const checkUser = async (emailValue) => {
    try {
      if (!validateEmail(emailValue)) {
        throw new Error("유효한 이메일 형식이 아닙니다.");
      }

      const response = await api.post("/user", { email: emailValue });
      setEmail(emailValue);
      setError("");

      if (response.data.info === 400) {
        setCurrentComponent("RegisterComp");
        return;
      }
      setName(response.data.user.name);
      setCurrentComponent("LoginComp");
      if (response.status === 200) {
        console.log("성공");
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      setError(err.error || err.message || "Unknown error");
      console.log("error ", err);
    }
  };

  const registerUser = async (nameValue, passwordValue) => {
    try {
      console.log(email, nameValue, passwordValue);
      const response = await api.post("/user/register", {
        email: email,
        name: nameValue,
        password: passwordValue,
      });
      if (response.status === 200) {
        console.log("성공");
        console.log(response);
        sessionStorage.setItem("token", response.data.token);
        api.defaults.headers["authorization"] = "Bearer " + response.data.token;
        setError("");

        const user = {
          name: nameValue,
          email,
          password: passwordValue,
        };
        setUser(user);
        navigate("/");
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      setError(err.error || err.message || "Unknown error");
    }
  };

  const loginUser = async (passwordValue) => {
    try {
      const response = await api.post("/user/login", {
        email: email,
        password: passwordValue,
      });
      if (response.status === 200) {
        console.log("성공");
        sessionStorage.setItem("token", response.data.token);
        api.defaults.headers["authorization"] = "Bearer " + response.data.token;
        setError("");

        const user = {
          name,
          email,
          password: passwordValue,
        };
        setUser(user);
        navigate("/");
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      setError(err.error || err.message || "Unknown error");
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  const backToIntro = () => {
    console.log("hello");
    setCurrentComponent("IntroComp");
  };

  return (
    <div className="common-area">
      <ComponentToRender
        checkUser={checkUser}
        registerUser={registerUser}
        loginUser={loginUser}
        name={name}
        error={error}
        backToIntro={backToIntro}
      />
    </div>
  );
};

export default IntroPage;
