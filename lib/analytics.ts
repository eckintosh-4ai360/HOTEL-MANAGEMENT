import { bookingData, paymentData, roomData } from './data';

// KPI Calculations
export const calculateKPIs = () => {
  const totalRooms = roomData.length;
  const occupiedRooms = roomData.filter(r => r.status === 'occupied').length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);
  
  const totalRevenue = paymentData
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + parseInt(p.amount.replace('$', '').replace(',', '')), 0);
  
  const avgDailyRate = Math.round(totalRevenue / totalRooms);
  const revenuePerAvailableRoom = Math.round((totalRevenue / totalRooms) * (occupancyRate / 100));
  
  const confirmedBookings = bookingData.filter(b => b.status === 'confirmed').length;
  const bookingConversionRate = Math.round((confirmedBookings / bookingData.length) * 100);
  
  return {
    occupancyRate,
    totalRevenue,
    avgDailyRate,
    revenuePerAvailableRoom,
    confirmedBookings,
    bookingConversionRate,
    totalRooms,
  };
};

// Occupancy by room type
export const getOccupancyByRoomType = () => {
  const roomTypes: { [key: string]: { total: number; occupied: number } } = {};
  
  roomData.forEach(room => {
    if (!roomTypes[room.type]) {
      roomTypes[room.type] = { total: 0, occupied: 0 };
    }
    roomTypes[room.type].total++;
    if (room.status === 'occupied') {
      roomTypes[room.type].occupied++;
    }
  });
  
  return Object.entries(roomTypes).map(([type, data]) => ({
    type,
    total: data.total,
    occupied: data.occupied,
    rate: Math.round((data.occupied / data.total) * 100),
  }));
};

// Payment method breakdown
export const getPaymentMethodBreakdown = () => {
  const breakdown: { [key: string]: number } = {};
  
  paymentData
    .filter(p => p.status === 'completed')
    .forEach(payment => {
      const method = payment.method;
      breakdown[method] = (breakdown[method] || 0) + parseInt(payment.amount.replace('$', '').replace(',', ''));
    });
  
  return Object.entries(breakdown).map(([method, amount]) => ({
    method,
    amount,
    percentage: Math.round((amount / Object.values(breakdown).reduce((a, b) => a + b, 0)) * 100),
  }));
};

// Generate occupancy heatmap data for 30 days
export const generateOccupancyHeatmap = () => {
  const today = new Date();
  const heatmapData = [];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const occupancy = Math.round(Math.random() * 40 + 50); // Random occupancy 50-90%
    
    heatmapData.push({
      date: date.toISOString().split('T')[0],
      occupancy,
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dateFormatted: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });
  }
  
  return heatmapData;
};

// CSV Export utility
export const exportToCSV = (data: any[], fileName: string) => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(',')
    ),
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Trend calculation helper
export const calculateTrend = (current: number, previous: number) => {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
};
