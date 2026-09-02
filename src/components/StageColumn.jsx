import React from "react";
import CandidateCard from "./CandidateCard";

const StageColumn = ({ stage, candidates, onOpen }) => {
  const candidateCount = candidates.length;
  const isEmpty = candidateCount === 0;

  const getBadgeStyle = () => {
    if (stage === "Accepted") return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    if (stage === "Rejected") return "bg-rose-500/20 text-rose-400 border-rose-500/30";
    return "bg-slate-700/60 text-slate-300 border-slate-600/50";
  };

  return (
    <div className="flex-1 min-w-[280px] max-w-[320px] bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col h-full shadow-lg">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <h3 className="font-semibold text-slate-200 text-sm tracking-wide flex items-center gap-2">
          {stage}
        </h3>
        <span
          className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getBadgeStyle()}`}
        >
          {candidateCount}
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
        {isEmpty ? (
          <div className="flex-1 min-h-[120px] flex items-center justify-center p-6 border-2 border-dashed border-slate-800/80 rounded-xl">
            <span className="text-xs text-slate-500 font-medium">No candidates here</span>
          </div>
        ) : (
          candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} onOpen={onOpen} />
          ))
        )}
      </div>
    </div>
  );
};

export default StageColumn;
