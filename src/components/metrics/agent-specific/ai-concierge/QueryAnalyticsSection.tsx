import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { QueryAnalytics } from '../../../../types/agentSpecific';
import { SectionHeader } from '../../../shared/SectionHeader';
import { KpiCard } from '../../../shared/KpiCard';
import { TOOLTIP_STYLE, TOOLTIP_LABEL, TOOLTIP_ITEM, CURSOR_STYLE, COLORS, AXIS_TICK, PIE_COLORS } from '../../../shared/chartConstants';

export function QueryAnalyticsSection({ data }: { data: QueryAnalytics }) {
  return (
    <section>
      <SectionHeader title="Query Analytics" description="Payment analysis queries by type — approval rates, declines, provider comparisons, and routing" />
      <div className="flex gap-4 mb-4">
        <KpiCard label="Total Queries" value={data.totalQueries} className="max-w-xs" />
      </div>

      <div className="yuno-card p-4 mb-4">
        <p className="text-sm text-yuno-muted mb-3">Queries by Category</p>
        <ResponsiveContainer width="100%" height={data.byCategory.length * 44}>
          <BarChart data={data.byCategory} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="category" width={150} tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL} itemStyle={TOOLTIP_ITEM} cursor={CURSOR_STYLE} />
            <Bar dataKey="count" name="Queries" radius={[0, 4, 4, 0]} barSize={18}>
              {data.byCategory.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">Top Queried Merchants</p>
          <div className="space-y-2">
            {data.topMerchants.map((m) => (
              <div key={m.name} className="flex justify-between items-center">
                <span className="text-sm text-yuno-text">{m.name}</span>
                <span className="text-sm font-mono text-yuno-muted">{m.queries}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">Top Queried Providers</p>
          <div className="space-y-2">
            {data.topProviders.map((p) => (
              <div key={p.name} className="flex justify-between items-center">
                <span className="text-sm text-yuno-text">{p.name}</span>
                <span className="text-sm font-mono text-yuno-muted">{p.queries}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
