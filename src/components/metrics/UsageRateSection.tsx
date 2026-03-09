import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { UsageRate } from '../../types';
import { SectionHeader } from '../shared/SectionHeader';
import { KpiCard } from '../shared/KpiCard';

const BAR_COLOR = '#3b82f6';
const TOOLTIP_STYLE = { backgroundColor: '#161d35', border: '1px solid #2a3459', borderRadius: 8, color: '#e2e8f0', fontSize: 12 };

export function UsageRateSection({ data }: { data: UsageRate }) {
  return (
    <section>
      <SectionHeader title="Usage Rate" description="Unique users who interacted with this agent in the selected period" />
      <KpiCard label="Unique Users" value={data.uniqueUsers} className="mb-4 max-w-xs" />
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-navy-800 border border-navy-700 p-4">
          <p className="text-sm text-slate-400 mb-3">By Team</p>
          <ResponsiveContainer width="100%" height={data.byTeam.length * 36}>
            <BarChart data={data.byTeam} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="team" width={90} tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(59,130,246,0.08)' }} />
              <Bar dataKey="users" radius={[0, 4, 4, 0]} barSize={20}>
                {data.byTeam.map((_, i) => <Cell key={i} fill={BAR_COLOR} fillOpacity={1 - i * 0.08} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl bg-navy-800 border border-navy-700 p-4">
          <p className="text-sm text-slate-400 mb-3">By Channel</p>
          <ResponsiveContainer width="100%" height={data.byChannel.length * 36}>
            <BarChart data={data.byChannel} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="channel" width={120} tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(59,130,246,0.08)' }} />
              <Bar dataKey="users" radius={[0, 4, 4, 0]} barSize={20} fill={BAR_COLOR} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
