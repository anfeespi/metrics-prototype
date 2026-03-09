import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import type { TicketTriage } from '../../../../types/agentSpecific';
import { SectionHeader } from '../../../shared/SectionHeader';
import { KpiCard } from '../../../shared/KpiCard';
import { TOOLTIP_STYLE, TOOLTIP_LABEL, TOOLTIP_ITEM, CURSOR_STYLE, COLORS, AXIS_TICK, LEGEND_STYLE, PIE_COLORS } from '../../../shared/chartConstants';

export function TicketTriageSection({ data }: { data: TicketTriage }) {
  const resolutionPie = [
    { name: 'Resolved Autonomously', value: data.resolvedAutonomously },
    { name: 'Escalated to Squad', value: data.escalatedToSquad },
  ];
  const resolutionColors = [COLORS.green, COLORS.orange];

  return (
    <section>
      <SectionHeader title="Ticket Triage & Resolution" description="On-call tickets classified, investigated, and resolved or escalated to the right squad" />
      <div className="flex gap-4 mb-4">
        <KpiCard label="Total Tickets" value={data.totalTickets} className="max-w-xs" />
        <KpiCard label="MTTR" value={`${data.mttrMinutes} min`} className="max-w-xs" />
        <KpiCard label="Avg First Response" value={`${data.avgFirstResponseMinutes} min`} className="max-w-xs" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">Resolution Breakdown</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={resolutionPie} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} style={{ fontSize: 11 }}>
                {resolutionPie.map((_, i) => <Cell key={i} fill={resolutionColors[i]} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL} itemStyle={TOOLTIP_ITEM} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">Tickets / Day</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.trend} margin={{ left: 0, right: 16, top: 8, bottom: 0 }}>
              <XAxis dataKey="date" tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={(v: string) => v.slice(5)} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL} itemStyle={TOOLTIP_ITEM} cursor={CURSOR_STYLE} />
              <Legend wrapperStyle={LEGEND_STYLE} />
              <Line type="monotone" dataKey="tickets" stroke={COLORS.primary} strokeWidth={2} dot={{ r: 3, fill: COLORS.primary }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">Tickets by Type</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={data.byType} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="count" nameKey="type" label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`} style={{ fontSize: 11 }}>
                {data.byType.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL} itemStyle={TOOLTIP_ITEM} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">Escalation Targets</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-yuno-muted border-b border-yuno-border">
                <th className="pb-2 font-medium">Squad</th>
                <th className="pb-2 font-medium text-right">Tickets</th>
              </tr>
            </thead>
            <tbody>
              {data.escalationTargets.map((t) => (
                <tr key={t.squad} className="border-b border-yuno-border/50">
                  <td className="py-2 text-yuno-text">{t.squad}</td>
                  <td className="py-2 text-right font-mono text-yuno-muted">{t.tickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
