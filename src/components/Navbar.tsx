"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isAuthenticated = status === "authenticated";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4" onClick={closeMenu}>
            <div className="relative h-20 w-20 md:h-24 md:w-24">
              <Image
                src="/images/logo.png"
                alt="HRA Inter College Utraula Logo"
                width={96}
                height={96}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-xl text-teal-700">H.R.A. Inter College</span>
              <span className="text-xs md:text-sm text-gray-600">Utraula • Estd 2003</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  {session?.user?.fullName && (
                    <span className="text-gray-700 font-medium">Welcome, {session.user.fullName}</span>
                  )}
                  <Link href="/dashboard/profile" className="text-gray-700 hover:text-teal-700 font-medium">
                    Profile
                  </Link>
                  <Link href="/dashboard/notice" className="text-gray-700 hover:text-teal-700 font-medium">
                    Notice
                  </Link>
                  <Link href="/dashboard/results" className="text-gray-700 hover:text-teal-700 font-medium">
                    Results
                  </Link>
                  <Button variant="outline" className="bg-teal-700 hover:bg-teal-800" onClick={() => signOut()}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/" className="px-3 py-2 text-gray-700 hover:text-teal-700 font-medium">Home</Link>
                  <Link href="/about" className="px-3 py-2 text-gray-700 hover:text-teal-700 font-medium">About</Link>
                  <Link href="/academics" className="px-3 py-2 text-gray-700 hover:text-teal-700 font-medium">Academics</Link>
                  <Link href="/admissions" className="px-3 py-2 text-gray-700 hover:text-teal-700 font-medium">Admissions</Link>
                  <Link href="/gallery" className="px-3 py-2 text-gray-700 hover:text-teal-700 font-medium">Gallery</Link>
                  <Link href="/contact" className="px-3 py-2 text-gray-700 hover:text-teal-700 font-medium">Contact</Link>
                </>
              )}
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button onClick={toggleMenu} className="md:hidden text-gray-700">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}

          {/* Apply Now Button (Only when not logged in) */}
          {!isMobile && !isAuthenticated && (
            <div className="hidden md:block">
              <Button className="bg-teal-700 hover:bg-teal-800">
                <Link href="/admissions">Apply now</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  {session?.user?.fullName && (
                    <span className="text-gray-700 font-medium">Welcome, {session.user.fullName}</span>
                  )}
                  <Link href="/dashboard/profile" className="px-3 py-2 text-gray-700 hover:bg-teal-50 rounded-md" onClick={closeMenu}>
                    Profile
                  </Link>
                  <Link href="/dashboard/notice" className="px-3 py-2 text-gray-700 hover:bg-teal-50 rounded-md" onClick={closeMenu}>
                    Notice
                  </Link>
                  <Link href="/dashboard/results" className="px-3 py-2 text-gray-700 hover:bg-teal-50 rounded-md" onClick={closeMenu}>
                    Results
                  </Link>
                  <Button variant="outline" onClick={() => { closeMenu(); signOut(); }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/" className="px-3 py-2 text-gray-700 hover:bg-teal-50 rounded-md" onClick={closeMenu}>Home</Link>
                  <Link href="/about" className="px-3 py-2 text-gray-700 hover:bg-teal-50 rounded-md" onClick={closeMenu}>About</Link>
                  <Link href="/academics" className="px-3 py-2 text-gray-700 hover:bg-teal-50 rounded-md" onClick={closeMenu}>Academics</Link>
                  <Link href="/admissions" className="px-3 py-2 text-gray-700 hover:bg-teal-50 rounded-md" onClick={closeMenu}>Admissions</Link>
                  <Link href="/gallery" className="px-3 py-2 text-gray-700 hover:bg-teal-50 rounded-md" onClick={closeMenu}>Gallery</Link>
                  <Link href="/contact" className="px-3 py-2 text-gray-700 hover:bg-teal-50 rounded-md" onClick={closeMenu}>Contact</Link>
                  <div className="mt-2">
                    <Button className="w-full bg-teal-700 hover:bg-teal-800">
                      <Link href="/admissions" onClick={closeMenu}>Apply now</Link>
                    </Button>
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
