import type { ClientSupport } from '../../../../types/agentSpecific';
import { SectionHeader } from '../../../shared/SectionHeader';
import { KpiCard } from '../../../shared/KpiCard';

export function ClientSupportSection({ data }: { data: ClientSupport }) {
  return (
    <section>
      <SectionHeader title="Client Support" description="Questions handled, response time, and resolution rate" />
      <div className="flex gap-4 mb-4">
        <KpiCard label="Total Questions" value={data.totalQuestions} className="max-w-xs" />
        <KpiCard label="Avg Response Time" value={`${data.avgResponseMinutes} min`} className="max-w-xs" />
        <KpiCard label="First-Contact Resolution" value={`${data.firstContactResolutionRate}%`} className="max-w-xs" />
      </div>

      <div className="yuno-card p-4">
        <p className="text-sm text-yuno-muted mb-3">Top Clients by Question Count</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-yuno-muted border-b border-yuno-border">
              <th className="pb-2 font-medium">Client</th>
              <th className="pb-2 font-medium text-right">Questions</th>
            </tr>
          </thead>
          <tbody>
            {data.topClients.map((c) => (
              <tr key={c.client} className="border-b border-yuno-border/50">
                <td className="py-2 text-yuno-text">{c.client}</td>
                <td className="py-2 text-right font-mono text-yuno-muted">{c.questions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
