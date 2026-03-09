import type { TimeRange } from '../../types';

interface HeaderProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

const ranges: { value: TimeRange; label: string }[] = [
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
  { value: '90d', label: '90 days' },
];

export function Header({ timeRange, onTimeRangeChange }: HeaderProps) {
  return (
    <header className="h-14 bg-navy-900 border-b border-navy-700 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-base font-semibold text-white">AI Agents Metrics</h1>
        <span className="text-xs text-slate-500">Yuno Payments</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <div className="flex bg-navy-800 rounded-lg p-0.5 border border-navy-700">
          {ranges.map((r) => (
            <button
              key={r.value}
              onClick={() => onTimeRangeChange(r.value)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                timeRange === r.value
                  ? 'bg-electric-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
