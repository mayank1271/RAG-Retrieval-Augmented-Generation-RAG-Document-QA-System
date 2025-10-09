import { useState } from 'react';

interface QueryInputProps {
  onQuery: (query: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export function QueryInput({ onQuery, isLoading, disabled }: QueryInputProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onQuery(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="query-form">
      <div className="query-input-wrapper">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about your document..."
          disabled={disabled || isLoading}
          className="query-input"
        />
        <button
          type="submit"
          disabled={disabled || isLoading || !query.trim()}
          className="query-button"
        >
          {isLoading ? (
            <span className="loading-spinner"></span>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
