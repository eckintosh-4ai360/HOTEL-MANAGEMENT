// Hotel management dummy data

export const roomTypes = [
  { value: 'standard', label: 'Standard Room' },
  { value: 'suite', label: 'Suite' },
  { value: 'deluxe', label: 'Deluxe' },
  { value: 'presidential', label: 'Presidential Suite' },
  { value: 'penthouse', label: 'Penthouse' },
];

export const paymentMethods = [
  { value: 'cash', label: 'Cash' },
  { value: 'momo', label: 'Mobile Money (Momo)' },
  { value: 'bank', label: 'Bank Transfer' },
];

export const dashboardStats = [
  {
    title: 'Total Rooms',
    value: '287',
    change: '+2.5%',
    icon: 'Home',
  },
  {
    title: 'Occupied Rooms',
    value: '198',
    change: '+12.3%',
    icon: 'Users',
  },
  {
    title: 'Monthly Revenue',
    value: '$45,231',
    change: '+8.2%',
    icon: 'DollarSign',
  },
  {
    title: 'Bookings',
    value: '142',
    change: '-3.1%',
    icon: 'Calendar',
  },
];

export const roomData = [
  {
    id: '001',
    name: 'Deluxe Suite',
    type: 'Suite',
    floor: 3,
    status: 'occupied',
    price: '$299/night',
    capacity: 4,
  },
  {
    id: '002',
    name: 'Standard Room',
    type: 'Room',
    floor: 2,
    status: 'available',
    price: '$129/night',
    capacity: 2,
  },
  {
    id: '003',
    name: 'Ocean View',
    type: 'Suite',
    floor: 5,
    status: 'occupied',
    price: '$399/night',
    capacity: 4,
  },
  {
    id: '004',
    name: 'Garden Room',
    type: 'Room',
    floor: 1,
    status: 'maintenance',
    price: '$149/night',
    capacity: 2,
  },
  {
    id: '005',
    name: 'Presidential Suite',
    type: 'Suite',
    floor: 6,
    status: 'available',
    price: '$599/night',
    capacity: 6,
  },
];

export const bookingData = [
  {
    id: 'BK001',
    guestName: 'John Smith',
    room: '001',
    checkIn: '2024-04-15',
    checkOut: '2024-04-18',
    status: 'confirmed',
    total: '$897',
  },
  {
    id: 'BK002',
    guestName: 'Sarah Johnson',
    room: '003',
    checkIn: '2024-04-16',
    checkOut: '2024-04-20',
    status: 'confirmed',
    total: '$1,596',
  },
  {
    id: 'BK003',
    guestName: 'Michael Brown',
    room: '002',
    checkIn: '2024-04-17',
    checkOut: '2024-04-19',
    status: 'pending',
    total: '$258',
  },
  {
    id: 'BK004',
    guestName: 'Emily Davis',
    room: '005',
    checkIn: '2024-04-20',
    checkOut: '2024-04-25',
    status: 'confirmed',
    total: '$2,994',
  },
  {
    id: 'BK005',
    guestName: 'David Wilson',
    room: '001',
    checkIn: '2024-04-18',
    checkOut: '2024-04-21',
    status: 'cancelled',
    total: '$897',
  },
];

export const customerData = [
  {
    id: 'CUST001',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1-555-0101',
    status: 'active',
    bookings: 12,
  },
  {
    id: 'CUST002',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1-555-0102',
    status: 'active',
    bookings: 8,
  },
  {
    id: 'CUST003',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '+1-555-0103',
    status: 'inactive',
    bookings: 5,
  },
  {
    id: 'CUST004',
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '+1-555-0104',
    status: 'active',
    bookings: 15,
  },
  {
    id: 'CUST005',
    name: 'David Wilson',
    email: 'david@example.com',
    phone: '+1-555-0105',
    status: 'active',
    bookings: 3,
  },
];

export const paymentData = [
  {
    id: 'PAY001',
    bookingId: 'BK001',
    amount: '$897',
    method: 'Credit Card',
    status: 'completed',
    date: '2024-04-15',
  },
  {
    id: 'PAY002',
    bookingId: 'BK002',
    amount: '$1,596',
    method: 'Bank Transfer',
    status: 'completed',
    date: '2024-04-16',
  },
  {
    id: 'PAY003',
    bookingId: 'BK003',
    amount: '$258',
    method: 'Credit Card',
    status: 'pending',
    date: '2024-04-17',
  },
  {
    id: 'PAY004',
    bookingId: 'BK004',
    amount: '$2,994',
    method: 'PayPal',
    status: 'completed',
    date: '2024-04-20',
  },
  {
    id: 'PAY005',
    bookingId: 'BK005',
    amount: '$897',
    method: 'Credit Card',
    status: 'refunded',
    date: '2024-04-18',
  },
];

export const chartData = [
  { month: 'Jan', revenue: 4000, bookings: 65, occupancy: 78 },
  { month: 'Feb', revenue: 3000, bookings: 59, occupancy: 82 },
  { month: 'Mar', revenue: 2000, bookings: 48, occupancy: 71 },
  { month: 'Apr', revenue: 2780, bookings: 71, occupancy: 89 },
  { month: 'May', revenue: 1890, bookings: 55, occupancy: 74 },
  { month: 'Jun', revenue: 2390, bookings: 62, occupancy: 85 },
];
