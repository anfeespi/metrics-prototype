import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { DataSourceUsage } from '../../../../types/agentSpecific';
import { SectionHeader } from '../../../shared/SectionHeader';
import { TOOLTIP_STYLE, TOOLTIP_LABEL, TOOLTIP_ITEM, CURSOR_STYLE, COLORS, AXIS_TICK, PIE_COLORS } from '../../../shared/chartConstants';

export function DataSourceUsageSection({ data }: { data: DataSourceUsage }) {
  return (
    <section>
      <SectionHeader title="Data Source Usage" description="Query distribution across StarRocks, Datadog, and GitHub integrations" />
      <div className="grid grid-cols-2 gap-4">
        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">Query Source Breakdown</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={data.sources} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="queries" nameKey="name" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} style={{ fontSize: 11 }}>
                {data.sources.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL} itemStyle={TOOLTIP_ITEM} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">Most Queried Tables</p>
          <ResponsiveContainer width="100%" height={data.topTables.length * 44}>
            <BarChart data={data.topTables} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="table" width={200} tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL} itemStyle={TOOLTIP_ITEM} cursor={CURSOR_STYLE} />
              <Bar dataKey="queries" name="Queries" radius={[0, 4, 4, 0]} barSize={18} fill={COLORS.secondary}>
                {data.topTables.map((_, i) => <Cell key={i} fill={COLORS.secondary} fillOpacity={1 - i * 0.15} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
