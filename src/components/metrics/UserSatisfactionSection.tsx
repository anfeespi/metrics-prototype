import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell } from 'recharts';
import type { UserSatisfaction } from '../../types';
import { SectionHeader } from '../shared/SectionHeader';

const TOOLTIP_STYLE = { backgroundColor: '#161d35', border: '1px solid #2a3459', borderRadius: 8, color: '#e2e8f0', fontSize: 12 };
const SENTIMENT_COLORS: Record<string, string> = { green: '#22c55e', yellow: '#eab308', red: '#ef4444' };
const LABEL_COLORS: Record<string, string> = { Positiva: 'text-accent-green', Neutral: 'text-accent-yellow', Negativa: 'text-accent-red' };

function ScoreGauge({ score }: { score: number }) {
  const color = score > 70 ? 'text-accent-green' : score > 50 ? 'text-accent-yellow' : 'text-accent-red';
  const bg = score > 70 ? 'bg-accent-green/10' : score > 50 ? 'bg-accent-yellow/10' : 'bg-accent-red/10';
  return (
    <div className={`rounded-xl ${bg} border border-navy-700 p-6 flex flex-col items-center justify-center`}>
      <p className="text-sm text-slate-400 mb-1">Satisfaction Score</p>
      <p className={`text-5xl font-bold ${color}`}>{score}</p>
      <p className="text-xs text-slate-500 mt-1">out of 100</p>
    </div>
  );
}

export function UserSatisfactionSection({ data }: { data: UserSatisfaction }) {
  const pctChange = ((data.score - data.prevScore) / data.prevScore) * 100;

  return (
    <section>
      <SectionHeader title="User Satisfaction Score" description="LLM-evaluated sentiment analysis of agent conversations" />

      <div className="grid grid-cols-4 gap-4 mb-4">
        <ScoreGauge score={data.score} />
        <div className="rounded-xl bg-navy-800 border border-navy-700 p-4 flex flex-col justify-center">
          <p className="text-sm text-slate-400 mb-1">vs Previous Period</p>
          <p className={`text-lg font-semibold ${pctChange >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
            {pctChange >= 0 ? '↑' : '↓'} {Math.abs(pctChange).toFixed(1)}%
          </p>
          <p className="text-xs text-slate-500 mt-1">from {data.prevScore}</p>
        </div>
        <div className="col-span-2 rounded-xl bg-navy-800 border border-navy-700 p-4">
          <p className="text-sm text-slate-400 mb-3">Sentiment Distribution</p>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={data.distribution} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="label" width={70} tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: '#e2e8f0' }} itemStyle={{ color: '#e2e8f0' }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={18}>
                {data.distribution.map((entry, i) => <Cell key={i} fill={SENTIMENT_COLORS[entry.color]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-navy-800 border border-navy-700 p-4">
          <p className="text-sm text-slate-400 mb-3">Score Trend</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.trend} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
              <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: '#e2e8f0' }} itemStyle={{ color: '#e2e8f0' }} />
              <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl bg-navy-800 border border-navy-700 p-4 overflow-x-auto">
          <p className="text-sm text-slate-400 mb-3">Recent Conversations</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-navy-700">
                <th className="pb-2 pr-2">Date</th>
                <th className="pb-2 pr-2">Dur.</th>
                <th className="pb-2 pr-2">Score</th>
                <th className="pb-2 pr-2">Label</th>
                <th className="pb-2">Summary</th>
              </tr>
            </thead>
            <tbody>
              {data.recentConversations.map((c, i) => (
                <tr key={i} className="border-b border-navy-700/50">
                  <td className="py-2 pr-2 text-slate-400 text-xs whitespace-nowrap">
                    {new Date(c.date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-2 pr-2 text-slate-300 text-xs">{c.durationMin}m</td>
                  <td className="py-2 pr-2 text-white font-medium text-xs">{c.score}</td>
                  <td className={`py-2 pr-2 text-xs font-medium ${LABEL_COLORS[c.label]}`}>{c.label}</td>
                  <td className="py-2 text-slate-400 text-xs truncate max-w-xs">{c.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
