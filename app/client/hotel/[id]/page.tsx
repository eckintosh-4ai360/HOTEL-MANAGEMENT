'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ClientNavbar } from '@/components/client-navbar';
import { ClientFooter } from '@/components/client-footer';
import { ReviewCard } from '@/components/review-card';
import { Button } from '@/components/ui/button';
import { hotels, roomsData, reviewsData } from '@/lib/client-data';
import { Heart, MapPin, Star, Wifi, Utensils, Dumbbell, Waves, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

interface PageProps {
  params: {
    id: string;
  };
}

export default function HotelDetailPage({ params }: PageProps) {
  const hotel = hotels.find((h) => h.id === params.id);
  const hotelRooms = roomsData.filter((r) => r.hotelId === params.id);
  const hotelReviews = reviewsData.filter((r) => r.hotelId === params.id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <ClientNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Hotel Not Found</h1>
            <Link href="/hotels">
              <Button className="bg-blue-600 hover:bg-blue-700">Back to Hotels</Button>
            </Link>
          </div>
        </div>
        <ClientFooter />
      </div>
    );
  }

  const galleryImages = [hotel.image, hotel.image, hotel.image, hotel.image];

  const amenityIcons: Record<string, React.ReactNode> = {
    WiFi: <Wifi className="w-5 h-5" />,
    Restaurant: <Utensils className="w-5 h-5" />,
    Gym: <Dumbbell className="w-5 h-5" />,
    Pool: <Waves className="w-5 h-5" />,
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ClientNavbar />

      {/* Gallery Section */}
      <section className="relative h-96 md:h-[500px] bg-neutral-200 overflow-hidden">
        <Image
          src={galleryImages[currentImageIndex]}
          alt="Hotel"
          fill
          className="object-cover"
        />
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`w-2 h-2 rounded-full transition ${
                i === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 mb-2">{hotel.name}</h1>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(hotel.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{hotel.rating}</span>
                  <span className="text-neutral-600">({hotel.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <MapPin className="w-4 h-4" />
                  <span>{hotel.location}</span>
                </div>
              </div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-3 rounded-full border border-neutral-300 hover:border-blue-600 transition"
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-neutral-400'}`} />
              </button>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">About This Hotel</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    {amenityIcons[amenity] || <span className="w-5 h-5">✓</span>}
                    <span className="text-neutral-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Available Rooms</h2>
              <div className="space-y-4">
                {hotelRooms.map((room) => (
                  <div key={room.id} className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-neutral-900">{room.name}</h3>
                        <p className="text-sm text-neutral-600">For {room.capacity} guests • {room.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-neutral-900">${room.pricePerNight}</div>
                        <div className="text-sm text-neutral-600">/night</div>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 mb-3">{room.description}</p>
                    <Link href={`/book/${room.id}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 w-full">Book This Room</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Guest Reviews</h2>
              {hotelReviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hotelReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} authorName="Verified Guest" />
                  ))}
                </div>
              ) : (
                <p className="text-neutral-600">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
              <div className="mb-6">
                <span className="text-sm text-neutral-600">From</span>
                <div className="text-4xl font-bold text-neutral-900">${hotel.pricePerNight}</div>
                <span className="text-sm text-neutral-600">per night</span>
              </div>

              <div className="space-y-3 mb-6">
                <input
                  type="date"
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="Check-In"
                />
                <input
                  type="date"
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="Check-Out"
                />
                <select className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-3">
                Reserve Now
              </Button>

              <div className="space-y-2 text-sm text-neutral-600 border-t pt-4">
                <div className="flex justify-between">
                  <span>Nightly rate</span>
                  <span className="text-neutral-900 font-semibold">${hotel.pricePerNight}</span>
                </div>
                <div className="flex justify-between">
                  <span>2 nights</span>
                  <span className="text-neutral-900 font-semibold">${hotel.pricePerNight * 2}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Total</span>
                  <span className="text-lg text-neutral-900 font-bold">${hotel.pricePerNight * 2}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-500 text-center mt-4">
                You won&apos;t be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>

      <ClientFooter />
    </div>
  );
}
