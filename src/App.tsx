import { useState } from 'react';
import type { TimeRange } from './types';
import { bots, mockData } from './data/mock';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { UsageRateSection } from './components/metrics/UsageRateSection';
import { TaskCompletionSection } from './components/metrics/TaskCompletionSection';
import { TimeToValueSection } from './components/metrics/TimeToValueSection';
import { HumanEscalationSection } from './components/metrics/HumanEscalationSection';
import { EstimatedCostSection } from './components/metrics/EstimatedCostSection';
import { UserSatisfactionSection } from './components/metrics/UserSatisfactionSection';
import { EmptyState } from './components/shared/EmptyState';

export default function App() {
  const [selectedBotId, setSelectedBotId] = useState(bots[0].id);
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  const metrics = mockData[timeRange][selectedBotId];
  const selectedBot = bots.find((b) => b.id === selectedBotId)!;

  return (
    <div className="flex h-screen overflow-hidden bg-yuno-bg text-yuno-text">
      <Sidebar bots={bots} selectedBotId={selectedBotId} onSelectBot={setSelectedBotId} />
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

          {!metrics ? (
            <EmptyState message="No data available for this agent in the selected period." />
          ) : (
            <div className="space-y-8">
              <UsageRateSection data={metrics.usageRate} />
              <TaskCompletionSection data={metrics.taskCompletion} />
              <TimeToValueSection data={metrics.timeToValue} />
              <HumanEscalationSection />
              <EstimatedCostSection data={metrics.estimatedCost} />
              <UserSatisfactionSection data={metrics.userSatisfaction} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
