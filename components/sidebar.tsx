'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  BookOpen,
  CreditCard,
  Home,
  Settings,
  Users,
  DoorOpen,
  ChevronLeft,
  Menu,
  TrendingUp,
} from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { label: 'Rooms', href: '/rooms', icon: DoorOpen },
  { label: 'Bookings', href: '/bookings', icon: BookOpen },
  { label: 'Customers', href: '/customers', icon: Users },
  { label: 'Payments', href: '/payments', icon: CreditCard },
  { label: 'Analytics', href: '/analytics', icon: TrendingUp },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 border-r border-[#26394b] bg-[#17283a] pt-20 text-[#c7d3dc] transition-transform duration-300 lg:pt-0',
          !isOpen && '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="border-b border-[#2a3d4e] px-6 py-7">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#d4aa5e] text-sm font-black text-[#17283a] shadow-[0_5px_14px_rgba(0,0,0,0.16)]">H</div>
              <div>
                <h1 className="text-lg font-bold tracking-[-0.04em] text-white">Havenly</h1>
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[#93a6b5]">Hotel Group</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1.5 px-4 py-7">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-[#d4aa5e] text-[#17283a] shadow-[0_6px_16px_rgba(0,0,0,0.15)]'
                      : 'text-[#b5c4ce] hover:bg-[#26394b] hover:text-white'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="mx-4 mb-5 rounded-2xl border border-[#314556] bg-[#203447] p-4">
            <p className="text-xs text-[#aabac5]">
              © 2026 Hotel Management
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
