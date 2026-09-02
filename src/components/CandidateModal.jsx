import React, { useState } from "react";
import useCandidateStore from "../store/useCandidateStore";

const CandidateModal = ({ candidate, onClose }) => {
  const addCandidate = useCandidateStore((state) => state.addCandidate);
  const updateCandidate = useCandidateStore((state) => state.updateCandidate);
  const deleteCandidate = useCandidateStore((state) => state.deleteCandidate);

  const isEditing = Boolean(candidate);

  const [formData, setFormData] = useState({
    name: candidate?.name || "",
    email: candidate?.email || "",
    role: candidate?.role || "",
    rating: candidate?.rating || null,
    notes: candidate?.notes || "",
  });

  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "name" && value.trim()) {
      setFormError("");
    }
  };

  const handleStarClick = (ratingValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: prev.rating === ratingValue ? null : ratingValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name.trim()) {
      setFormError("Name is required");
      return;
    }

    if (isEditing) {
      updateCandidate(candidate.id, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role.trim(),
        rating: formData.rating,
        notes: formData.notes.trim(),
      });
    } else {
      addCandidate({
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role.trim(),
        rating: formData.rating,
        notes: formData.notes.trim(),
      });
    }

    onClose();
  };

  const handleDelete = () => {
    if (candidate) {
      deleteCandidate(candidate.id);
      onClose();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <h2 className="text-lg font-bold text-slate-100">
            {isEditing ? "Edit Candidate" : "Add Candidate"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Candidate Name <span className="text-indigo-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Ada Okafor"
              className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
            {formError && <p className="text-xs text-rose-400 mt-1">{formError}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. ada@example.com"
              className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Role / Position
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Backend Engineer"
              className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Rating
            </label>
            <div className="flex items-center gap-1.5 bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/60 w-fit">
              {[1, 2, 3, 4, 5].map((starValue) => {
                const isSelected = formData.rating && starValue <= formData.rating;
                return (
                  <button
                    key={starValue}
                    type="button"
                    onClick={() => handleStarClick(starValue)}
                    className="p-1 rounded hover:scale-110 transition-transform focus:outline-none"
                    title={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
                  >
                    <svg
                      className={`w-6 h-6 ${
                        isSelected
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-600 fill-slate-700 hover:text-slate-500"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                );
              })}
              <span className="text-xs text-slate-400 ml-2 font-medium">
                {formData.rating ? `${formData.rating} / 5` : "Unrated"}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Add interviewer notes, feedback, or key observations..."
              className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
            />
          </div>

          {isEditing && candidate?.stageHistory && (
            <div className="pt-3 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Stage History Timeline
              </label>
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 max-h-36 overflow-y-auto space-y-2">
                {candidate.stageHistory.map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs py-1 px-2.5 rounded bg-slate-800/40 border border-slate-800/60"
                  >
                    <span className="font-semibold text-indigo-300">{entry.stage}</span>
                    <span className="text-slate-400">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {isEditing ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3.5 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors"
              >
                Delete candidate
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors"
              >
                {isEditing ? "Save changes" : "Create candidate"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateModal;
