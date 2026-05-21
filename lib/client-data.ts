// Client-side data matching admin database schema

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  description: string;
  rating: number;
  reviewCount: number;
  image: string;
  pricePerNight: number;
  amenities: string[];
  type: 'luxury' | 'business' | 'boutique' | 'budget' | 'resort';
}

export interface Room {
  id: string;
  hotelId: string;
  name: string;
  type: 'standard' | 'suite' | 'deluxe' | 'presidential' | 'penthouse';
  capacity: number;
  pricePerNight: number;
  image: string;
  description: string;
  amenities: string[];
  floor?: number;
  status: 'available' | 'occupied' | 'maintenance';
}

export interface Booking {
  id: string;
  customerId: string;
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address?: string;
  city?: string;
  createdAt: string;
  totalBookings: number;
  totalSpent: number;
}

export interface Review {
  id: string;
  hotelId: string;
  customerId: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}

export interface Favorite {
  id: string;
  customerId: string;
  hotelId: string;
  addedAt: string;
}

export interface PaymentMethod {
  value: string;
  label: string;
}

// Payment Methods
export const paymentMethods: PaymentMethod[] = [
  { value: 'cash', label: 'Cash' },
  { value: 'momo', label: 'Mobile Money (Momo)' },
  { value: 'bank', label: 'Bank Transfer' },
];

// Sample hotels data
export const hotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Luxury Resort',
    location: '123 Beach Road, Coastal City',
    city: 'Coastal City',
    country: 'Paradise Island',
    description: 'Experience unparalleled luxury with oceanfront views, world-class amenities, and personalized service.',
    rating: 4.8,
    reviewCount: 456,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500',
    pricePerNight: 450,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Concierge'],
    type: 'luxury',
  },
  {
    id: '2',
    name: 'Metropolitan Business Hotel',
    location: '456 Downtown Ave, Business District',
    city: 'Downtown',
    country: 'Central City',
    description: 'Perfect for business travelers with modern facilities, high-speed internet, and conference rooms.',
    rating: 4.5,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1631049307038-da5ec5d127c1?w=800&h=500',
    pricePerNight: 250,
    amenities: ['WiFi', 'Business Center', 'Restaurant', 'Gym', 'Parking'],
    type: 'business',
  },
  {
    id: '3',
    name: 'Boutique Urban Inn',
    location: '789 Arts District Lane, Creative Quarter',
    city: 'Arts District',
    country: 'Cultural Hub',
    description: 'Stylish boutique hotel with unique decor, local art collections, and vibrant nightlife nearby.',
    rating: 4.6,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1520631052-6f2161ecc395?w=800&h=500',
    pricePerNight: 200,
    amenities: ['WiFi', 'Bar', 'Restaurant', 'Art Gallery'],
    type: 'boutique',
  },
  {
    id: '4',
    name: 'Mountain Resort & Spa',
    location: '321 Alpine Drive, Mountain Valley',
    city: 'Mountain Valley',
    country: 'Summit Heights',
    description: 'Escape to nature with stunning mountain views, spa treatments, and outdoor activities.',
    rating: 4.7,
    reviewCount: 389,
    image: 'https://images.unsplash.com/photo-1549708790-d51b34eafdf1?w=800&h=500',
    pricePerNight: 350,
    amenities: ['WiFi', 'Spa', 'Pool', 'Gym', 'Restaurant', 'Hiking Trails'],
    type: 'resort',
  },
  {
    id: '5',
    name: 'Cozy Budget Haven',
    location: '654 Budget Street, Affordable Area',
    city: 'Budget Quarter',
    country: 'Value City',
    description: 'Comfortable and affordable accommodation with essential amenities for budget-conscious travelers.',
    rating: 4.2,
    reviewCount: 567,
    image: 'https://images.unsplash.com/photo-1618886996285-d58a1a0b0f21?w=800&h=500',
    pricePerNight: 80,
    amenities: ['WiFi', 'Restaurant', 'Laundry'],
    type: 'budget',
  },
];

// Sample rooms data
export const roomsData: Room[] = [
  {
    id: 'r1',
    hotelId: '1',
    name: 'Ocean View Suite',
    type: 'suite',
    capacity: 2,
    pricePerNight: 450,
    image: 'https://images.unsplash.com/photo-1631049307038-da5ec5d127c1?w=400&h=300',
    description: 'Spacious suite with panoramic ocean views and luxurious amenities.',
    amenities: ['WiFi', 'Ocean View', 'Jacuzzi', 'Minibar', 'Smart TV'],
    floor: 8,
    status: 'available',
  },
  {
    id: 'r2',
    hotelId: '1',
    name: 'Deluxe Double Room',
    type: 'deluxe',
    capacity: 2,
    pricePerNight: 300,
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300',
    description: 'Elegant double room with modern furnishings and garden views.',
    amenities: ['WiFi', 'Flat Screen TV', 'Air Conditioning'],
    floor: 5,
    status: 'available',
  },
  {
    id: 'r3',
    hotelId: '2',
    name: 'Standard Twin Room',
    type: 'standard',
    capacity: 2,
    pricePerNight: 150,
    image: 'https://images.unsplash.com/photo-1566665556112-652d0c521014?w=400&h=300',
    description: 'Comfortable twin room perfect for business travelers.',
    amenities: ['WiFi', 'Desk', 'Meeting Phone'],
    floor: 3,
    status: 'available',
  },
  {
    id: 'r4',
    hotelId: '3',
    name: 'Artistic Loft',
    type: 'suite',
    capacity: 2,
    pricePerNight: 280,
    image: 'https://images.unsplash.com/photo-1569258297751-cd4628902c4b?w=400&h=300',
    description: 'Unique loft-style room with curated art pieces.',
    amenities: ['WiFi', 'Hardwood Floors', 'Art Collections'],
    floor: 6,
    status: 'available',
  },
];

// Sample reviews data
export const reviewsData: Review[] = [
  {
    id: 'rev1',
    hotelId: '1',
    customerId: 'c1',
    rating: 5,
    title: 'Exceptional Experience',
    comment: 'Outstanding service, beautiful rooms, and amazing views. Will definitely return!',
    createdAt: '2024-04-10',
  },
  {
    id: 'rev2',
    hotelId: '1',
    customerId: 'c2',
    rating: 4,
    title: 'Great Stay',
    comment: 'Very clean and comfortable. Staff was helpful and friendly.',
    createdAt: '2024-04-08',
  },
  {
    id: 'rev3',
    hotelId: '2',
    customerId: 'c3',
    rating: 5,
    title: 'Perfect for Business',
    comment: 'Everything I needed for my business trip. Great location and facilities.',
    createdAt: '2024-04-05',
  },
  {
    id: 'rev4',
    hotelId: '3',
    customerId: 'c4',
    rating: 4,
    title: 'Unique and Charming',
    comment: 'Loved the artistic vibe. A bit noisy at night but overall great.',
    createdAt: '2024-04-01',
  },
];

// Sample customer data
export const customersData: Customer[] = [
  {
    id: 'c1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1-555-0101',
    country: 'USA',
    address: '123 Main St',
    city: 'New York',
    createdAt: '2023-01-15',
    totalBookings: 5,
    totalSpent: 2500,
  },
  {
    id: 'c2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '+1-555-0102',
    country: 'USA',
    address: '456 Oak Ave',
    city: 'Los Angeles',
    createdAt: '2023-02-20',
    totalBookings: 3,
    totalSpent: 1800,
  },
];
