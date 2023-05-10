import React from 'react';
import './style.css';

export const Select = ({ options, handleChange, selectedValue }) => {
  return (
    <select
      className='select'
      onChange={(e) => handleChange(e.target.value)}
      value={selectedValue}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
