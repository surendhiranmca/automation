import React from 'react';
import './FilterBar.css';

const FilterBar = ({ filters, onFilterChange, options }) => {
  return (
    <div className="filter-bar">
      {options.map(option => (
        <div key={option.id} className="filter-group">
          <label htmlFor={option.id} className="filter-label">
            {option.label}
          </label>
          <select
            id={option.id}
            className="filter-select"
            value={filters[option.id] || ''}
            onChange={(e) => onFilterChange(option.id, e.target.value)}
          >
            <option value="">{option.placeholder || 'All'}</option>
            {option.values.map(val => (
              <option key={val.id} value={val.id}>
                {val.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
