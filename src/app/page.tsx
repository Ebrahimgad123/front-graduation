"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Welcome = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/secondpage");
    }, 300);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="welcome-container">
      <div>
        <h1 className="welcome-title">Trav Mate</h1>
      </div>
      <div className="welcome-content">
        <Image width={200} height={200}  priority={true} src="/Images/logoTrave.png" alt="Logo" className="welcome-logo" />
      </div>
    </div>
  );
};

export default Welcome;
