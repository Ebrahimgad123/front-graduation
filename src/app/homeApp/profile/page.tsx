"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// تعريف نوع المستخدم (User)
interface User {
  displayName: string;
  email: string;
  profilePicture: string;
}

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); // حالة المستخدم

  useEffect(() => {
    // حاول جلب بيانات المستخدم فقط إذا كان المستخدم مسجلاً الدخول
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://linguistic-josephine-nooragniztion-eccb8a70.koyeb.app/api/profile', { 
          method: 'GET', 
          credentials: 'include' // إرسال الـ credentials مع الطلب لضمان إرسال الـ cookies
        });

        if (response.ok) {
          const userData: User = await response.json(); // تحديد نوع البيانات المسترجعة
          setUser(userData);
        } else if (response.status === 401) {
          console.error("غير مسموح بالدخول، يرجى تسجيل الدخول.");
          router.push('/login'); // إعادة التوجيه إلى صفحة الدخول إذا كانت المصادقة غير صحيحة
        } else if (response.status === 500) {
          console.error("خطأ في الخادم. يرجى المحاولة لاحقًا.");
        } else {
          console.error("فشل جلب البيانات: غير متاح.");
        }
      } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
        router.push('/login'); // في حالة حدوث خطأ، إعادة التوجيه إلى صفحة الدخول
      }
    };

    fetchUserProfile(); // استدعاء دالة جلب البيانات
  }, [router]);

  // عرض رسالة أثناء تحميل البيانات
  if (!user) return <p>جاري تحميل البيانات...</p>;

  return (
    <div className="profile-container">
      <h1>ملفك الشخصي</h1>
      <div className="profile-info">
        <img src={user.profilePicture} alt="Profile Picture" className="profile-image" />
        <div className="profile-details">
          <p><strong>الاسم:</strong> {user.displayName}</p>
          <p><strong>البريد الإلكتروني:</strong> {user.email}</p>
        </div>
      </div>
      <button onClick={handleLogout} className="logout-button">تسجيل الخروج</button>
    </div>
  );

  // وظيفة لتسجيل الخروج
  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'GET', credentials: 'include' }); // إرسال طلب لتسجيل الخروج
    router.push('/login'); // إعادة توجيه المستخدم إلى صفحة الدخول بعد الخروج
  }
};

export default Profile;
