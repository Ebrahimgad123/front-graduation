import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // تشغيل الوضع الصارم في React
  swcMinify: true,       // تفعيل التصغير باستخدام SWC
  images: {
    domains: [
      "lh5.googleusercontent.com",
      "encrypted-tbn0.gstatic.com",
      "media.istockphoto.com",
      "www.egypttoday.com",
    ], // السماح بتحميل الصور من هذه النطاقات
  },
  i18n: {
    locales: ["en", "ar"], // اللغات المدعومة
    defaultLocale: "en",   // اللغة الافتراضية
  },
  output: "standalone",    
};

export default nextConfig;
