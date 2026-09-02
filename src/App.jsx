import React, { useState } from "react";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import SearchBar from "./components/SearchBar";
import PipelineBoard from "./components/PipelineBoard";
import CandidateModal from "./components/CandidateModal";

const App = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (candidate = null) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCandidate(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden">
      <Header onOpenModal={openModal} />
      <StatsBar />
      <SearchBar />
      <PipelineBoard onOpenModal={openModal} />

      {isModalOpen && (
        <CandidateModal candidate={selectedCandidate} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
