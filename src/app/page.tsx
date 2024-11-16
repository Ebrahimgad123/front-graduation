"use client"; // هذا يحدد أن المكون سيتم تنفيذه على جانب العميل
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // تأكد من استيراد useRouter من next/navigation

const Welcome = () => {
  const router = useRouter();

  useEffect(() => {
    // توجيه المستخدم إلى صفحة /login بعد 3 ثواني
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);

    // تنظيف المؤقت عند إزالة المكون لتجنب مشاكل الذاكرة
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="welcome-container">
      <div>
        <h1 className="welcome-title">Trav Mate</h1>
      </div>
      <div className="welcome-content">
        <img src="/Images/logoTrave.png" alt="Logo" className="welcome-logo" />
      </div>
      <Link href="/login" className="link-to-login">
        Let’s start
      </Link>
    </div>
  );
};

export default Welcome;
