import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { TaskCompletion } from '../../types';
import { SectionHeader } from '../shared/SectionHeader';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3_600_000);
  const mins = Math.floor(diff / 60_000);
  if (hours > 24) return `${Math.floor(hours / 24)}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${mins}m ago`;
}

export function TaskCompletionSection({ data }: { data: TaskCompletion }) {
  const lastRunDate = new Date(data.lastCronRun);
  const hoursSinceRun = (Date.now() - lastRunDate.getTime()) / 3_600_000;
  const isStale = hoursSinceRun > 8;

  const pieData = [
    { name: 'Closed', value: data.closed, color: '#22c55e' },
    { name: 'Open', value: data.open, color: '#ef4444' },
  ];

  return (
    <section>
      <SectionHeader title="Task Completion" description="Jira/Pylon tickets tracked by cron job running every 6 hours" />

      <div className={`rounded-lg px-4 py-2 mb-4 text-sm flex items-center gap-2 ${isStale ? 'bg-accent-yellow/10 border border-accent-yellow/30' : 'yuno-card'}`}>
        {isStale && <span className="px-2 py-0.5 bg-accent-yellow/20 text-accent-yellow rounded text-xs font-medium">Warning</span>}
        <span className={isStale ? 'text-accent-yellow' : 'text-yuno-muted'}>
          Last cron update: {lastRunDate.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </span>
        {isStale && <span className="text-accent-yellow text-xs">({Math.round(hoursSinceRun)}h ago — exceeds 8h threshold)</span>}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="yuno-card p-4 flex flex-col items-center justify-center">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Pie data={pieData} innerRadius={40} outerRadius={60} dataKey="value" strokeWidth={0}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-sm">
            <span className="text-accent-green">{data.closed} closed</span>
            <span className="text-accent-red">{data.open} open</span>
          </div>
        </div>

        <div className="col-span-2 yuno-card p-4 overflow-x-auto">
          <p className="text-sm text-yuno-muted mb-3">Open Tickets</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-yuno-muted border-b border-yuno-border/40">
                <th className="pb-2 pr-3">ID</th>
                <th className="pb-2 pr-3">Title</th>
                <th className="pb-2 pr-3">Status</th>
                <th className="pb-2">Open Since</th>
              </tr>
            </thead>
            <tbody>
              {data.openTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-yuno-border/20">
                  <td className="py-2 pr-3 text-yuno-blue font-mono text-xs">{ticket.id}</td>
                  <td className="py-2 pr-3 text-yuno-text max-w-xs truncate">{ticket.title}</td>
                  <td className="py-2 pr-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${ticket.status === 'In Progress' ? 'bg-yuno-blue-light text-yuno-blue' : 'bg-accent-yellow/15 text-accent-yellow'}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-2 text-yuno-muted text-xs">{timeAgo(ticket.openSince)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
