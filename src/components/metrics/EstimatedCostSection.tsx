import { useState } from 'react';
import type { EstimatedCost } from '../../types';
import { SectionHeader } from '../shared/SectionHeader';

function CostInput({ label, value, onChange, prefix }: { label: string; value: number; onChange: (v: number) => void; prefix: string }) {
  return (
    <label className="flex items-center justify-between text-sm">
      <span className="text-yuno-muted">{label}</span>
      <div className="flex items-center gap-1 bg-yuno-bg border border-yuno-border/40 rounded px-2 py-1">
        <span className="text-yuno-muted text-xs">{prefix}</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(+e.target.value)}
          className="w-20 bg-transparent text-yuno-text text-right text-sm outline-none"
        />
      </div>
    </label>
  );
}

export function EstimatedCostSection({ data }: { data: EstimatedCost }) {
  const [hourlyRate, setHourlyRate] = useState(data.defaultHourlyRate);
  const [inputPrice, setInputPrice] = useState(data.defaultInputTokenPrice);
  const [outputPrice, setOutputPrice] = useState(data.defaultOutputTokenPrice);
  const [baselineMin, setBaselineMin] = useState(data.baselineMinutesPerTask);

  const humanCost = (hourlyRate / 60) * baselineMin * data.tasksCompleted;
  const agentCost = (data.inputTokens / 1_000_000) * inputPrice + (data.outputTokens / 1_000_000) * outputPrice;
  const savings = humanCost - agentCost;
  const savingsPct = humanCost > 0 ? (savings / humanCost) * 100 : 0;
  const humanHours = (baselineMin * data.tasksCompleted) / 60;
  const agentHours = (data.tasksCompleted * 8.4) / 60;
  const hoursSaved = humanHours - agentHours;

  return (
    <section>
      <SectionHeader title="Estimated Time & Cost" description="ROI comparison between human baseline and AI agent performance" />
      <div className="grid grid-cols-3 gap-4">
        {/* Human column */}
        <div className="yuno-card p-5">
          <p className="text-sm font-medium text-yuno-text mb-4">👤 Human Baseline</p>
          <div className="space-y-3">
            <CostInput label="Hourly rate" value={hourlyRate} onChange={setHourlyRate} prefix="$" />
            <CostInput label="Min / task" value={baselineMin} onChange={setBaselineMin} prefix="" />
            <div className="pt-3 border-t border-yuno-border/30">
              <p className="text-xs text-yuno-muted">Tasks completed</p>
              <p className="text-lg font-semibold text-yuno-text">{data.tasksCompleted}</p>
            </div>
            <div>
              <p className="text-xs text-yuno-muted">Estimated time</p>
              <p className="text-lg font-semibold text-yuno-text">{humanHours.toFixed(1)}h</p>
            </div>
            <div>
              <p className="text-xs text-yuno-muted">Total cost</p>
              <p className="text-2xl font-bold text-accent-red">${humanCost.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Savings card */}
        <div className="rounded-2xl bg-gradient-to-b from-yuno-blue/5 to-accent-green/5 border border-yuno-blue/20 p-5 flex flex-col items-center justify-center text-center" style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.8), 0 4px 12px 0 rgba(62,79,224,0.08)' }}>
          <p className="text-sm text-yuno-muted mb-2">Net Savings</p>
          <p className="text-4xl font-bold text-accent-green">${savings.toFixed(2)}</p>
          <p className="text-lg font-semibold text-accent-green mt-1">{savingsPct.toFixed(1)}% saved</p>
          <div className="mt-4 pt-4 border-t border-yuno-border/30 w-full">
            <p className="text-sm text-yuno-muted">Time saved</p>
            <p className="text-2xl font-bold text-yuno-text">{hoursSaved.toFixed(1)}h</p>
          </div>
        </div>

        {/* Agent column */}
        <div className="yuno-card p-5">
          <p className="text-sm font-medium text-yuno-text mb-4">🤖 AI Agent</p>
          <div className="space-y-3">
            <CostInput label="Input $/1M tok" value={inputPrice} onChange={setInputPrice} prefix="$" />
            <CostInput label="Output $/1M tok" value={outputPrice} onChange={setOutputPrice} prefix="$" />
            <div className="pt-3 border-t border-yuno-border/30">
              <p className="text-xs text-yuno-muted">Input tokens</p>
              <p className="text-lg font-semibold text-yuno-text">{(data.inputTokens / 1_000_000).toFixed(2)}M</p>
            </div>
            <div>
              <p className="text-xs text-yuno-muted">Output tokens</p>
              <p className="text-lg font-semibold text-yuno-text">{(data.outputTokens / 1_000_000).toFixed(2)}M</p>
            </div>
            <div>
              <p className="text-xs text-yuno-muted">Total cost</p>
              <p className="text-2xl font-bold text-yuno-blue">${agentCost.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
