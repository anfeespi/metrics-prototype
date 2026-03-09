export type TimeRange = '7d' | '30d' | '90d';

export interface Bot {
  id: string;
  name: string;
  type: string;
  active: boolean;
}

export interface UsageRate {
  uniqueUsers: number;
  invocations: number;
  topUsers: { user: string; calls: number }[];
  byTeam: { team: string; users: number; invocations: number }[];
  byChannel: { channel: string; users: number; invocations: number }[];
}

export interface OpenTicket {
  id: string;
  title: string;
  status: string;
  openSince: string;
}

export interface TaskCompletion {
  lastCronRun: string;
  cronIntervalHours: number;
  closed: number;
  open: number;
  openTickets: OpenTicket[];
}

export interface TimeToValue {
  avgMinutes: number;
  prevPeriodAvg: number;
  trend: { date: string; avgMinutes: number }[];
  distribution: { range: string; count: number }[];
}

export interface EstimatedCost {
  inputTokens: number;
  outputTokens: number;
  defaultInputTokenPrice: number;
  defaultOutputTokenPrice: number;
  defaultHourlyRate: number;
  baselineMinutesPerTask: number;
  tasksCompleted: number;
}

export interface ConversationEntry {
  date: string;
  durationMin: number;
  score: number;
  label: 'Positiva' | 'Neutral' | 'Negativa';
  summary: string;
}

export interface UserSatisfaction {
  score: number;
  prevScore: number;
  trend: { date: string; score: number }[];
  distribution: { label: string; count: number; color: string }[];
  recentConversations: ConversationEntry[];
}

export interface BotMetrics {
  usageRate: UsageRate;
  taskCompletion: TaskCompletion;
  timeToValue: TimeToValue;
  estimatedCost: EstimatedCost;
  userSatisfaction: UserSatisfaction;
}

export type MockData = Record<TimeRange, Record<string, BotMetrics>>;
