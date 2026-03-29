import React from 'react';
import { AnalysisResult } from '@/src/types';
import Markdown from 'react-markdown';
import { TrendingUp, Recycle, Users, ShieldAlert } from 'lucide-react';

interface ResultsViewProps {
  result: AnalysisResult;
  companyName: string;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, companyName }) => {
  return (
    <div className="space-y-6">
      {/* Header Scores */}
      <div className="terminal-card p-8 flex flex-col md:flex-row items-center gap-8 border-glow">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              fill="transparent"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              fill="transparent"
              stroke="var(--color-terminal-green)"
              strokeWidth="8"
              strokeDasharray={364}
              strokeDashoffset={364 - (364 * result.scores.total) / 100}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold glow-green">{result.scores.total}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase">ESG Score</span>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-2">{companyName}</h2>
          <div className="flex flex-wrap gap-4">
            <div className="bg-terminal-green/10 border border-terminal-green/30 px-3 py-1 rounded">
              <span className="text-[10px] text-terminal-green font-bold uppercase mr-2">Rating:</span>
              <span className="text-sm font-bold text-terminal-green">B - GOOD</span>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-[10px] text-gray-500 uppercase font-bold">Env</div>
                <div className="text-lg font-bold text-terminal-green">{result.scores.environment}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-gray-500 uppercase font-bold">Soc</div>
                <div className="text-lg font-bold text-terminal-green">{result.scores.social}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-gray-500 uppercase font-bold">Gov</div>
                <div className="text-lg font-bold text-terminal-green">{result.scores.governance}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="terminal-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-terminal-green" />
            <span className="text-[10px] font-bold uppercase text-gray-500">Carbon Footprint</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{result.metrics.carbon_tco2e.toFixed(2)}</span>
            <span className="text-[10px] text-gray-500">tonnes CO2e</span>
          </div>
          <div className="mt-2 h-1 bg-black rounded-full overflow-hidden">
            <div className="h-full bg-terminal-green w-[65%]" />
          </div>
        </div>

        <div className="terminal-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Recycle className="w-4 h-4 text-terminal-green" />
            <span className="text-[10px] font-bold uppercase text-gray-500">Waste Diversion</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{result.metrics.waste_diversion_pct}%</span>
            <span className="text-[10px] text-gray-500">recycled</span>
          </div>
          <div className="mt-2 h-1 bg-black rounded-full overflow-hidden">
            <div className="h-full bg-terminal-green w-[40%]" />
          </div>
        </div>

        <div className="terminal-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-terminal-green" />
            <span className="text-[10px] font-bold uppercase text-gray-500">Diversity</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{result.metrics.diversity_pct}%</span>
            <span className="text-[10px] text-gray-500">leadership</span>
          </div>
          <div className="mt-2 h-1 bg-black rounded-full overflow-hidden">
            <div className="h-full bg-terminal-green w-[25%]" />
          </div>
        </div>
      </div>

      {/* Narrative Report */}
      <div className="terminal-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <ShieldAlert className="w-5 h-5 text-terminal-green" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">Agent Intelligence Report</h2>
        </div>
        <div className="prose prose-invert max-w-none prose-sm prose-green">
          <Markdown>{result.report}</Markdown>
        </div>
      </div>
    </div>
  );
};
