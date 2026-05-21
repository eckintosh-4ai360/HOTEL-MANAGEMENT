'use client';

import { Search, Bell, Moon, Sun } from 'lucide-react';
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
      <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-background border-b border-border px-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-4 flex-1" />
      </header>
    );
  }

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-background border-b border-border px-6 flex items-center justify-between z-30">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-64 hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 bg-muted"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
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

        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center ml-2">
          <span className="text-xs font-semibold text-primary">JD</span>
        </div>
      </div>
    </header>
  );
}
