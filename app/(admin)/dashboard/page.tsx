'use client';

import { dashboardStats, chartData } from '@/lib/data';
import { StatCard } from '@/components/stat-card';
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Home,
  MoreHorizontal,
  Plus,
  Sparkles,
  Users,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const icons = { Home, Users, DollarSign: ArrowUpRight, Calendar: CalendarDays };
const cardAccents = ['gold', 'mint', 'blue', 'coral'] as const;

const arrivals = [
  { name: 'Amelia Wilson', room: 'Ocean Suite · 508', time: '11:30 AM', initials: 'AW', tone: 'bg-[#e2c48b]' },
  { name: 'Ethan Carter', room: 'Deluxe King · 302', time: '12:15 PM', initials: 'EC', tone: 'bg-[#a7c9c2]' },
  { name: 'Sofia Martinez', room: 'Garden Room · 114', time: '1:00 PM', initials: 'SM', tone: 'bg-[#b9c5e6]' },
  { name: 'Noah Thompson', room: 'Executive Suite · 605', time: '2:30 PM', initials: 'NT', tone: 'bg-[#eab7a7]' },
];

const roomStatus = [
  { label: 'Occupied', value: 198, total: 287, color: 'bg-[#1d7668]' },
  { label: 'Available', value: 71, total: 287, color: 'bg-[#d4aa5e]' },
  { label: 'Out of service', value: 18, total: 287, color: 'bg-[#d8634b]' },
];

const tooltipStyle = {
  borderRadius: '12px',
  border: '1px solid #e8e5dd',
  boxShadow: '0 12px 28px rgba(23, 35, 53, 0.12)',
  fontSize: '12px',
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1500px] space-y-7">
      <section className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#a17b35]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4aa5e]" />
            Saturday, September 26
          </div>
          <h1 className="text-3xl font-bold tracking-[-0.055em] text-[#18283b] sm:text-[2.15rem]">Good morning, Jordan</h1>
          <p className="mt-2 text-sm text-[#7b8791]">Here&apos;s what&apos;s happening at Havenly today.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#e4e2dc] bg-white px-4 text-sm font-semibold text-[#405161] shadow-sm transition-colors hover:border-[#d0cdc5] hover:bg-[#fcfcfa]">
            <CalendarDays className="h-4 w-4 text-[#8b969f]" />
            Today
            <ChevronRight className="h-4 w-4 text-[#8b969f]" />
          </button>
          <button className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1d7668] px-4 text-sm font-bold text-white shadow-[0_8px_18px_rgba(29,118,104,0.23)] transition-all hover:-translate-y-0.5 hover:bg-[#176558]">
            <Plus className="h-4 w-4" />
            New booking
          </button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={icons[stat.icon as keyof typeof icons]}
            accent={cardAccents[index]}
          />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <article className="overflow-hidden rounded-[1.45rem] border border-[#e9e7e1] bg-white shadow-[0_10px_30px_rgba(23,35,53,0.045)] xl:col-span-2">
          <div className="flex flex-col gap-4 px-6 pb-1 pt-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.13em] text-[#89949d]">Revenue performance</p>
              <div className="mt-2 flex items-baseline gap-3">
                <h2 className="text-2xl font-bold tracking-[-0.05em] text-[#1b2c3e]">$45,231.00</h2>
                <span className="inline-flex items-center gap-0.5 text-xs font-bold text-[#168364]"><ArrowUpRight className="h-3.5 w-3.5" />8.2%</span>
              </div>
              <p className="mt-1 text-xs text-[#929ba2]">Compared with $41,798 last month</p>
            </div>
            <div className="flex rounded-xl bg-[#f5f5f1] p-1 text-xs font-semibold text-[#83909a]">
              <button className="rounded-lg px-3 py-1.5">Weekly</button>
              <button className="rounded-lg bg-white px-3 py-1.5 text-[#1e7668] shadow-sm">Monthly</button>
              <button className="rounded-lg px-3 py-1.5">Yearly</button>
            </div>
          </div>
          <div className="h-[257px] px-2 pt-4 sm:px-5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -12, bottom: 4 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#1d7668" stopOpacity={0.24} />
                    <stop offset="100%" stopColor="#1d7668" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#eeeDE7" strokeDasharray="3 3" />
                <XAxis axisLine={false} dataKey="month" tickLine={false} tick={{ fill: '#97a0a7', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#97a0a7', fontSize: 11 }} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']} contentStyle={tooltipStyle} cursor={{ stroke: '#d8d5cc', strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="revenue" stroke="#1d7668" strokeWidth={3} fill="url(#revenueFill)" activeDot={{ r: 5, fill: '#fff', stroke: '#1d7668', strokeWidth: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="relative overflow-hidden rounded-[1.45rem] bg-[#1a3448] p-6 text-white shadow-[0_13px_30px_rgba(23,52,72,0.18)]">
          <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full border-[18px] border-[#2d5369]" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.13em] text-[#abc1ce]">Live occupancy</p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.05em]">A busy Saturday</h2>
            </div>
            <button className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"><MoreHorizontal className="h-5 w-5" /></button>
          </div>
          <div className="relative mt-5 flex items-center gap-6">
            <div className="grid h-28 w-28 shrink-0 place-items-center rounded-full" style={{ background: 'conic-gradient(#d7ae63 0 69%, #36546a 69% 100%)' }}>
              <div className="grid h-[5.4rem] w-[5.4rem] place-items-center rounded-full bg-[#1a3448] text-center">
                <span className="text-2xl font-bold tracking-[-0.06em]">69%</span>
                <span className="-mt-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-[#abc1ce]">occupied</span>
              </div>
            </div>
            <div className="space-y-2.5 text-xs">
              <p><span className="font-bold text-[#f3d28f]">198</span> <span className="text-[#abc1ce]">rooms occupied</span></p>
              <p><span className="font-bold text-white">71</span> <span className="text-[#abc1ce]">rooms available</span></p>
              <p><span className="font-bold text-[#ffae9e]">18</span> <span className="text-[#abc1ce]">out of service</span></p>
            </div>
          </div>
          <button className="relative mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#f1ca82] transition-colors hover:text-white">View room status <ChevronRight className="h-3.5 w-3.5" /></button>
        </article>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <article className="rounded-[1.45rem] border border-[#e9e7e1] bg-white shadow-[0_10px_30px_rgba(23,35,53,0.045)] xl:col-span-2">
          <div className="flex items-center justify-between px-6 pb-4 pt-6">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.13em] text-[#89949d]">Today&apos;s arrivals</p>
              <h2 className="mt-1 text-xl font-bold tracking-[-0.04em] text-[#1b2c3e]">12 guests checking in</h2>
            </div>
            <button className="inline-flex items-center gap-1 text-xs font-bold text-[#1d7668] transition-colors hover:text-[#155e52]">View all <ChevronRight className="h-3.5 w-3.5" /></button>
          </div>
          <div className="overflow-x-auto px-3 pb-3 sm:px-4">
            <div className="min-w-[560px]">
              <div className="grid grid-cols-[1.4fr_1fr_0.7fr_0.5fr] gap-4 border-y border-[#efede8] px-3 py-3 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[#929ba2]">
                <span>Guest</span><span>Room</span><span>Arrival</span><span className="text-right">Status</span>
              </div>
              {arrivals.map((guest) => (
                <div key={guest.name} className="grid grid-cols-[1.4fr_1fr_0.7fr_0.5fr] items-center gap-4 border-b border-[#f1f0eb] px-3 py-3.5 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-9 w-9 place-items-center rounded-full text-[0.65rem] font-bold text-[#273847] ${guest.tone}`}>{guest.initials}</div>
                    <span className="text-sm font-bold text-[#2c3c4b]">{guest.name}</span>
                  </div>
                  <span className="text-xs font-medium text-[#77838d]">{guest.room}</span>
                  <span className="text-xs font-semibold text-[#536372]">{guest.time}</span>
                  <span className="justify-self-end inline-flex items-center gap-1.5 rounded-full bg-[#e8f6ef] px-2.5 py-1 text-[0.65rem] font-bold text-[#168364]"><Check className="h-3 w-3" />Confirmed</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-[1.45rem] border border-[#e9e7e1] bg-white p-6 shadow-[0_10px_30px_rgba(23,35,53,0.045)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.13em] text-[#89949d]">Bookings trend</p>
              <h2 className="mt-1 text-xl font-bold tracking-[-0.04em] text-[#1b2c3e]">142 this month</h2>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e7efff] text-[#265fc6]"><Sparkles className="h-4 w-4" /></span>
          </div>
          <div className="mt-4 h-[118px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: -10, left: -32, bottom: 0 }}>
                <Bar dataKey="bookings" fill="#d4aa5e" radius={[5, 5, 0, 0]} maxBarSize={21} />
                <XAxis axisLine={false} dataKey="month" tickLine={false} tick={{ fill: '#9aa2a9', fontSize: 10 }} />
                <YAxis hide />
                <Tooltip formatter={(value: number) => [value, 'Bookings']} contentStyle={tooltipStyle} cursor={{ fill: '#f8f4e9' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-3 border-t border-[#efede8] pt-4">
            {roomStatus.map((status) => (
              <div key={status.label}>
                <div className="mb-1.5 flex justify-between text-xs"><span className="font-semibold text-[#67747e]">{status.label}</span><span className="font-bold text-[#2c3c4b]">{status.value}</span></div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#f1f0eb]"><div className={`h-full rounded-full ${status.color}`} style={{ width: `${(status.value / status.total) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
