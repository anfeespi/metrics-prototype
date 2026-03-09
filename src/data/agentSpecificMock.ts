import type {
  AgentSpecificMockData,
  OnCallGuardianMetrics,
  AiConciergeMetrics,
  TamAgentMetrics,
} from '../types/agentSpecific';

function generateOnCallGuardian(scale: number): OnCallGuardianMetrics {
  const s = (v: number) => Math.round(v * scale);
  return {
    agentType: 'on-call-guardian',
    ticketTriage: {
      totalTickets: s(34),
      mttrMinutes: +(42.3 / Math.sqrt(scale)).toFixed(1),
      avgFirstResponseMinutes: +(3.7 / Math.sqrt(scale)).toFixed(1),
      resolvedAutonomously: s(26),
      escalatedToSquad: s(8),
      byType: [
        { type: 'Bug', count: s(14) },
        { type: 'Incident', count: s(12) },
        { type: 'Informational', count: s(8) },
      ],
      escalationTargets: [
        { squad: 'Integration On-Schedule', tickets: s(3) },
        { squad: 'Payments Core', tickets: s(2) },
        { squad: 'Checkout', tickets: s(2) },
        { squad: 'Platform', tickets: s(1) },
      ],
      trend: [
        { date: '2026-03-03', tickets: s(6) },
        { date: '2026-03-04', tickets: s(4) },
        { date: '2026-03-05', tickets: s(7) },
        { date: '2026-03-06', tickets: s(3) },
        { date: '2026-03-07', tickets: s(5) },
        { date: '2026-03-08', tickets: s(4) },
        { date: '2026-03-09', tickets: s(5) },
      ],
    },
    investigationPipeline: {
      avgStepsPerTicket: 4.2,
      steps: [
        { step: 'Memory Search', usage: s(32) },
        { step: 'Datadog Logs', usage: s(30) },
        { step: 'Provider Response', usage: s(22) },
        { step: 'Code Analysis', usage: s(18) },
        { step: 'Database Check', usage: s(14) },
        { step: 'Documentation', usage: s(10) },
      ],
    },
    prActivity: {
      created: s(18),
      merged: s(14),
      avgTimeToMergeHours: +(6.2 / Math.sqrt(scale)).toFixed(1),
      byWeek: [
        { week: 'W09', created: s(5), merged: s(4) },
        { week: 'W10', created: s(7), merged: s(5) },
        { week: 'W11', created: s(6), merged: s(5) },
      ],
    },
    toolUsage: {
      tools: [
        { tool: 'Datadog', invocations: s(124) },
        { tool: 'Jira', invocations: s(98) },
        { tool: 'GitHub', invocations: s(87) },
        { tool: 'Memory Search', invocations: s(64) },
        { tool: 'Confluence', invocations: s(45) },
        { tool: 'Redash', invocations: s(32) },
        { tool: 'Kingdom', invocations: s(21) },
        { tool: 'Drone CI', invocations: s(16) },
      ],
    },
  };
}

function generateAiConcierge(scale: number): AiConciergeMetrics {
  const s = (v: number) => Math.round(v * scale);
  return {
    agentType: 'ai-concierge',
    queryAnalytics: {
      totalQueries: s(186),
      byCategory: [
        { category: 'Approval Rate Analysis', count: s(58) },
        { category: 'Decline / Rejection Analysis', count: s(44) },
        { category: 'Provider Comparison', count: s(36) },
        { category: 'Routing Performance', count: s(26) },
        { category: 'Transaction Lookup', count: s(22) },
      ],
      topMerchants: [
        { name: 'Rappi', queries: s(28) },
        { name: 'InDrive', queries: s(22) },
        { name: 'Whop', queries: s(18) },
        { name: 'Petrobras Premmia', queries: s(14) },
        { name: 'Bold', queries: s(11) },
      ],
      topProviders: [
        { name: 'dLocal', queries: s(34) },
        { name: 'Adyen', queries: s(27) },
        { name: 'Stripe', queries: s(21) },
        { name: 'MercadoPago', queries: s(16) },
        { name: 'Bamboo', queries: s(12) },
      ],
    },
    dataSourceUsage: {
      sources: [
        { name: 'StarRocks', queries: s(142) },
        { name: 'Datadog', queries: s(44) },
        { name: 'GitHub', queries: s(18) },
      ],
      topTables: [
        { table: 'payment_transaction_partition', queries: s(128) },
        { table: 'payment_links', queries: s(8) },
        { table: 'refunds', queries: s(6) },
      ],
    },
    proactiveAlerts: {
      totalAlerts: s(12),
      byType: [
        { type: 'Approval Rate Drop', count: s(4) },
        { type: 'Error Pattern Spike', count: s(3) },
        { type: 'Provider Degradation', count: s(2) },
        { type: 'Geographic Anomaly', count: s(2) },
        { type: 'Routing Inefficiency', count: s(1) },
      ],
      topCountries: [
        { country: 'Colombia', alerts: s(4) },
        { country: 'Brazil', alerts: s(3) },
        { country: 'Mexico', alerts: s(3) },
        { country: 'Peru', alerts: s(1) },
        { country: 'Chile', alerts: s(1) },
      ],
    },
  };
}

function generateTamAgent(scale: number): TamAgentMetrics {
  const s = (v: number) => Math.round(v * scale);
  return {
    agentType: 'tam-agent',
    clientSupport: {
      totalQuestions: s(112),
      avgResponseMinutes: +(4.8 / Math.sqrt(scale)).toFixed(1),
      firstContactResolutionRate: 78.5,
      topClients: [
        { client: 'Rappi', questions: s(24) },
        { client: 'InDrive', questions: s(19) },
        { client: 'Whop', questions: s(16) },
        { client: 'Treinta', questions: s(13) },
        { client: 'Uber', questions: s(10) },
      ],
    },
    escalationFunnel: {
      resolvedDirectly: s(87),
      escalatedToPylon: s(25),
      trend: [
        { date: '2026-03-03', escalationRate: 24 },
        { date: '2026-03-04', escalationRate: 21 },
        { date: '2026-03-05', escalationRate: 26 },
        { date: '2026-03-06', escalationRate: 19 },
        { date: '2026-03-07', escalationRate: 22 },
        { date: '2026-03-08', escalationRate: 18 },
        { date: '2026-03-09', escalationRate: 20 },
      ],
    },
    investigationDepth: {
      avgToolsPerQuestion: 3.4,
      toolUsage: [
        { tool: 'StarRocks', invocations: s(156) },
        { tool: 'Datadog', invocations: s(89) },
        { tool: 'Knowledge Base', invocations: s(67) },
        { tool: 'Docs', invocations: s(43) },
        { tool: 'Memory', invocations: s(28) },
      ],
    },
  };
}

function buildAgentSpecificData(scale: number): Record<string, AgentSpecificMockData[keyof AgentSpecificMockData][string]> {
  return {
    'on-call-guardian': generateOnCallGuardian(scale),
    'ai-concierge': generateAiConcierge(scale),
    'tam-agent': generateTamAgent(scale),
  };
}

export const agentSpecificMockData: AgentSpecificMockData = {
  '7d': buildAgentSpecificData(1),
  '30d': buildAgentSpecificData(3.5),
  '90d': buildAgentSpecificData(9),
};
