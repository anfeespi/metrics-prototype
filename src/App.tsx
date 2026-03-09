import { useState } from 'react';
import type { TimeRange } from './types';
import { bots, mockData } from './data/mock';
import { agentSpecificMockData } from './data/agentSpecificMock';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { UsageRateSection } from './components/metrics/UsageRateSection';
import { TaskCompletionSection } from './components/metrics/TaskCompletionSection';
import { TimeToValueSection } from './components/metrics/TimeToValueSection';
import { HumanEscalationSection } from './components/metrics/HumanEscalationSection';
import { EstimatedCostSection } from './components/metrics/EstimatedCostSection';
import { UserSatisfactionSection } from './components/metrics/UserSatisfactionSection';
import { AgentSpecificSections } from './components/metrics/agent-specific/AgentSpecificSections';
import { EmptyState } from './components/shared/EmptyState';

type MetricsView = 'general' | 'specific';

export default function App() {
  const [selectedBotId, setSelectedBotId] = useState(bots[0].id);
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [view, setView] = useState<MetricsView>('specific');

  const metrics = mockData[timeRange][selectedBotId];
  const agentSpecific = agentSpecificMockData[timeRange][selectedBotId];
  const selectedBot = bots.find((b) => b.id === selectedBotId)!;

  const handleSelectBot = (id: string) => {
    setSelectedBotId(id);
    setView('specific');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-yuno-bg text-yuno-text">
      <Sidebar bots={bots} selectedBotId={selectedBotId} onSelectBot={handleSelectBot} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header timeRange={timeRange} onTimeRangeChange={setTimeRange} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-yuno-text">{selectedBot.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-yuno-muted">{selectedBot.type}</span>
              <span className={`w-2 h-2 rounded-full ${selectedBot.active ? 'bg-accent-green' : 'bg-yuno-muted'}`} />
              <span className="text-xs text-yuno-muted">{selectedBot.active ? 'Active' : 'In Development'}</span>
            </div>
          </div>

          {agentSpecific && (
            <div className="flex gap-1 mb-6 border-b border-yuno-border">
              <button
                onClick={() => setView('specific')}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                  view === 'specific'
                    ? 'text-yuno-text'
                    : 'text-yuno-muted hover:text-yuno-text'
                }`}
              >
                Agent-Specific Metrics
                {view === 'specific' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3e4fe0] rounded-full" />
                )}
              </button>
              <button
                onClick={() => setView('general')}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                  view === 'general'
                    ? 'text-yuno-text'
                    : 'text-yuno-muted hover:text-yuno-text'
                }`}
              >
                General Metrics
                {view === 'general' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3e4fe0] rounded-full" />
                )}
              </button>
            </div>
          )}

          {!metrics ? (
            <EmptyState message="No data available for this agent in the selected period." />
          ) : view === 'general' || !agentSpecific ? (
            <div className="space-y-8">
              <UsageRateSection data={metrics.usageRate} />
              <TaskCompletionSection data={metrics.taskCompletion} />
              <TimeToValueSection data={metrics.timeToValue} />
              <HumanEscalationSection />
              <EstimatedCostSection data={metrics.estimatedCost} />
              <UserSatisfactionSection data={metrics.userSatisfaction} />
            </div>
          ) : (
            <div className="space-y-8">
              <AgentSpecificSections data={agentSpecific} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
