"use client"
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://linguistic-josephine-nooragniztion-eccb8a70.koyeb.app/api/profile', {
      method: 'GET',
      headers: {
        'Cookie': 'connect.sid=s%3AeHr5mLV3XaijnRBKi6DhMSZihd8-Lwke.WxqrYuhwSp4j%2BD97Lrz36%2Bf8xr15iTWeaRjoBncUJdw;', // ضع الكوكيز هنا
      },
      credentials: 'include' // تأكد من إرسال الكوكيز عبر النطاقات
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return response.json();
    })
    .then(data => {
      setProfile(data);
    })
    .catch(err => {
      setError(err.message);
    });
  }, []); // سيتم تنفيذ الطلب مرة واحدة عند تحميل الصفحة

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
};

export default Profile;
