'use client';
import { Provider, useSelector } from 'react-redux';
import './globals.css';
import store from '../store/store';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../theme';
import { RootState } from '../store/store'; 
import { SessionProvider } from "next-auth/react";

// تحميل الخطوط المحلية


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
        <body className={`font-sans antialiased overflow-x-hidden `}>
          <Provider store={store}>
          <ThemeWrapper>
              {children}
          </ThemeWrapper>
          </Provider>
        </body>
      </html>
  );
}
