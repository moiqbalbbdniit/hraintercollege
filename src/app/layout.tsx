import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LayoutClient from "@/components/LayoutClient";
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from "@/context/AuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hra Inter College",
  description: "Official Website of Hra Inter College Utraula",
  icons: {
    icon: "/public/favicon.ico", 
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <AuthProvider>
      <body className={inter.className}>
        <LayoutClient>
          <Navbar />
          <Toaster richColors position="top-right"/>
          {children}
          <Footer />
        </LayoutClient>
      </body>
      </AuthProvider>
    </html>
  );
}
