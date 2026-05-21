'use client';

import { useState, useMemo } from 'react';
import { ClientNavbar } from '@/components/client-navbar';
import { ClientFooter } from '@/components/client-footer';
import { HotelCard } from '@/components/hotel-card';
import { hotels } from '@/lib/client-data';
import { Hotel } from '@/lib/client-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, Settings2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SortOption = 'price-low' | 'price-high' | 'rating' | 'newest' | 'relevance';

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort hotels
  const filteredHotels: Hotel[] = useMemo(() => {
    let result = hotels.filter((hotel) => {
      const matchesSearch =
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedType === 'all' || hotel.type === selectedType;
      const matchesPrice = hotel.pricePerNight >= priceRange[0] && hotel.pricePerNight <= priceRange[1];
      const matchesRating = hotel.rating >= minRating;

      return matchesSearch && matchesType && matchesPrice && matchesRating;
    });

    // Sort results
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case 'price-high':
        result.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.reverse();
        break;
      case 'relevance':
      default:
        // Keep original order for relevance
        break;
    }

    return result;
  }, [searchTerm, selectedType, sortBy, priceRange, minRating]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <ClientNavbar />

      {/* Header Section */}
      <section className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Find Your Perfect Hotel</h1>
          <p className="text-neutral-600 mb-6">Showing {filteredHotels.length} results</p>

          {/* Search Bar */}
          <Input
            type="text"
            placeholder="Search by hotel name, city, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-2xl border-neutral-300"
          />
        </div>
      </section>

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div
              className={`${
                showFilters ? 'block' : 'hidden'
              } md:block w-full md:w-64 flex-shrink-0`}
            >
              <div className="bg-white rounded-lg p-6 space-y-6 sticky top-20">
                <div className="flex items-center justify-between md:hidden">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="text-neutral-500">
                    ✕
                  </button>
                </div>

                {/* Hotel Type Filter */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">Hotel Type</h3>
                  <div className="space-y-2">
                    {['all', 'luxury', 'business', 'boutique', 'budget', 'resort'].map((type) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="hotel-type"
                          value={type}
                          checked={selectedType === type}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-neutral-700 capitalize">
                          {type === 'all' ? 'All Types' : type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-600">$0 - ${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Minimum Rating Filter */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">Minimum Rating</h3>
                  <div className="space-y-2">
                    {[0, 3, 3.5, 4, 4.5].map((rating) => (
                      <label key={rating} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-neutral-700">
                          {rating === 0 ? 'All Ratings' : `${rating}+ Stars`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Reset Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setSortBy('relevance');
                    setPriceRange([0, 500]);
                    setMinRating(0);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Sort and View Toggle */}
              <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center gap-2 text-blue-600 font-semibold"
                >
                  <Settings2 className="w-4 h-4" />
                  Filters
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-600 hidden sm:inline">Sort by:</span>
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Hotels Grid */}
              {filteredHotels.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredHotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-12 text-center">
                  <p className="text-lg text-neutral-600 mb-2">No hotels found</p>
                  <p className="text-sm text-neutral-500">Try adjusting your filters or search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ClientFooter />
    </div>
  );
}
