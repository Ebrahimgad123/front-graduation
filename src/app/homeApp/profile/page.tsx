"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// تعريف نوع المستخدم (User)
interface User {
  _id: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  email: string;
  emailStatus: boolean;
  phoneNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); // تحديد نوع الحالة

  useEffect(() => {
    // عند تحميل الصفحة، حاول جلب البيانات من الـ API
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://linguistic-josephine-nooragniztion-eccb8a70.koyeb.app/api/profile', { 
          method: 'GET', 
          credentials: 'include' 
        });

        if (response.ok) {
          const userData: User = await response.json(); // تحديد نوع البيانات المسترجعة
          setUser(userData);
        } else {
          // إذا كان هناك خطأ أو لم يتم العثور على المستخدم
          router.push('/login'); // إذا لم يكن المستخدم مسجلاً، إعادة توجيهه إلى صفحة الدخول
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        router.push('/login');
      }
    };

    fetchUserProfile();
  }, [router]);

  if (!user) return <p>جاري تحميل البيانات...</p>;

  return (
    <div className="profile-container">
      <h1>ملفك الشخصي</h1>
      <div className="profile-info">
        <img src={user.profilePicture} alt="Profile Picture" className="profile-image" />
        <div className="profile-details">
          <p><strong>الاسم:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>البريد الإلكتروني:</strong> {user.email}</p>
          <p><strong>رقم الهاتف:</strong> {user.phoneNumber || "غير محدد"}</p>
          <p><strong>تاريخ الانضمام:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <button onClick={handleLogout} className="logout-button">تسجيل الخروج</button>
    </div>
  );

  // وظيفة لتسجيل الخروج
  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'GET', credentials: 'include' });
    router.push('/login'); // إعادة توجيه المستخدم إلى صفحة الدخول بعد الخروج
  }
};

export default Profile;
