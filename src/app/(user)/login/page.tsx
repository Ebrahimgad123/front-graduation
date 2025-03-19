"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./login.css"
interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);

    try {
      const response = await fetch("https://backend10-henna.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const result = await response.json();
      localStorage.setItem("token", result.token);
      toast.success("Login successful!", { position: "top-right" });

      reset(); 
      router.push("/getlocation");

    } catch (error) {
      toast.error("Invalid email or password", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  // دالة تسجيل الدخول عبر Google
  const handleGoogleAuth = async () => {
    try {
      router.push("https://backend10-henna.vercel.app/api/auth/google");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-cotent">
      <ToastContainer />
      
      <div className="login-content">
        <Image
          width={200}
          height={200}
          src="/Images/logoTrave.png"
          alt="Logo"
          className="login-logo"
          priority
        />
        <h1 className="login-title">Sign In</h1>

        <form onSubmit={handleSubmit(handleLogin)} className="input-fields">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            {...register("email")}
          />
          {errors.email && <p className="error-message text-red-600 cairo">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            {...register("password")}
          />
          {errors.password && <p className="error-message text-red-600 cairo">{errors.password.message}</p>}

          <button type="submit" className="login-submit-button" disabled={loading}>
            {loading ? "check..." : "Sign In"}
          </button>
        </form>

        <div className="Or_Div text-white">________________or________________</div>

        <div className="social-login">
          <button onClick={handleGoogleAuth} className="social-button">
            <Image width={200} height={200} src="/Images/google.svg" alt="Google" className="social-icon" />
          </button>
          <button className="social-button">
            <Image width={200} height={200} src="/Images/facebook.svg" alt="Facebook" className="social-icon" />
          </button>
          <button className="social-button">
            <Image width={200} height={200} src="/Images/apple.svg" alt="Apple" className="social-icon white-icon" />
          </button>
        </div>

        <div className="text-white">
          Don’t have an account? <Link className="link-sign-up" href="/register">Sign Up</Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
