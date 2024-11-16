"use client"
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from 'react-redux';
import store from './store/store';


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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <title>Trav mate</title>
          <meta name="description" />
        </head>
        <body  className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
          {children}
        </body>
      </html>
    </Provider>
  );
}
