import type { Bot, BotMetrics, MockData } from '../types';

export const bots: Bot[] = [
  { id: 'on-call-guardian', name: 'On-Call Guardian', type: 'AI Agent', active: true },
  { id: 'ai-concierge', name: 'AI Concierge (Yuno)', type: 'AI Agent', active: true },
  { id: 'sentinel', name: 'Sentinel', type: 'AI Agent', active: true },
  { id: 'partnerships-agent', name: 'Partnerships Agent', type: 'AI Agent', active: true },
  { id: 'feature-request-bot', name: 'Feature Request Bot', type: 'AI Agent', active: true },
  { id: 'tam-agent', name: 'TAM Agent', type: 'AI Agent', active: true },
  { id: 'personal-assistant', name: 'Personal Assistant (x20)', type: 'Personal Assistant', active: true },
  { id: 'roz-finance', name: 'Roz Finance Agent', type: 'AI Agent (In Dev)', active: false },
];

function generateMetrics(seed: number, scale: number): BotMetrics {
  const s = (v: number) => Math.round(v * scale);
  return {
    usageRate: {
      uniqueUsers: s(47 + seed * 3),
      byTeam: [
        { team: 'Core', users: s(12 + seed) },
        { team: 'Engineering', users: s(10 + seed * 0.5) },
        { team: 'TAM', users: s(8) },
        { team: 'Dashboard', users: s(6) },
        { team: 'Support', users: s(5) },
        { team: 'KAM', users: s(3) },
        { team: 'CEO Office', users: s(2) },
        { team: 'Finance', users: s(1) },
      ],
      byChannel: [
        { channel: '#product-tech', users: s(18) },
        { channel: '#on-call', users: s(12) },
        { channel: '#partnerships', users: s(7) },
        { channel: '#feature-requests', users: s(6) },
        { channel: '#rappi', users: s(4) },
      ],
    },
    taskCompletion: {
      lastCronRun: '2026-03-09T14:32:00Z',
      cronIntervalHours: 6,
      closed: s(8 + seed),
      open: s(3 + Math.floor(seed / 2)),
      openTickets: [
        { id: 'JIRA-1042', title: 'Payment approval rate drop on Rappi merchants', status: 'In Progress', openSince: '2026-03-09T08:00:00Z' },
        { id: 'JIRA-1039', title: '3DS timeout on InDrive Brasil', status: 'Open', openSince: '2026-03-08T16:00:00Z' },
        { id: 'PYLON-204', title: 'Webhook not firing on successful transactions', status: 'Open', openSince: '2026-03-09T10:15:00Z' },
      ],
    },
    timeToValue: {
      avgMinutes: +(8.4 + seed * 0.3).toFixed(1),
      prevPeriodAvg: +(9.6 + seed * 0.2).toFixed(1),
      trend: [
        { date: '2026-03-03', avgMinutes: +(10.2 + seed * 0.1).toFixed(1) },
        { date: '2026-03-04', avgMinutes: +(9.8 + seed * 0.1).toFixed(1) },
        { date: '2026-03-05', avgMinutes: +(9.1 + seed * 0.1).toFixed(1) },
        { date: '2026-03-06', avgMinutes: +(8.7 + seed * 0.1).toFixed(1) },
        { date: '2026-03-07', avgMinutes: +(8.0 + seed * 0.1).toFixed(1) },
        { date: '2026-03-08', avgMinutes: +(8.9 + seed * 0.1).toFixed(1) },
        { date: '2026-03-09', avgMinutes: +(8.4 + seed * 0.1).toFixed(1) },
      ],
      distribution: [
        { range: '<5 min', count: s(18) },
        { range: '5–15 min', count: s(27) },
        { range: '15–30 min', count: s(9) },
        { range: '>30 min', count: s(4) },
      ],
    },
    estimatedCost: {
      inputTokens: s(1_240_000),
      outputTokens: s(380_000),
      defaultInputTokenPrice: 3.0,
      defaultOutputTokenPrice: 15.0,
      defaultHourlyRate: 55,
      baselineMinutesPerTask: 30,
      tasksCompleted: s(42),
    },
    userSatisfaction: {
      score: Math.min(100, 76 + seed * 2),
      prevScore: 71 + seed,
      trend: [
        { date: '2026-03-03', score: 70 + seed },
        { date: '2026-03-04', score: 72 + seed },
        { date: '2026-03-05', score: 74 + seed },
        { date: '2026-03-06', score: 73 + seed },
        { date: '2026-03-07', score: 78 + seed },
        { date: '2026-03-08', score: 75 + seed },
        { date: '2026-03-09', score: 76 + seed },
      ],
      distribution: [
        { label: 'Positiva', count: s(38), color: 'green' },
        { label: 'Neutral', count: s(14), color: 'yellow' },
        { label: 'Negativa', count: s(6), color: 'red' },
      ],
      recentConversations: [
        { date: '2026-03-09T13:10:00Z', durationMin: 6, score: 88, label: 'Positiva', summary: 'El agente resolvió el análisis de approval rate correctamente en una sola vuelta.' },
        { date: '2026-03-09T11:45:00Z', durationMin: 14, score: 52, label: 'Neutral', summary: 'El usuario obtuvo respuesta parcial; tuvo que reformular la pregunta dos veces.' },
        { date: '2026-03-09T09:30:00Z', durationMin: 22, score: 31, label: 'Negativa', summary: 'El agente no logró conectar con Datadog y el usuario cerró la conversación sin resolución.' },
      ],
    },
  };
}

function buildDataForRange(scale: number): Record<string, BotMetrics> {
  const result: Record<string, BotMetrics> = {};
  bots.forEach((bot, i) => {
    result[bot.id] = generateMetrics(i, scale);
  });
  return result;
}

export const mockData: MockData = {
  '7d': buildDataForRange(1),
  '30d': buildDataForRange(3.5),
  '90d': buildDataForRange(9),
};
