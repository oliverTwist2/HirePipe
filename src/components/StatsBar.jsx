import React from "react";
import useCandidateStore from "../store/useCandidateStore";
import { STAGES } from "../constants/stages";

const StatsBar = () => {
  const candidates = useCandidateStore((state) => state.candidates);

  const totalCandidates = candidates.length;
  const countByStage = STAGES.reduce((acc, stage) => {
    acc[stage] = candidates.filter((candidate) => candidate.stage === stage).length;
    return acc;
  }, {});

  return (
    <div className="bg-slate-900/60 border-b border-slate-800/60 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-x-auto text-xs py-1 scrollbar-none">
        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700/60 text-slate-300 font-medium whitespace-nowrap">
          <span>Total Candidates:</span>
          <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-bold">{totalCandidates}</span>
        </div>

        <div className="h-4 w-px bg-slate-800 shrink-0" />

        <div className="flex items-center gap-2">
          {STAGES.map((stage) => {
            const stageCount = countByStage[stage] || 0;
            return (
              <div
                key={stage}
                className="flex items-center gap-1.5 bg-slate-800/40 px-2.5 py-1.5 rounded-md border border-slate-800 text-slate-400 whitespace-nowrap"
              >
                <span>{stage}:</span>
                <span className="font-semibold text-slate-200">{stageCount}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
