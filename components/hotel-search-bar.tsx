'use client';

import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function HotelSearchBar() {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[v0] Search triggered:', { location, checkIn, checkOut, guests });
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Location Input */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-neutral-700 mb-2">Where to?</label>
          <div className="relative flex items-center">
            <MapPin className="absolute left-3 w-4 h-4 text-neutral-400" />
            <Input
              type="text"
              placeholder="Hotel, city or landmark"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 border-neutral-300 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Check-In Date */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-neutral-700 mb-2">Check-In</label>
          <div className="relative flex items-center">
            <Calendar className="absolute left-3 w-4 h-4 text-neutral-400" />
            <Input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="pl-10 border-neutral-300 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Check-Out Date */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-neutral-700 mb-2">Check-Out</label>
          <div className="relative flex items-center">
            <Calendar className="absolute left-3 w-4 h-4 text-neutral-400" />
            <Input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="pl-10 border-neutral-300 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-neutral-700 mb-2">Guests</label>
          <div className="relative flex items-center">
            <Users className="absolute left-3 w-4 h-4 text-neutral-400" />
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4+ Guests</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
