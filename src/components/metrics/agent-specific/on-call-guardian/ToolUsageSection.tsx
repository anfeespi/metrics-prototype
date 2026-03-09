import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { ToolUsage } from '../../../../types/agentSpecific';
import { SectionHeader } from '../../../shared/SectionHeader';
import { TOOLTIP_STYLE, TOOLTIP_LABEL, TOOLTIP_ITEM, CURSOR_STYLE, COLORS, AXIS_TICK } from '../../../shared/chartConstants';

export function ToolUsageSection({ data }: { data: ToolUsage }) {
  return (
    <section>
      <SectionHeader title="Tool Usage" description="Invocations across Datadog, Jira, GitHub, Memory Search, and other integrations" />
      <div className="yuno-card p-4">
        <ResponsiveContainer width="100%" height={data.tools.length * 44}>
          <BarChart data={data.tools} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="tool" width={100} tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL} itemStyle={TOOLTIP_ITEM} cursor={CURSOR_STYLE} />
            <Bar dataKey="invocations" name="Invocations" radius={[0, 4, 4, 0]} barSize={18} fill={COLORS.primary}>
              {data.tools.map((_, i) => <Cell key={i} fill={COLORS.primary} fillOpacity={1 - i * 0.08} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
