"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleGoogleAuth = async () => {
    try {
      router.push(
        "https://backend10-henna.vercel.app/api/auth/google"
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <div className="login-container">
       <div className="login-cotent">
       <div className="login-content">
        <Image
          width={200}
          height={200}
          src="/Images/logoTrave.png"
          alt="Logo"
          className="login-logo"
          priority
        />
        <h1 className="login-title">SignIn</h1>

        <div className="input-fields">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-submit-button">SignIn</button>
        <div className="Or_Div text-white">________________or________________</div>
        <div className="social-login">
          <button onClick={handleGoogleAuth} className="social-button">
            <Image
              width={200}
              height={200}
              src="/Images/google.svg"
              alt="Google"
              className="social-icon"
            />
          </button>
          <button className="social-button">
            <Image
              width={200}
              height={200}
              src="/Images/facebook.svg"
              alt="Facebook"
              className="social-icon"
            />
          </button>
          <button className="social-button">
            <Image
              width={200}
              height={200}
              src="/Images/apple.svg"
              alt="Apple"
              className="social-icon"
            />
          </button>
        </div>
        <div>
          <div className="text-white">
            Don’t have Account{" "}
            <Link className="link-sign-up" href="/register">
              SignUp
            </Link>
          </div>
        </div>
      </div>
       </div>
    </div>
  );
};

export default Login;
