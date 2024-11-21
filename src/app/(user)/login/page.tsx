"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css"; // تأكد من إضافة ملف CSS الخاص بتنسيق الصفحة
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState(null); // لحفظ بيانات المستخدم
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // حاول جلب بيانات المستخدم بعد التوجيه عبر Google
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://linguistic-josephine-nooragniztion-eccb8a70.koyeb.app/api/profile", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
      
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          console.log(userData)

        } else {
          console.error("لم يتم العثور على بيانات المستخدم.");
        }
      } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
      } finally {
        setLoading(false); // إنهاء التحميل
      }
    };

    fetchUserData();
  }, []);



  return (
    <div className="login-container">
      <div className="login-content">
        <img src="/Images/logoTrave.png" alt="Logo" className="login-logo" />
        <h1 className="login-title">log in</h1>

        <div className="input-fields">
          <input type="email" placeholder="Email" className="login-input" />
          <input type="password" placeholder="password" className="login-input" />
        </div>

        <button className="login-submit-button">SignIn</button>
        <div className="Or_Div">________________or________________</div>
        <div className="social-login">
          <button
            onClick={() => {
              router.push("https://linguistic-josephine-nooragniztion-eccb8a70.koyeb.app/api/auth/google");
            }}
            className="social-button"
          >
            <img src="/Images/google.svg" alt="Google" className="social-icon" />
          </button>
          <button className="social-button">
            <img src="/Images/facebook.svg" alt="Facebook" className="social-icon" />
          </button>
          <button className="social-button">
            <img src="/Images/apple.svg" alt="Apple" className="social-icon" />
          </button>
        </div>
        <div>
          <p>
            Don’t have Account <Link className="link-sign-up" href="/register">SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
