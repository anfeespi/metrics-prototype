import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { PrActivity } from '../../../../types/agentSpecific';
import { SectionHeader } from '../../../shared/SectionHeader';
import { KpiCard } from '../../../shared/KpiCard';
import { TOOLTIP_STYLE, TOOLTIP_LABEL, TOOLTIP_ITEM, CURSOR_STYLE, COLORS, AXIS_TICK, LEGEND_STYLE } from '../../../shared/chartConstants';

export function PrActivitySection({ data }: { data: PrActivity }) {
  return (
    <section>
      <SectionHeader title="Hotfix PR Activity" description="Pull requests created from incident investigations, merged, and time to merge" />
      <div className="flex gap-4 mb-4">
        <KpiCard label="PRs Created" value={data.created} className="max-w-xs" />
        <KpiCard label="PRs Merged" value={data.merged} className="max-w-xs" />
        <KpiCard label="Avg Time to Merge" value={`${data.avgTimeToMergeHours}h`} className="max-w-xs" />
      </div>

      <div className="yuno-card p-4">
        <p className="text-sm text-yuno-muted mb-3">Created vs Merged by Week</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.byWeek} margin={{ left: 0, right: 16, top: 8, bottom: 0 }}>
            <XAxis dataKey="week" tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={30} />
            <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL} itemStyle={TOOLTIP_ITEM} cursor={CURSOR_STYLE} />
            <Legend wrapperStyle={LEGEND_STYLE} />
            <Bar dataKey="created" name="Created" fill={COLORS.primary} radius={[4, 4, 0, 0]} barSize={24} />
            <Bar dataKey="merged" name="Merged" fill={COLORS.green} radius={[4, 4, 0, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
