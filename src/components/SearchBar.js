import React, { useState, useCallback } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = 'Search...', debounceDelay = 300 }) => {
  const [query, setQuery] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);

    // Clear previous timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer for debounced search
    const timer = setTimeout(() => {
      onSearch(value);
    }, debounceDelay);

    setDebounceTimer(timer);
  }, [debounceTimer, debounceDelay, onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');
  }, [onSearch]);

  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
      {query && (
        <button
          className="search-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
