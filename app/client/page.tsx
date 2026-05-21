'use client';

import Link from 'next/link';
import { ClientNavbar } from '@/components/client-navbar';
import { ClientFooter } from '@/components/client-footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, MapPin, Phone, Mail, Wifi, Utensils, Dumbbell, Waves, Shield, Award, TrendingUp } from 'lucide-react';
import { useState } from 'react';

// Single Hotel Data
const hotelInfo = {
  id: '1',
  name: 'Grand Luxury Hotel',
  tagline: 'Experience Elegance and Comfort',
  location: '123 Main Street, Downtown',
  city: 'Premium City',
  country: 'Country',
  phone: '+1-555-0100',
  email: 'info@grandhotel.com',
  rating: 4.8,
  reviewCount: 324,
  description: 'Our hotel offers a world-class experience with luxurious rooms, fine dining, and exceptional service. Located in the heart of the city, we provide the perfect base for business and leisure travelers.',
  image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=600&fit=crop',
  pricePerNightStart: 150,
  amenities: ['WiFi', 'Restaurant', 'Gym', 'Swimming Pool', 'Spa', 'Business Center', 'Conference Rooms', 'Room Service'],
};

const rooms = [
  {
    id: '1',
    name: 'Standard Room',
    type: 'standard',
    capacity: 2,
    pricePerNight: 150,
    description: 'Comfortable room with essential amenities',
    amenities: ['Queen Bed', 'WiFi', 'Bathroom', 'TV'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Deluxe Room',
    type: 'deluxe',
    capacity: 2,
    pricePerNight: 250,
    description: 'Spacious room with premium amenities',
    amenities: ['King Bed', 'WiFi', 'Bath & Shower', 'TV', 'Mini Bar'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Executive Suite',
    type: 'suite',
    capacity: 4,
    pricePerNight: 400,
    description: 'Luxurious suite with separate living area',
    amenities: ['King Bed', 'Living Area', 'WiFi', 'Jacuzzi', 'Dining Area'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=400&fit=crop',
  },
];

export default function ClientHome() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ClientNavbar />

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] bg-cover bg-center" style={{backgroundImage: `url(${hotelInfo.image})`}}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">{hotelInfo.name}</h1>
          <p className="text-lg md:text-xl text-white/90 drop-shadow">{hotelInfo.tagline}</p>
        </div>
      </section>

      {/* Booking Bar */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Check-In</label>
              <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Check-Out</label>
              <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Guests</label>
              <select value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md">
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>
            <div className="flex items-end">
              <Link href="/client/book/1" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Check Availability</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Hotel Section */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Welcome to {hotelInfo.name}</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">{hotelInfo.description}</p>
              <div className="flex items-center gap-8 mt-6">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-sm text-slate-600">{hotelInfo.rating} ({hotelInfo.reviewCount} reviews)</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Hotel Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">{hotelInfo.location}</p>
                    <p className="text-sm text-slate-600">{hotelInfo.city}, {hotelInfo.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <a href={`tel:${hotelInfo.phone}`} className="text-blue-600 hover:underline">{hotelInfo.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <a href={`mailto:${hotelInfo.email}`} className="text-blue-600 hover:underline">{hotelInfo.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Rooms Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Our Rooms</h2>
            <p className="text-slate-600">Choose from our selection of luxurious rooms and suites</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{room.name}</h3>
                  <p className="text-slate-600 text-sm mb-4">{room.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-slate-600">Capacity:</span>
                    <span className="font-semibold text-slate-900">{room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}</span>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-2xl font-bold text-blue-600 mb-4">${room.pricePerNight}<span className="text-sm text-slate-600">/night</span></p>
                    <Link href={`/client/book/${room.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Our Amenities</h2>
            <p className="text-slate-600">Enjoy world-class facilities and services</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
              <Wifi className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900">Free WiFi</h3>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
              <Utensils className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900">Restaurant & Bar</h3>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
              <Dumbbell className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900">Fitness Center</h3>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
              <Waves className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900">Swimming Pool</h3>
            </div>
          </div>
        </div>
      </section>



      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-4">Why Choose StayHub?</h2>
          <p className="text-neutral-600 text-center max-w-2xl mx-auto mb-16">
            We&apos;re committed to making your hotel booking experience seamless and rewarding.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Secure Booking</h3>
              <p className="text-neutral-600 text-sm">Your transactions are protected with encryption.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <Award className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Best Prices</h3>
              <p className="text-neutral-600 text-sm">Guaranteed lowest rates on all properties.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-neutral-900 mb-2">24/7 Support</h3>
              <p className="text-neutral-600 text-sm">Our team is always here to help you.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <Award className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Trusted Reviews</h3>
              <p className="text-neutral-600 text-sm">Real reviews from verified guests.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Book Your Stay?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of travelers who trust StayHub for their hotel bookings.
          </p>
          <Link href="/hotels">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-neutral-100">
              Start Exploring Hotels
            </Button>
          </Link>
        </div>
      </section>

      <ClientFooter />
    </div>
  );
}
