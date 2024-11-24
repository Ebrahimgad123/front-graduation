import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // تشغيل الوضع الصارم في React
  images: {
    domains: [
      "lh5.googleusercontent.com",
      "encrypted-tbn0.gstatic.com",
      "media.istockphoto.com",
      "www.egypttoday.com",
    ], // السماح بتحميل الصور من هذه النطاقات
  },
 
  output: "standalone",    
};

export default nextConfig;
