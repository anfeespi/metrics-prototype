import { clsx } from 'clsx';

interface KpiCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: number; label: string };
  className?: string;
}

export function KpiCard({ label, value, subtitle, trend, className }: KpiCardProps) {
  return (
    <div className={clsx('rounded-xl bg-navy-800 border border-navy-700 p-5', className)}>
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
      {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
      {trend && (
        <p className={clsx('text-sm mt-2 font-medium', trend.value < 0 ? 'text-accent-green' : 'text-accent-red')}>
          {trend.value < 0 ? '↓' : '↑'} {Math.abs(trend.value).toFixed(1)}% {trend.label}
        </p>
      )}
    </div>
  );
}
