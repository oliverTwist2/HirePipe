import React from "react";

const Header = ({ onOpenModal }) => {
  const handleAddClick = () => {
    onOpenModal();
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-600/30">
            HP
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">HirePipe</h1>
            <p className="text-xs text-slate-400">Candidate Hiring Pipeline</p>
          </div>
        </div>

        <button
          onClick={handleAddClick}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-sm transition-colors duration-150"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add candidate
        </button>
      </div>
    </header>
  );
};

export default Header;
