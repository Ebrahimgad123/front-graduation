"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type ProfileType = {
  displayName: string;
  email: string;
  profilePicture: string;
  createdAt:string;
  updatedAt:string;
};

type ErrorType = string | null;

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [error, setError] = useState<ErrorType>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://linguistic-josephine-nooragniztion-eccb8a70.koyeb.app/api/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
  
        if (!response.ok) {
          if (response.status === 401) {
            console.warn("جلسة منتهية. سيتم إعادة التوجيه إلى صفحة تسجيل الدخول...");
            localStorage.removeItem("token");
            document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            // توجيه المستخدم إلى صفحة تسجيل الدخول
            router.push("/login");
          }
          throw new Error("فشل في جلب البيانات");
        }
  
        const data: ProfileType = await response.json();
  
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
  
    fetchProfile();
  }, []);
  

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="text-gray-500 text-center mt-10">Loading...</div>;
  }



  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center"> Personal profile</h1>
        {/* التأكد من أن الرابط صحيح ويعمل مع Image في Next.js */}
        <Image
          src={profile.profilePicture}
          width={200}
          height={200}
          alt="Profile Picture"
          className="rounded-full w-[200px] h-[200px] m-auto"
          unoptimized // لتجاوز التحسين إذا كانت الصورة لا تعمل مع Next.js
        />
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Name:</span> {profile.displayName || "غير متوفر"}
          </div>
          <div>
            <span className="font-semibold"> Email:</span> {profile.email || "غير متوفر"}
          </div>
          <div>
            <span className="font-semibold"> createdAt</span> {profile.createdAt || "غير متوفر"}
          </div>
          <div>
            <span className="font-semibold"> updatedAt</span> {profile.updatedAt || "غير متوفر"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
