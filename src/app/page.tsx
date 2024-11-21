"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/secondpage");
    }, 3000);

    // تنظيف الـ timeout لتجنب تسرب الذاكرة
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
    </div>
  );
};

export default Welcome;
