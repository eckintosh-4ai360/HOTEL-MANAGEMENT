'use client';

import { Search, Bell, Moon, Sun, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="fixed top-0 right-0 left-0 z-30 flex h-20 items-center justify-between border-b border-[#e9e7e1] bg-[#f8f8f5]/90 px-6 backdrop-blur-xl lg:left-64 lg:px-8">
        <div className="flex items-center gap-4 flex-1" />
      </header>
    );
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-30 flex h-20 items-center justify-between border-b border-[#e9e7e1] bg-[#f8f8f5]/90 px-6 backdrop-blur-xl lg:left-64 lg:px-8">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative hidden w-72 lg:block">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8d969d]" />
          <Input
            type="search"
            placeholder="Search bookings, guests..."
            className="h-11 rounded-xl border-[#e8e6df] bg-white pl-11 text-sm shadow-sm placeholder:text-[#9aa1a8] focus-visible:ring-[#1e7a6b]/30"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-xl text-[#344454] hover:bg-white hover:text-[#16283a]"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        <div className="ml-2 hidden items-center gap-2.5 border-l border-[#e4e2dc] pl-4 sm:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1d7668] text-xs font-bold text-white shadow-[0_4px_10px_rgba(29,118,104,0.25)]">JM</div>
          <div className="hidden xl:block">
            <p className="text-sm font-bold leading-4 text-[#1c2d3e]">Jordan Miles</p>
            <p className="mt-0.5 text-[0.7rem] text-[#84909a]">General Manager</p>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-[#84909a] xl:block" />
        </div>
      </div>
    </header>
  );
}
