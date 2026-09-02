import React from "react";
import useCandidateStore from "../store/useCandidateStore";
import { STAGES } from "../constants/stages";

const SearchBar = () => {
  const searchQuery = useCandidateStore((state) => state.searchQuery);
  const stageFilter = useCandidateStore((state) => state.stageFilter);
  const setSearchQuery = useCandidateStore((state) => state.setSearchQuery);
  const setStageFilter = useCandidateStore((state) => state.setStageFilter);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setStageFilter(value === "ALL" ? null : value);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStageFilter(null);
  };

  const hasActiveFilters = searchQuery.trim() !== "" || stageFilter !== null;

  return (
    <div className="bg-slate-900/40 border-b border-slate-800/40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by candidate name, email, or role..."
            className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-lg text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={stageFilter || "ALL"}
            onChange={handleFilterChange}
            className="w-full sm:w-48 py-2 px-3 bg-slate-800/80 border border-slate-700/80 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all cursor-pointer"
          >
            <option value="ALL">All Stages</option>
            {STAGES.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
