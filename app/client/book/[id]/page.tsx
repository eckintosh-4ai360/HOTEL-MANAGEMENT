'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ClientNavbar } from '@/components/client-navbar';
import { ClientFooter } from '@/components/client-footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { roomsData, paymentMethods } from '@/lib/client-data';
import { Check, Lock } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PageProps {
  params: {
    id: string;
  };
}

export default function BookingPage({ params }: PageProps) {
  const room = roomsData.find((r) => r.id === params.id);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');
  const [step, setStep] = useState<'details' | 'payment'>('details');

  // Booking form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: '',
  });

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <ClientNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Room Not Found</h1>
            <Link href="/hotels">
              <Button className="bg-blue-600 hover:bg-blue-700">Back to Hotels</Button>
            </Link>
          </div>
        </div>
        <ClientFooter />
      </div>
    );
  }

  const numberOfNights = checkIn && checkOut ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const totalPrice = numberOfNights * room.pricePerNight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') {
      setStep('payment');
    } else {
      console.log('[v0] Booking submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <ClientNavbar />

      {/* Progress Steps */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {[
              { label: 'Booking Details', id: 'details' },
              { label: 'Payment', id: 'payment' },
            ].map((s) => (
              <div key={s.id} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step === s.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {step === s.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{s.id === 'details' ? '1' : '2'}</span>
                  )}
                </div>
                <span className="ml-3 text-sm font-semibold text-neutral-900">{s.label}</span>
                {s.id !== 'payment' && (
                  <div className="flex-1 mx-4 h-0.5 bg-neutral-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-sm">
              {step === 'details' ? (
                <>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Booking Details</h2>

                  {/* Stay Information */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Your Stay</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Check-In
                        </label>
                        <Input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Check-Out
                        </label>
                        <Input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Guests
                        </label>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4+ Guests</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Guest Information */}
                  <div className="mb-8 border-t pt-8">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Guest Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          First Name
                        </label>
                        <Input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Last Name
                        </label>
                        <Input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Email
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                          Phone
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="border-t pt-8">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">Special Requests</h3>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) =>
                        setFormData({ ...formData, specialRequests: e.target.value })
                      }
                      placeholder="Any special requests for your stay? (Optional)"
                      className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm resize-none"
                      rows={4}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Payment Information</h2>

                  <div className="space-y-6">
                    {/* Payment Method Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-3">
                        Payment Method
                      </label>
                      <div className="space-y-3">
                        {paymentMethods.map((method) => (
                          <label
                            key={method.value}
                            className="flex items-center p-4 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-blue-600"
                          >
                            <input
                              type="radio"
                              name="payment-method"
                              value={method.value}
                              checked={formData.paymentMethod === method.value}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  paymentMethod: e.target.value,
                                })
                              }
                              className="w-4 h-4"
                            />
                            <span className="ml-3 font-semibold text-neutral-900">
                              {method.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-lg">
                      <Lock className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-neutral-900">Your payment is secure</p>
                        <p className="text-sm text-neutral-600">
                          We use industry-standard encryption to protect your payment information.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8 border-t pt-8">
                {step === 'payment' && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('details')}
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={!checkIn || !checkOut}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {step === 'details' ? 'Continue to Payment' : 'Complete Booking'}
                </Button>
              </div>
            </form>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Booking Summary</h3>

              <div className="mb-4">
                <p className="font-semibold text-neutral-900">{room.name}</p>
                <p className="text-sm text-neutral-600">{room.type}</p>
              </div>

              <div className="space-y-2 border-b pb-4 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Check-In</span>
                  <span className="text-neutral-900">{checkIn || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Check-Out</span>
                  <span className="text-neutral-900">{checkOut || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Guests</span>
                  <span className="text-neutral-900">{guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Nights</span>
                  <span className="text-neutral-900">{numberOfNights || '-'}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-neutral-600">
                    ${room.pricePerNight} × {numberOfNights} nights
                  </span>
                  <span className="text-neutral-900 font-semibold">${totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Taxes & fees</span>
                  <span className="text-neutral-900 font-semibold">
                    ${Math.round(totalPrice * 0.1)}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-bold text-neutral-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${totalPrice + Math.round(totalPrice * 0.1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClientFooter />
    </div>
  );
}
