import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  accent?: 'gold' | 'blue' | 'coral' | 'mint';
}

const accents = {
  gold: 'bg-[#fff4d8] text-[#9a6500] ring-[#f6d98f]',
  blue: 'bg-[#e7efff] text-[#265fc6] ring-[#bcd1ff]',
  coral: 'bg-[#ffebe6] text-[#c95a41] ring-[#ffcabc]',
  mint: 'bg-[#e3f6ee] text-[#167c5c] ring-[#aae2ce]',
};

export function StatCard({ title, value, change, icon: Icon, accent = 'blue' }: StatCardProps) {
  const isPositive = change.startsWith('+');
  
  return (
    <article className="group relative overflow-hidden rounded-[1.35rem] border border-[#e9e7e1] bg-white p-5 shadow-[0_10px_30px_rgba(23,35,53,0.045)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(23,35,53,0.09)]">
      <div className="absolute right-0 top-0 h-20 w-20 translate-x-7 -translate-y-7 rounded-full bg-[#f8f6f0] transition-transform duration-300 group-hover:scale-125" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.13em] text-[#85909a]">{title}</p>
          <p className="mt-3 text-[1.7rem] font-bold leading-none tracking-[-0.055em] text-[#18283b]">{value}</p>
        </div>
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ring-1 ${accents[accent]}`}>
          <Icon className="h-5 w-5" strokeWidth={2.1} />
        </span>
      </div>
      <div className="relative mt-5 flex items-center gap-1.5 text-xs">
        <span className={`inline-flex items-center gap-0.5 font-bold ${isPositive ? 'text-[#168364]' : 'text-[#d6654d]'}`}>
          {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          {change}
        </span>
        <span className="text-[#98a1a9]">vs. last month</span>
      </div>
    </article>
  );
}
