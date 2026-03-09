import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { ProactiveAlerts } from '../../../../types/agentSpecific';
import { SectionHeader } from '../../../shared/SectionHeader';
import { KpiCard } from '../../../shared/KpiCard';
import { TOOLTIP_STYLE, TOOLTIP_LABEL, TOOLTIP_ITEM, CURSOR_STYLE, AXIS_TICK, PIE_COLORS } from '../../../shared/chartConstants';

export function ProactiveAlertsSection({ data }: { data: ProactiveAlerts }) {
  return (
    <section>
      <SectionHeader title="Proactive Monitoring" description="Alerts triggered autonomously — approval drops, error spikes, provider degradation, and geographic anomalies" />
      <div className="flex gap-4 mb-4">
        <KpiCard label="Total Alerts Triggered" value={data.totalAlerts} className="max-w-xs" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">Alerts by Type</p>
          <ResponsiveContainer width="100%" height={data.byType.length * 44}>
            <BarChart data={data.byType} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="type" width={160} tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL} itemStyle={TOOLTIP_ITEM} cursor={CURSOR_STYLE} />
              <Bar dataKey="count" name="Alerts" radius={[0, 4, 4, 0]} barSize={18}>
                {data.byType.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">Top Countries by Alert Volume</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-yuno-muted border-b border-yuno-border">
                <th className="pb-2 font-medium">Country</th>
                <th className="pb-2 font-medium text-right">Alerts</th>
              </tr>
            </thead>
            <tbody>
              {data.topCountries.map((c) => (
                <tr key={c.country} className="border-b border-yuno-border/50">
                  <td className="py-2 text-yuno-text">{c.country}</td>
                  <td className="py-2 text-right font-mono text-yuno-muted">{c.alerts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
