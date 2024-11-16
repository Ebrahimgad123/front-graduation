"use client"
import React from 'react';
import './login.css'; // تأكد من إضافة ملف CSS الخاص بتنسيق الصفحة
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Login = () => {
  const router=useRouter()
  const handleLogin = (provider: string) => {
    // هنا يمكنك إضافة المنطق الخاص بتسجيل الدخول باستخدام الموفر المختار
    console.log(`تسجيل الدخول باستخدام ${provider}`);
    router.push('/getlocation')
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <img src="/Images/logoTrave.png" alt="Logo" className="login-logo" />
        <h1 className="login-title">log in</h1>
        
        <div className="input-fields">
          <input type="email" placeholder="Email" className="login-input" />
          <input type="password" placeholder="password" className="login-input" />
        </div>

        <button className="login-submit-button" onClick={()=>handleLogin("jnj")}>SignIn</button>
         <div className='Or_Div'>________________or________________</div>
        <div className="social-login">
          <button className="social-button" onClick={() => handleLogin('Google')}>
            <img src="/Images/google.svg" alt="Google" className="social-icon" />
          </button>
          <button className="social-button" onClick={() => handleLogin('Facebook')}>
            <img src="/Images/facebook.svg" alt="Facebook" className="social-icon" />
          </button>
          <button className="social-button" onClick={() => handleLogin('Apple')}>
            <img src="/Images/apple.svg" alt="Apple" className="social-icon" />
          </button>
        </div>
        <div>
            <p>Don’t have Account <Link className='link-sign-up' href="/register">SignUp</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Login;