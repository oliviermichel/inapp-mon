import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InApp Monitoring",
  description: "Created with NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="header">
          <nav className="nav">
            <Link href="/">Homepage</Link>
            <Link href="/login">Login</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/explorer">Explorer Root</Link>
          </nav>
        </header>
        {children}
        <footer className="footer"></footer>
      </body>
    </html>
  );
}
