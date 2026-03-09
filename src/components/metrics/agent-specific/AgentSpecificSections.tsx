import type { AgentSpecificMetrics } from '../../../types/agentSpecific';
import { TicketTriageSection } from './on-call-guardian/TicketTriageSection';
import { InvestigationPipelineSection } from './on-call-guardian/InvestigationPipelineSection';
import { PrActivitySection } from './on-call-guardian/PrActivitySection';
import { ToolUsageSection } from './on-call-guardian/ToolUsageSection';
import { QueryAnalyticsSection } from './ai-concierge/QueryAnalyticsSection';
import { DataSourceUsageSection } from './ai-concierge/DataSourceUsageSection';
import { ProactiveAlertsSection } from './ai-concierge/ProactiveAlertsSection';
import { ClientSupportSection } from './tam-agent/ClientSupportSection';
import { EscalationFunnelSection } from './tam-agent/EscalationFunnelSection';
import { InvestigationDepthSection } from './tam-agent/InvestigationDepthSection';

interface Props {
  data: AgentSpecificMetrics;
}

export function AgentSpecificSections({ data }: Props) {
  switch (data.agentType) {
    case 'on-call-guardian':
      return (
        <>
          <TicketTriageSection data={data.ticketTriage} />
          <InvestigationPipelineSection data={data.investigationPipeline} />
          <PrActivitySection data={data.prActivity} />
          <ToolUsageSection data={data.toolUsage} />
        </>
      );
    case 'ai-concierge':
      return (
        <>
          <QueryAnalyticsSection data={data.queryAnalytics} />
          <ProactiveAlertsSection data={data.proactiveAlerts} />
          <DataSourceUsageSection data={data.dataSourceUsage} />
        </>
      );
    case 'tam-agent':
      return (
        <>
          <ClientSupportSection data={data.clientSupport} />
          <EscalationFunnelSection data={data.escalationFunnel} />
          <InvestigationDepthSection data={data.investigationDepth} />
        </>
      );
    default:
      return null;
  }
}
