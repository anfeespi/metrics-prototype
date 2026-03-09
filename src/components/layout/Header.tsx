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
    <header className="h-14 bg-yuno-card border-b border-yuno-border/40 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-base font-semibold text-yuno-text">AI Agents Metrics</h1>
        <span className="text-xs text-yuno-muted">Yuno Payments</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-yuno-muted">
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <div className="flex bg-yuno-bg rounded-lg p-0.5 border border-yuno-border/40">
          {ranges.map((r) => (
            <button
              key={r.value}
              onClick={() => onTimeRangeChange(r.value)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                timeRange === r.value
                  ? 'bg-yuno-blue text-white'
                  : 'text-yuno-muted hover:text-yuno-text'
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
