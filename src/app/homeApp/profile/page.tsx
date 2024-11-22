"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image'
type ProfileType = {
  displayName: string;
  email: string;
  role: string;
  profilePicture:string,
  createdAt: string;
};

type ErrorType = string | null;

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [error, setError] = useState<ErrorType>(null);
  const router = useRouter(); // لإعادة التوجيه

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://linguistic-josephine-nooragniztion-eccb8a70.koyeb.app/api/profile",
          {
            method: "GET",
            credentials: "include", // إرسال ملفات تعريف الارتباط
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            console.warn("جلسة منتهية. سيتم إعادة التوجيه إلى صفحة تسجيل الدخول...");
            localStorage.removeItem("token");
            document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }
          throw new Error("Failed to fetch profile");
        }

        const data: ProfileType = await response.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, [router]);

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="text-gray-500 text-center mt-10">Loading...</div>;
  }


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">الملف الشخصي</h1>
        <Image src={profile.profilePicture} width={200} height={200} alt="" className="rounded-full w-[200px] h-[200px] m-auto"/>
        <div className="space-y-4">
          <div>
            <span className="font-semibold">الاسم:</span> {profile.displayName || "غير متوفر"}
          </div>
          <div>
            <span className="font-semibold">البريد الإلكتروني:</span> {profile.email || "غير متوفر"}
          </div>
          <div>
            <span className="font-semibold">الدور:</span> {profile.role || "غير متوفر"}
          </div>
          <div>
            <span className="font-semibold">تاريخ الإنشاء:</span>{" "}
            {new Date(profile.createdAt).toLocaleDateString() || "غير متوفر"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
