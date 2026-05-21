'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OccupancyHeatmap } from '@/components/occupancy-heatmap';
import {
  calculateKPIs,
  getOccupancyByRoomType,
  getPaymentMethodBreakdown,
  calculateTrend,
} from '@/lib/analytics';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export default function AnalyticsPage() {
  const kpis = calculateKPIs();
  const roomTypeOccupancy = getOccupancyByRoomType();
  const paymentBreakdown = getPaymentMethodBreakdown();

  // Mock previous period data for trend calculation
  const previousKPIs = {
    occupancyRate: 72,
    totalRevenue: 38500,
    avgDailyRate: 134,
    confirmedBookings: 8,
  };

  const KPICard = ({
    title,
    value,
    unit,
    trend,
    icon: Icon,
  }: {
    title: string;
    value: number | string;
    unit: string;
    trend: number;
    icon: any;
  }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{unit}</p>
          </div>
          <div className="flex items-center gap-1">
            {trend >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <p className={`text-xs font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last period
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Business Analytics</h1>
        <p className="text-muted-foreground">Comprehensive insights into your hotel performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Occupancy Rate"
          value={`${kpis.occupancyRate}%`}
          unit="of rooms occupied"
          trend={calculateTrend(kpis.occupancyRate, previousKPIs.occupancyRate)}
          icon={null}
        />
        <KPICard
          title="Total Revenue"
          value={`$${kpis.totalRevenue.toLocaleString()}`}
          unit="completed payments"
          trend={calculateTrend(kpis.totalRevenue, previousKPIs.totalRevenue)}
          icon={null}
        />
        <KPICard
          title="Average Daily Rate"
          value={`$${kpis.avgDailyRate}`}
          unit="per room per night"
          trend={calculateTrend(kpis.avgDailyRate, previousKPIs.avgDailyRate)}
          icon={null}
        />
        <KPICard
          title="RevPAR"
          value={`$${kpis.revenuePerAvailableRoom}`}
          unit="revenue per available room"
          trend={calculateTrend(kpis.revenuePerAvailableRoom, previousKPIs.avgDailyRate * 0.75)}
          icon={null}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy by Room Type */}
        <Card>
          <CardHeader>
            <CardTitle>Occupancy by Room Type</CardTitle>
            <CardDescription>Current occupancy rates for each room category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomTypeOccupancy.map((room, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{room.type}</p>
                    <p className="text-sm font-semibold">{room.rate}%</p>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${room.rate}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {room.occupied} of {room.total} rooms occupied
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method Distribution</CardTitle>
            <CardDescription>Revenue breakdown by payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ method, percentage }) => `${method}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Booking Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Performance</CardTitle>
          <CardDescription>Overview of booking status and conversion metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Confirmed Bookings</p>
              <p className="text-3xl font-bold">{kpis.confirmedBookings}</p>
              <p className="text-xs text-muted-foreground">Active reservations</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Booking Conversion Rate</p>
              <p className="text-3xl font-bold">{kpis.bookingConversionRate}%</p>
              <p className="text-xs text-muted-foreground">Of total inquiries</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Available Rooms</p>
              <p className="text-3xl font-bold">{kpis.totalRooms - kpis.totalRooms + Math.floor(kpis.totalRooms * (100 - kpis.occupancyRate) / 100)}</p>
              <p className="text-xs text-muted-foreground">Ready for booking</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Occupancy Heatmap */}
      <OccupancyHeatmap />
    </div>
  );
}
