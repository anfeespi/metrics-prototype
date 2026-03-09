import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import type { UsageRate } from '../../types';
import { SectionHeader } from '../shared/SectionHeader';
import { KpiCard } from '../shared/KpiCard';

const BAR_COLOR = '#3e4fe0';
const INVOC_COLOR = '#7c8cf5';
const TOOLTIP_STYLE = { backgroundColor: '#ffffff', border: '1px solid rgba(188,192,210,0.4)', borderRadius: 8, color: '#282a30', fontSize: 12 };
const TOOLTIP_LABEL = { color: '#282a30' };
const TOOLTIP_ITEM = { color: '#282a30' };

export function UsageRateSection({ data }: { data: UsageRate }) {
  return (
    <section>
      <SectionHeader title="Usage Rate" description="Unique users and total invocations in the selected period" />
      <div className="flex gap-4 mb-4">
        <KpiCard label="Unique Users" value={data.uniqueUsers} className="max-w-xs" />
        <KpiCard label="Total Invocations" value={data.invocations} className="max-w-xs" />
      </div>

      {/* Top Users */}
      <div className="yuno-card p-4 mb-4">
        <p className="text-sm text-yuno-muted mb-3">Top Users</p>
        <div className="flex gap-6 flex-wrap">
          {data.topUsers.map((u) => (
            <div key={u.user} className="flex items-center gap-2">
              <span className="text-sm text-yuno-text font-mono">{u.user}</span>
              <span className="text-xs text-yuno-muted">{u.calls} calls</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">By Team</p>
          <ResponsiveContainer width="100%" height={data.byTeam.length * 40}>
            <BarChart data={data.byTeam} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="team" width={90} tick={{ fill: '#8e95a5', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL} itemStyle={TOOLTIP_ITEM} cursor={{ fill: 'rgba(62,79,224,0.06)' }} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#8e95a5' }} />
              <Bar dataKey="users" name="Users" radius={[0, 4, 4, 0]} barSize={14} fill={BAR_COLOR}>
                {data.byTeam.map((_, i) => <Cell key={i} fill={BAR_COLOR} fillOpacity={1 - i * 0.06} />)}
              </Bar>
              <Bar dataKey="invocations" name="Invocations" radius={[0, 4, 4, 0]} barSize={14} fill={INVOC_COLOR}>
                {data.byTeam.map((_, i) => <Cell key={i} fill={INVOC_COLOR} fillOpacity={1 - i * 0.06} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">By Channel</p>
          <ResponsiveContainer width="100%" height={data.byChannel.length * 40}>
            <BarChart data={data.byChannel} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="channel" width={120} tick={{ fill: '#8e95a5', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={TOOLTIP_LABEL} itemStyle={TOOLTIP_ITEM} cursor={{ fill: 'rgba(62,79,224,0.06)' }} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#8e95a5' }} />
              <Bar dataKey="users" name="Users" radius={[0, 4, 4, 0]} barSize={14} fill={BAR_COLOR} />
              <Bar dataKey="invocations" name="Invocations" radius={[0, 4, 4, 0]} barSize={14} fill={INVOC_COLOR} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
