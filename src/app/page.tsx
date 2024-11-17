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
        <h1 className="mt-4 text-black text-xl font-semibold text-center shadow-lg p-2 rounded-lg hover:bg-gray-200 transition-colors duration-300">
          Log as
        </h1>

      </div>
      <Link href="/login" className="bg-[#F98C53]  px-20 py-2 rounded-lg mb-2 mt-2">
       Tourist
      </Link>
      <Link href="" className="bg-[#F98C53]  px-16 py-2 rounded-lg">
       Tour Guide
      </Link>
    </div>
  );
};

export default Welcome;
