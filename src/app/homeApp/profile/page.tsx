"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // استخدام axios لاستدعاء الـ API
        const response = await axios.get(
          "https://linguistic-josephine-nooragniztion-eccb8a70.koyeb.app/api/profile",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // تأكد من إرسال الكوكيز مع الطلب
          }
        );

        // بيانات الملف الشخصي
        setProfile(response.data);
      } catch (err: any) {
        // التعامل مع الأخطاء
        setError(err.response?.data?.message || "حدث خطأ غير متوقع");
        console.log("خطأ في جلب البيانات:", err);
      }
    };

    fetchProfile();
  }, []);

  // عرض رسالة خطأ إذا كان هناك خطأ في جلب البيانات
  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  // عرض رسالة تحميل إذا كانت البيانات غير موجودة بعد
  if (!profile) {
    return <div className="text-gray-500 text-center mt-10">Loading...</div>;
  }
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/logout', {
        method: 'POST',
        credentials: 'include', 
      });
  
      if (!response.ok) {
        throw new Error('Failed to logout');
      }
  
      const data = await response.json();
      console.log(data.message); 
    } catch (error) {
      console.error('Error logging out:'); // عرض الخطأ في حال حدوثه
    }
  };
  

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
         
        />
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Name:</span> {profile.displayName || "غير متوفر"}
          </div>
          <div>
            <span className="font-semibold"> Email:</span> {profile.email || "غير متوفر"}
          </div>
          <div>
            <span className="font-semibold"> Created At:</span> {profile.createdAt || "غير متوفر"}
          </div>
          <div>
            <span className="font-semibold"> Updated At:</span> {profile.updatedAt || "غير متوفر"}
          </div>
          <button onClick={handleLogout} className="btn bg-red-500 p-2 rounded text-white">logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
