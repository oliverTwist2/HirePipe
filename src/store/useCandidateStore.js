import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STAGES } from "../constants/stages";

const INITIAL_CANDIDATES = [
  {
    id: "seed-1",
    name: "Ada Okafor",
    email: "ada.okafor@example.com",
    role: "Backend Engineer",
    stage: "Interview",
    rating: 4,
    notes: "Strong Python and distributed systems background. Completed technical screen with flying colors.",
    dateAdded: "2026-08-28T09:00:00Z",
    stageHistory: [
      { stage: "Applied", timestamp: "2026-08-28T09:00:00Z" },
      { stage: "Interview", timestamp: "2026-08-30T14:30:00Z" }
    ]
  },
  {
    id: "seed-2",
    name: "Marcus Vance",
    email: "marcus.vance@example.com",
    role: "Frontend Developer",
    stage: "Applied",
    rating: null,
    notes: "Applied via LinkedIn. Great React portfolio.",
    dateAdded: "2026-09-01T11:15:00Z",
    stageHistory: [
      { stage: "Applied", timestamp: "2026-09-01T11:15:00Z" }
    ]
  },
  {
    id: "seed-3",
    name: "Elena Rostova",
    email: "elena.r@example.com",
    role: "Fullstack Engineer",
    stage: "Test",
    rating: 5,
    notes: "Take-home test submitted. Code structure is exceptionally clean.",
    dateAdded: "2026-08-25T16:00:00Z",
    stageHistory: [
      { stage: "Applied", timestamp: "2026-08-25T16:00:00Z" },
      { stage: "Interview", timestamp: "2026-08-27T10:00:00Z" },
      { stage: "Test", timestamp: "2026-08-29T15:00:00Z" }
    ]
  },
  {
    id: "seed-4",
    name: "Devon Chen",
    email: "devon.chen@example.com",
    role: "DevOps Engineer",
    stage: "Offer",
    rating: 5,
    notes: "Offer extended. Waiting on decision regarding start date.",
    dateAdded: "2026-08-20T08:30:00Z",
    stageHistory: [
      { stage: "Applied", timestamp: "2026-08-20T08:30:00Z" },
      { stage: "Interview", timestamp: "2026-08-22T11:00:00Z" },
      { stage: "Test", timestamp: "2026-08-24T14:00:00Z" },
      { stage: "Offer", timestamp: "2026-08-31T16:45:00Z" }
    ]
  },
  {
    id: "seed-5",
    name: "Sophia Martinez",
    email: "sophia.m@example.com",
    role: "Product Designer",
    stage: "Accepted",
    rating: 4,
    notes: "Accepted offer! Starting next month.",
    dateAdded: "2026-08-15T13:20:00Z",
    stageHistory: [
      { stage: "Applied", timestamp: "2026-08-15T13:20:00Z" },
      { stage: "Interview", timestamp: "2026-08-18T09:30:00Z" },
      { stage: "Test", timestamp: "2026-08-21T13:00:00Z" },
      { stage: "Offer", timestamp: "2026-08-26T10:00:00Z" },
      { stage: "Accepted", timestamp: "2026-08-28T17:00:00Z" }
    ]
  },
  {
    id: "seed-6",
    name: "James Wilson",
    email: "jwilson@example.com",
    role: "QA Automation Lead",
    stage: "Rejected",
    failedAtStage: "Interview",
    rating: 2,
    notes: "Looking for more hands-on Playwright experience than presented.",
    dateAdded: "2026-08-18T10:00:00Z",
    stageHistory: [
      { stage: "Applied", timestamp: "2026-08-18T10:00:00Z" },
      { stage: "Interview", timestamp: "2026-08-20T15:00:00Z" },
      { stage: "Rejected", timestamp: "2026-08-22T12:00:00Z" }
    ]
  }
];

const useCandidateStore = create(
  persist(
    (set, get) => ({
      candidates: INITIAL_CANDIDATES,
      searchQuery: "",
      stageFilter: null,

      addCandidate: (data) => {
        const candidate = {
          id: crypto.randomUUID(),
          dateAdded: new Date().toISOString(),
          stage: "Applied",
          failedAtStage: null,
          rating: null,
          notes: "",
          stageHistory: [{ stage: "Applied", timestamp: new Date().toISOString() }],
          ...data,
        };
        set((state) => ({ candidates: [...state.candidates, candidate] }));
      },

      updateCandidate: (id, changes) => {
        set((state) => ({
          candidates: state.candidates.map((c) =>
            c.id === id ? { ...c, ...changes } : c
          ),
        }));
      },

      passCandidate: (id) => {
        const { candidates } = get();
        const candidate = candidates.find((c) => c.id === id);
        if (!candidate) return;

        const nextStage = candidate.stage === "Offer" ? "Accepted" : STAGES[STAGES.indexOf(candidate.stage) + 1];
        const historyEntry = { stage: nextStage, timestamp: new Date().toISOString() };

        set((state) => ({
          candidates: state.candidates.map((c) =>
            c.id === id
              ? { ...c, stage: nextStage, stageHistory: [...c.stageHistory, historyEntry] }
              : c
          ),
        }));
      },

      failCandidate: (id) => {
        const { candidates } = get();
        const candidate = candidates.find((c) => c.id === id);
        if (!candidate) return;

        const historyEntry = { stage: "Rejected", timestamp: new Date().toISOString() };

        set((state) => ({
          candidates: state.candidates.map((c) =>
            c.id === id
              ? {
                  ...c,
                  stage: "Rejected",
                  failedAtStage: candidate.stage,
                  stageHistory: [...c.stageHistory, historyEntry],
                }
              : c
          ),
        }));
      },

      deleteCandidate: (id) => {
        set((state) => ({
          candidates: state.candidates.filter((c) => c.id !== id),
        }));
      },

      setSearchQuery: (query) => set({ searchQuery: query }),
      setStageFilter: (stage) => set({ stageFilter: stage }),
    }),
    { name: "hirepipe-store" }
  )
);

export default useCandidateStore;
