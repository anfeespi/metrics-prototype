import type { TimeRange } from './index';

// ── On-Call Guardian ──

export interface TicketTriage {
  totalTickets: number;
  mttrMinutes: number;
  avgFirstResponseMinutes: number;
  resolvedAutonomously: number;
  escalatedToSquad: number;
  byType: { type: string; count: number }[];
  escalationTargets: { squad: string; tickets: number }[];
  trend: { date: string; tickets: number }[];
}

export interface InvestigationPipeline {
  avgStepsPerTicket: number;
  steps: { step: string; usage: number }[];
}

export interface PrActivity {
  created: number;
  merged: number;
  avgTimeToMergeHours: number;
  byWeek: { week: string; created: number; merged: number }[];
}

export interface ToolUsage {
  tools: { tool: string; invocations: number }[];
}

export interface OnCallGuardianMetrics {
  agentType: 'on-call-guardian';
  ticketTriage: TicketTriage;
  investigationPipeline: InvestigationPipeline;
  prActivity: PrActivity;
  toolUsage: ToolUsage;
}

// ── AI Concierge (Juan Pablo) ──

export interface QueryAnalytics {
  totalQueries: number;
  byCategory: { category: string; count: number }[];
  topMerchants: { name: string; queries: number }[];
  topProviders: { name: string; queries: number }[];
}

export interface DataSourceUsage {
  sources: { name: string; queries: number }[];
  topTables: { table: string; queries: number }[];
}

export interface ProactiveAlerts {
  totalAlerts: number;
  byType: { type: string; count: number }[];
  topCountries: { country: string; alerts: number }[];
}

export interface AiConciergeMetrics {
  agentType: 'ai-concierge';
  queryAnalytics: QueryAnalytics;
  dataSourceUsage: DataSourceUsage;
  proactiveAlerts: ProactiveAlerts;
}

// ── TAM Agent (Maia) ──

export interface ClientSupport {
  totalQuestions: number;
  avgResponseMinutes: number;
  firstContactResolutionRate: number;
  topClients: { client: string; questions: number }[];
}

export interface EscalationFunnel {
  resolvedDirectly: number;
  escalatedToPylon: number;
  trend: { date: string; escalationRate: number }[];
}

export interface InvestigationDepth {
  avgToolsPerQuestion: number;
  toolUsage: { tool: string; invocations: number }[];
}

export interface TamAgentMetrics {
  agentType: 'tam-agent';
  clientSupport: ClientSupport;
  escalationFunnel: EscalationFunnel;
  investigationDepth: InvestigationDepth;
}

// ── Discriminated union ──

export type AgentSpecificMetrics =
  | OnCallGuardianMetrics
  | AiConciergeMetrics
  | TamAgentMetrics;

export type AgentSpecificMockData = Record<
  TimeRange,
  Record<string, AgentSpecificMetrics | undefined>
>;
