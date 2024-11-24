"use client"
import React, { useState } from 'react';
import '../login/login.css'; // تأكد من إضافة ملف CSS الخاص بتنسيق الصفحة
import Link from 'next/link';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (provider: string) => {
    // هنا يمكنك إضافة المنطق الخاص بتسجيل الدخول باستخدام الموفر المختار
    console.log(`تسجيل الدخول باستخدام ${provider}`);
  };

  const handleSubmit = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("يرجى ملء جميع الحقول");
      return;
    }
    if (password !== confirmPassword) {
      setError("كلمة المرور غير متطابقة");
      return;
    }
    // من هنا يمكنك إضافة منطق إرسال البيانات إلى السيرفر لتسجيل الحساب
    console.log("تم إرسال البيانات لتسجيل الحساب");
    setError(null); // إعادة تعيين الخطأ بعد التحقق
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <img src="/Images/logoTrave.png" alt="Logo" className="login-logo" />
        <h1 className="login-title">Sign Up</h1>
        
        <div className="input-fields">
          <input 
            type="text" 
            placeholder="Name" 
            className="login-input" 
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />
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
          <input 
            type="password" 
            placeholder="Confirm Password" 
            className="login-input" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        
        <button className="login-submit-button" onClick={handleSubmit}>Sign Up</button>
        
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
          <div>Have an account? <Link className='link-sign-up' href="/login">Sign In</Link></div>
        </div> 
      </div>
    </div>
  );
};

export default Register;
