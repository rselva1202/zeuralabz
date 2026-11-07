import React, { useState } from 'react';

export const LoadingSpinnerButton: React.FC<{ text?: string }> = ({ text = "Save Changes" }) => {
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
      className="inline-flex items-center justify-center min-w-[140px] px-6 py-3 rounded-xl font-medium text-white bg-emerald-600 hover:bg-emerald-500 transition-all disabled:opacity-80"
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : text}
    </button>
  );
};
