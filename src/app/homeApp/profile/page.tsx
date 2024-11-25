"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type ProfileType = {
  displayName: string;
  email: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
};

type ErrorType = string | null;

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [error, setError] = useState<ErrorType>(null);
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
            credentials: "include", // إرسال الكوكيز مع الطلب
          }
        );

        if (!response.ok) {
          throw new Error("فشل في جلب بيانات الملف الشخصي");
        }

        const data: ProfileType = await response.json();
        console.log("ProfileData===========", data);
        setProfile(data);
      } catch (err: any) {
        setError(err?.message || "حدث خطأ غير متوقع");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="text-gray-500 text-center mt-10">جاري التحميل...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">الملف الشخصي</h1>
        {/* التأكد من أن الرابط صحيح ويعمل مع Image في Next.js */}
        <Image
          src={profile.profilePicture || "/default-profile.jpg"} // صورة افتراضية في حال كانت الصورة غير موجودة
          width={200}
          height={200}
          alt="Profile Picture"
          className="rounded-full w-[200px] h-[200px] m-auto"
          unoptimized // لتجاوز التحسين إذا كانت الصورة لا تعمل مع Next.js
        />
        <div className="space-y-4">
          <div>
            <span className="font-semibold">الاسم:</span> {profile.displayName || "غير متوفر"}
          </div>
          <div>
            <span className="font-semibold">البريد الإلكتروني:</span> {profile.email || "غير متوفر"}
          </div>
          <div>
            <span className="font-semibold">تاريخ الإنشاء:</span> {formatDate(profile.createdAt) || "غير متوفر"}
          </div>
          <div>
            <span className="font-semibold">تاريخ التحديث:</span> {formatDate(profile.updatedAt) || "غير متوفر"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
