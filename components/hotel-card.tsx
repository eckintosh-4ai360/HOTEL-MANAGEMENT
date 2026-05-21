'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin, Star } from 'lucide-react';
import { Hotel } from '@/lib/client-data';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-slate-200">
      {/* Hotel Image */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
          {hotel.type.charAt(0).toUpperCase() + hotel.type.slice(1)}
        </div>
      </div>

      {/* Hotel Info */}
      <div className="p-4">
        {/* Hotel Name and Rating */}
        <div className="mb-3">
          <h3 className="font-semibold text-base text-slate-900 line-clamp-2 mb-2">{hotel.name}</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(hotel.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-neutral-700">{hotel.rating}</span>
            <span className="text-xs text-neutral-500">({hotel.reviewCount})</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-1 mb-3">
          <MapPin className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-neutral-600 line-clamp-1">{hotel.city}, {hotel.country}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-600 line-clamp-2 mb-4">{hotel.description}</p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-neutral-900">${hotel.pricePerNight}</span>
            <span className="text-sm text-neutral-600">/night</span>
          </div>
          <Link href={`/hotel/${hotel.id}`}>
            <Button className="bg-blue-600 hover:bg-blue-700">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
