import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { InvestigationDepth } from '../../../../types/agentSpecific';
import { SectionHeader } from '../../../shared/SectionHeader';
import { KpiCard } from '../../../shared/KpiCard';
import { TOOLTIP_STYLE, TOOLTIP_LABEL, TOOLTIP_ITEM, CURSOR_STYLE, COLORS, AXIS_TICK } from '../../../shared/chartConstants';

export function InvestigationDepthSection({ data }: { data: InvestigationDepth }) {
  return (
    <section>
      <SectionHeader title="Investigation Depth" description="Average tools used per question and tool usage breakdown" />
      <div className="flex gap-4 mb-4">
        <KpiCard label="Avg Tools / Question" value={data.avgToolsPerQuestion} className="max-w-xs" />
      </div>

      <div className="yuno-card p-4">
        <p className="text-sm text-yuno-muted mb-3">Usage by Tool</p>
        <ResponsiveContainer width="100%" height={data.toolUsage.length * 44}>
          <BarChart data={data.toolUsage} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="tool" width={120} tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL} itemStyle={TOOLTIP_ITEM} cursor={CURSOR_STYLE} />
            <Bar dataKey="invocations" name="Invocations" radius={[0, 4, 4, 0]} barSize={18} fill={COLORS.teal}>
              {data.toolUsage.map((_, i) => <Cell key={i} fill={COLORS.teal} fillOpacity={1 - i * 0.1} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
