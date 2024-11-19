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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://linguistic-josephine-nooragniztion-eccb8a70.koyeb.app/api/profile', { 
          method: 'GET', 
          credentials: 'include' 
        });

        if (response.ok) {
          const userData: User = await response.json(); 
          setUser(userData);
        } else if (response.status === 401) {
          setErrorMessage("غير مسموح بالدخول. يرجى تسجيل الدخول.");
          router.push('/login');
        } else if (response.status === 500) {
          setErrorMessage("خطأ في الخادم. يرجى المحاولة لاحقًا.");
        } else {
          setErrorMessage("فشل في جلب البيانات.");
        }
      } catch (error) {
        setErrorMessage("حدث خطأ أثناء جلب البيانات.");
        router.push('/login');
      }
    };

    fetchUserProfile();
  }, [router]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

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
    await fetch('/api/auth/logout', { method: 'GET', credentials: 'include' }); 
    router.push('/login');
  }
};

export default Profile;
