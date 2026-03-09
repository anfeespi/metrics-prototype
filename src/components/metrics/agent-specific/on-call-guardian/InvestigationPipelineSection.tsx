import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { InvestigationPipeline } from '../../../../types/agentSpecific';
import { SectionHeader } from '../../../shared/SectionHeader';
import { KpiCard } from '../../../shared/KpiCard';
import { TOOLTIP_STYLE, TOOLTIP_LABEL, TOOLTIP_ITEM, CURSOR_STYLE, COLORS, AXIS_TICK } from '../../../shared/chartConstants';

export function InvestigationPipelineSection({ data }: { data: InvestigationPipeline }) {
  return (
    <section>
      <SectionHeader title="Investigation Pipeline" description="Structured investigation steps — Memory Search, Datadog, Provider Analysis, Code, DB, and Docs" />
      <div className="flex gap-4 mb-4">
        <KpiCard label="Avg Steps / Ticket" value={data.avgStepsPerTicket} className="max-w-xs" />
      </div>

      <div className="yuno-card p-4">
        <p className="text-sm text-yuno-muted mb-3">Step Utilization (tickets using each step)</p>
        <ResponsiveContainer width="100%" height={data.steps.length * 44}>
          <BarChart data={data.steps} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="step" width={140} tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL} itemStyle={TOOLTIP_ITEM} cursor={CURSOR_STYLE} />
            <Bar dataKey="usage" name="Tickets" radius={[0, 4, 4, 0]} barSize={18} fill={COLORS.teal}>
              {data.steps.map((_, i) => <Cell key={i} fill={COLORS.teal} fillOpacity={1 - i * 0.12} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
