'use client';
import { Provider, useSelector } from 'react-redux';
import localFont from 'next/font/local';
import './globals.css';
import store from './store/store';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme'; // تأكد من وجود هذه الملفات
import { RootState } from './store/store'; // استيراد RootState
import { SessionProvider } from "next-auth/react";

// تحميل الخطوط المحلية
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  // تحديد النوع للـ state باستخدام RootState
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // إضافة نوع children هنا
}) {
  return (
    <html lang="en">
        <head>
          <title>Trav mate</title>
          <meta name="description" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
          {/* تغليف المحتوى بـ ThemeWrapper لضمان تطبيق الـ Dark Mode */}
          <Provider store={store}>
          <ThemeWrapper>
              {children}
          </ThemeWrapper>
          </Provider>
        </body>
      </html>
  );
}
