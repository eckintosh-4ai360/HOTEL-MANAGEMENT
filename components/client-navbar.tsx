'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Heart, User, LogOut, LogIn, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ClientNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/client" className="text-2xl font-bold text-slate-900">
            Luxury Hotels
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/client/hotels" className="text-slate-600 hover:text-slate-900 text-sm font-medium transition">
              Browse Rooms
            </Link>
            <Link href="/client/dashboard" className="text-slate-600 hover:text-slate-900 text-sm font-medium transition">
              My Bookings
            </Link>
          </div>

          {/* Right Menu */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link href="/client/dashboard">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-1" />
                    Account
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/client/login">
                  <Button variant="ghost" size="sm" className="text-sm">
                    Login
                  </Button>
                </Link>
                <Link href="/client/signup">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs md:text-sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t">
            <Link href="/client/hotels" className="block px-2 py-3 text-slate-600 hover:text-slate-900 text-sm">
              Browse Rooms
            </Link>
            <Link href="/client/dashboard" className="block px-2 py-3 text-slate-600 hover:text-slate-900 text-sm">
              My Bookings
            </Link>
            <div className="border-t mt-4 pt-4 flex gap-2">
              <Link href="/client/login" className="flex-1">
                <Button variant="outline" className="w-full text-xs">
                  Login
                </Button>
              </Link>
              <Link href="/client/signup" className="flex-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-xs">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
