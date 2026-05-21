'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ClientNavbar } from '@/components/client-navbar';
import { ClientFooter } from '@/components/client-footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { customersData } from '@/lib/client-data';
import { LogOut, User, Heart, Settings, Calendar, DollarSign } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile' | 'favorites'>('bookings');
  const customer = customersData[0]; // Mock current user

  // Mock bookings data
  const bookings = [
    {
      id: 'b1',
      hotelName: 'Grand Luxury Resort',
      roomType: 'Ocean View Suite',
      checkIn: '2024-05-15',
      checkOut: '2024-05-18',
      totalPrice: 1350,
      status: 'confirmed' as const,
      nights: 3,
    },
    {
      id: 'b2',
      hotelName: 'Metropolitan Business Hotel',
      roomType: 'Standard Twin Room',
      checkIn: '2024-06-01',
      checkOut: '2024-06-03',
      totalPrice: 450,
      status: 'pending' as const,
      nights: 2,
    },
    {
      id: 'b3',
      hotelName: 'Mountain Resort & Spa',
      roomType: 'Deluxe Suite',
      checkIn: '2024-04-10',
      checkOut: '2024-04-12',
      totalPrice: 700,
      status: 'completed' as const,
      nights: 2,
    },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <ClientNavbar />

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-20">
              {/* Profile Section */}
              <div className="mb-6 pb-6 border-b">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-3">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-neutral-900">
                  {customer.firstName} {customer.lastName}
                </h3>
                <p className="text-sm text-neutral-600">{customer.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2 mb-6">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
                    activeTab === 'bookings'
                      ? 'bg-blue-600 text-white'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  My Bookings
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
                    activeTab === 'favorites'
                      ? 'bg-blue-600 text-white'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  Favorites
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
                    activeTab === 'profile'
                      ? 'bg-blue-600 text-white'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Profile Settings
                </button>
              </nav>

              {/* Stats */}
              <div className="space-y-3 border-t pt-6">
                <div>
                  <p className="text-sm text-neutral-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-neutral-900">{customer.totalBookings}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Total Spent</p>
                  <p className="text-2xl font-bold text-blue-600">${customer.totalSpent}</p>
                </div>
              </div>

              {/* Logout Button */}
              <Button
                variant="outline"
                className="w-full mt-6 gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold text-neutral-900">My Bookings</h2>
                  <p className="text-sm text-neutral-600 mt-1">Manage and view all your hotel reservations</p>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Hotel Name</TableHead>
                        <TableHead>Room Type</TableHead>
                        <TableHead>Check-In</TableHead>
                        <TableHead>Check-Out</TableHead>
                        <TableHead>Total Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-semibold text-neutral-900">
                            {booking.hotelName}
                          </TableCell>
                          <TableCell className="text-neutral-600">{booking.roomType}</TableCell>
                          <TableCell className="text-neutral-600">
                            {new Date(booking.checkIn).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-neutral-600">
                            {new Date(booking.checkOut).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="font-bold text-neutral-900">
                            ${booking.totalPrice}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeClass(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {bookings.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-neutral-600 mb-4">No bookings yet</p>
                    <Link href="/client/hotels">
                      <Button className="bg-blue-600 hover:bg-blue-700">Browse Rooms</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Favorite Hotels</h2>
                <p className="text-neutral-600 mb-6">
                  You haven&apos;t saved any favorite rooms yet. Explore rooms and add them to your favorites!
                </p>
                <Link href="/client/hotels">
                  <Button className="bg-blue-600 hover:bg-blue-700">Browse Rooms</Button>
                </Link>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Profile Settings</h2>

                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue={customer.firstName}
                          className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue={customer.lastName}
                          className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={customer.email}
                          className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          defaultValue={customer.phone}
                          className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          defaultValue={customer.country}
                          className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          defaultValue={customer.city || ''}
                          className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Security</h3>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  {/* Save Changes */}
                  <div className="border-t pt-6 flex gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ClientFooter />
    </div>
  );
}
