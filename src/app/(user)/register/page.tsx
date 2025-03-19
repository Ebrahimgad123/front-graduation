"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../login/login.css";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  // ✅ التحقق من قوة كلمة المرور
  const isStrongPassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast.error("please fill in all fields");
      setLoading(false);
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("please enter a valid email");
      setLoading(false);
      return;
    }
    if (!isStrongPassword(password)) {
      toast.error("password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://backend10-henna.vercel.app/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("token", data.token);
      toast.success("ٌRegistered successfully 🎉");
      setTimeout(() => {
        router.push("/login");
      }, 2000); 
    } catch (error: any) {
      toast.error(error.message || "some error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container text-white">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar /> 
      
      <div className="login-cotent">
        <div className="login-content">
          <img src="/Images/logoTrave.png" alt="Logo" className="login-logo" />
          <h1 className="login-title">Sign Up</h1>

          <form onSubmit={handleSubmit} className="input-fields">
            <input
              type="text"
              placeholder="Name"
              className="login-input text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="login-input text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password "
              className="login-input text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="login-submit-button" disabled={loading}>
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>

          <div className="Or_Div">________________or________________</div>

          <div className="social-login">
            <button className="social-button">
              <img src="/Images/google.svg" alt="Google" className="social-icon" />
            </button>
            <button className="social-button">
              <img src="/Images/facebook.svg" alt="Facebook" className="social-icon" />
            </button>
            <button className="social-button">
              <img src="/Images/apple.svg" alt="Apple" className="social-icon white-icon" />
            </button>
          </div>

          <div>
            <p>Have an account? <Link className="link-sign-up" href="/login">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
