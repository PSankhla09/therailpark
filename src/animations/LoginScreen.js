import React from "react";
import "./LoginScreen.css";
import { GoogleLogin } from "@react-oauth/google";

const LoginScreen = ({ onSuccess }) => {
  console.log("LoginScreen rendered");

  const words = ["Welcome", "to", "the", "Rail", "Park"];

  return (
    <div className="login-container">
      <div className="login-title">
        {words.map((word, index) => (
          <span
            className="bounce-word"
            style={{ animationDelay: `${index * 0.2}s` }}
            key={index}
          >
            {word}
          </span>
        ))}
      </div>

      <div className="login-button-wrapper">
        <div className="animated-hover">
          <GoogleLogin
            onSuccess={onSuccess}
            onError={() => console.log("Login Failed")}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
