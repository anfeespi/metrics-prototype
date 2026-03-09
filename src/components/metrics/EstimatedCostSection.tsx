import { useState } from 'react';
import { EstimatedCost } from '../../types';
import { SectionHeader } from '../shared/SectionHeader';

function CostInput({ label, value, onChange, prefix }: { label: string; value: number; onChange: (v: number) => void; prefix: string }) {
  return (
    <label className="flex items-center justify-between text-sm">
      <span className="text-slate-400">{label}</span>
      <div className="flex items-center gap-1 bg-navy-900 border border-navy-600 rounded px-2 py-1">
        <span className="text-slate-500 text-xs">{prefix}</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(+e.target.value)}
          className="w-20 bg-transparent text-white text-right text-sm outline-none"
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
  const agentHours = (data.tasksCompleted * 8.4) / 60; // using avg from time to value
  const hoursSaved = humanHours - agentHours;

  return (
    <section>
      <SectionHeader title="Estimated Time & Cost" description="ROI comparison between human baseline and AI agent performance" />
      <div className="grid grid-cols-3 gap-4">
        {/* Human column */}
        <div className="rounded-xl bg-navy-800 border border-navy-700 p-5">
          <p className="text-sm font-medium text-slate-300 mb-4">👤 Human Baseline</p>
          <div className="space-y-3">
            <CostInput label="Hourly rate" value={hourlyRate} onChange={setHourlyRate} prefix="$" />
            <CostInput label="Min / task" value={baselineMin} onChange={setBaselineMin} prefix="" />
            <div className="pt-3 border-t border-navy-700">
              <p className="text-xs text-slate-500">Tasks completed</p>
              <p className="text-lg font-semibold text-white">{data.tasksCompleted}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Estimated time</p>
              <p className="text-lg font-semibold text-white">{humanHours.toFixed(1)}h</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Total cost</p>
              <p className="text-2xl font-bold text-accent-red">${humanCost.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Savings card */}
        <div className="rounded-xl bg-gradient-to-b from-electric-500/10 to-accent-green/10 border border-electric-500/30 p-5 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-slate-400 mb-2">Net Savings</p>
          <p className="text-4xl font-bold text-accent-green">${savings.toFixed(2)}</p>
          <p className="text-lg font-semibold text-accent-green mt-1">{savingsPct.toFixed(1)}% saved</p>
          <div className="mt-4 pt-4 border-t border-navy-700/50 w-full">
            <p className="text-sm text-slate-400">Time saved</p>
            <p className="text-2xl font-bold text-white">{hoursSaved.toFixed(1)}h</p>
          </div>
        </div>

        {/* Agent column */}
        <div className="rounded-xl bg-navy-800 border border-navy-700 p-5">
          <p className="text-sm font-medium text-slate-300 mb-4">🤖 AI Agent</p>
          <div className="space-y-3">
            <CostInput label="Input $/1M tok" value={inputPrice} onChange={setInputPrice} prefix="$" />
            <CostInput label="Output $/1M tok" value={outputPrice} onChange={setOutputPrice} prefix="$" />
            <div className="pt-3 border-t border-navy-700">
              <p className="text-xs text-slate-500">Input tokens</p>
              <p className="text-lg font-semibold text-white">{(data.inputTokens / 1_000_000).toFixed(2)}M</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Output tokens</p>
              <p className="text-lg font-semibold text-white">{(data.outputTokens / 1_000_000).toFixed(2)}M</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Total cost</p>
              <p className="text-2xl font-bold text-electric-400">${agentCost.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
