import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import type { EscalationFunnel } from '../../../../types/agentSpecific';
import { SectionHeader } from '../../../shared/SectionHeader';
import { TOOLTIP_STYLE, TOOLTIP_LABEL, TOOLTIP_ITEM, CURSOR_STYLE, COLORS, AXIS_TICK, LEGEND_STYLE } from '../../../shared/chartConstants';

export function EscalationFunnelSection({ data }: { data: EscalationFunnel }) {
  const pieData = [
    { name: 'Resolved Directly', value: data.resolvedDirectly },
    { name: 'Escalated to Pylon', value: data.escalatedToPylon },
  ];
  const pieColors = [COLORS.green, COLORS.primary];

  return (
    <section>
      <SectionHeader title="Escalation Funnel" description="How Maia routes queries — resolving directly or escalating to Pylon when human support is needed" />
      <div className="grid grid-cols-2 gap-4">
        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">Resolution Breakdown</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} style={{ fontSize: 11 }}>
                {pieData.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL} itemStyle={TOOLTIP_ITEM} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">Escalation Activity Over Time (%)</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.trend} margin={{ left: 0, right: 16, top: 8, bottom: 0 }}>
              <XAxis dataKey="date" tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(v: string) => v.slice(5)} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={30} unit="%" />
              <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL} itemStyle={TOOLTIP_ITEM} cursor={CURSOR_STYLE} />
              <Legend wrapperStyle={LEGEND_STYLE} />
              <Line type="monotone" dataKey="escalationRate" name="Escalation Rate" stroke={COLORS.primary} strokeWidth={2} dot={{ r: 3, fill: COLORS.primary }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
