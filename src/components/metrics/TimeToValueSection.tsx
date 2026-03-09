import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell } from 'recharts';
import type { TimeToValue } from '../../types';
import { SectionHeader } from '../shared/SectionHeader';
import { KpiCard } from '../shared/KpiCard';

const TOOLTIP_STYLE = { backgroundColor: '#ffffff', border: '1px solid rgba(188,192,210,0.4)', borderRadius: 8, color: '#282a30', fontSize: 12 };
const DIST_COLORS = ['#22c55e', '#3e4fe0', '#eab308', '#ef4444'];

export function TimeToValueSection({ data }: { data: TimeToValue }) {
  const pctChange = ((data.avgMinutes - data.prevPeriodAvg) / data.prevPeriodAvg) * 100;

  return (
    <section>
      <SectionHeader title="Time to Value" description="Average resolution time from conversation start to task closure" />
      <KpiCard
        label="Avg. Resolution Time"
        value={`${data.avgMinutes} min`}
        trend={{ value: pctChange, label: 'vs prev. period' }}
        className="mb-4 max-w-xs"
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">Trend</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.trend} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: '#8e95a5', fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
              <YAxis tick={{ fill: '#8e95a5', fontSize: 11 }} domain={['dataMin - 1', 'dataMax + 1']} />
              <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: '#282a30' }} itemStyle={{ color: '#282a30' }} />
              <Line type="monotone" dataKey="avgMinutes" stroke="#3e4fe0" strokeWidth={2} dot={{ fill: '#3e4fe0', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="yuno-card p-4">
          <p className="text-sm text-yuno-muted mb-3">Distribution</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.distribution} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
              <XAxis dataKey="range" tick={{ fill: '#8e95a5', fontSize: 11 }} />
              <YAxis tick={{ fill: '#8e95a5', fontSize: 11 }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: '#282a30' }} itemStyle={{ color: '#282a30' }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                {data.distribution.map((_, i) => <Cell key={i} fill={DIST_COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
