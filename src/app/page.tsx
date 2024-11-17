import React, { useEffect } from 'react';
import Link from 'next/link';
 // تأكد من استيراد useRouter من next/navigation

const Welcome = () => {
 

  return (
    <div className="welcome-container">
      <div>
        <h1 className="welcome-title">Trav Mate</h1>
      </div>
      <div className="welcome-content">
        <img src="/Images/logoTrave.png" alt="Logo" className="welcome-logo" />
      </div>
      <Link href="/login" className="bg-green-700 px-9 py-2 rounded-lg mb-2 mt-2">
       Tourist
      </Link>
      <Link href="" className="bg-green-700 px-5 py-2 rounded-lg">
       Tour Guide
      </Link>
    </div>
  );
};

export default Welcome;
