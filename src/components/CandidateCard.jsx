import React from "react";
import useCandidateStore from "../store/useCandidateStore";
import { TERMINAL_STAGES } from "../constants/stages";

const CandidateCard = ({ candidate, onOpen }) => {
  const passCandidate = useCandidateStore((state) => state.passCandidate);
  const failCandidate = useCandidateStore((state) => state.failCandidate);

  const isTerminal = TERMINAL_STAGES.includes(candidate.stage);

  const handleCardClick = () => {
    onOpen(candidate);
  };

  const handlePass = (event) => {
    event.stopPropagation();
    passCandidate(candidate.id);
  };

  const handleFail = (event) => {
    event.stopPropagation();
    failCandidate(candidate.id);
  };

  const renderStars = () => {
    if (!candidate.rating) {
      return <span className="text-xs text-slate-500 italic">Unrated</span>;
    }

    const maxRating = 5;
    return (
      <div className="flex items-center gap-0.5" title={`Rating: ${candidate.rating}/5`}>
        {Array.from({ length: maxRating }).map((_, index) => {
          const isFilled = index < candidate.rating;
          return (
            <svg
              key={index}
              className={`w-3.5 h-3.5 ${isFilled ? "text-amber-400 fill-amber-400" : "text-slate-600 fill-slate-700"}`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        })}
      </div>
    );
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-slate-800/90 border border-slate-700/70 hover:border-indigo-500/50 rounded-xl p-4 shadow-sm hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-slate-100 text-sm group-hover:text-indigo-300 transition-colors">
            {candidate.name}
          </h4>
          {candidate.email && (
            <span className="text-[10px] text-slate-400 bg-slate-700/50 px-1.5 py-0.5 rounded truncate max-w-[120px]">
              {candidate.email}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-300 mt-0.5">{candidate.role}</p>
        {candidate.stage === "Rejected" && candidate.failedAtStage && (
          <p className="text-xs text-rose-400 font-medium mt-1.5">
            Failed at: {candidate.failedAtStage}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-700/40">
        <div>{renderStars()}</div>

        {!isTerminal && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleFail}
              title="Fail candidate"
              className="px-2 py-1 text-xs font-medium rounded-md bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20 transition-colors"
            >
              Fail
            </button>
            <button
              type="button"
              onClick={handlePass}
              title="Pass candidate to next stage"
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm"
            >
              Pass
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;
