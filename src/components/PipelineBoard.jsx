import React from "react";
import Fuse from "fuse.js";
import useCandidateStore from "../store/useCandidateStore";
import { STAGES } from "../constants/stages";
import StageColumn from "./StageColumn";

const PipelineBoard = ({ onOpenModal }) => {
  const candidates = useCandidateStore((state) => state.candidates);
  const searchQuery = useCandidateStore((state) => state.searchQuery);
  const stageFilter = useCandidateStore((state) => state.stageFilter);

  // Fuse.js threshold of 0.3 allows minor typos without returning junk results
  const fuse = new Fuse(candidates, {
    keys: ["name", "email", "role"],
    threshold: 0.3,
  });

  const searchedCandidates = searchQuery.trim()
    ? fuse.search(searchQuery.trim()).map((result) => result.item)
    : candidates;

  const visibleCandidates = stageFilter
    ? searchedCandidates.filter((candidate) => candidate.stage === stageFilter)
    : searchedCandidates;

  return (
    <main className="flex-1 p-6 overflow-x-auto min-h-0">
      <div className="flex gap-4 h-full min-w-max pb-4">
        {STAGES.map((stage) => {
          const stageCandidates = visibleCandidates.filter(
            (candidate) => candidate.stage === stage
          );
          return (
            <StageColumn
              key={stage}
              stage={stage}
              candidates={stageCandidates}
              onOpen={onOpenModal}
            />
          );
        })}
      </div>
    </main>
  );
};

export default PipelineBoard;
