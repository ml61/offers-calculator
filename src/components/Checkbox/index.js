import React from 'react';
import './styles.css';

export const Checkbox = ({ value, label, isChecked, handleChange }) => {
  return (
    <label className='checkbox'>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={() => handleChange(value)}
      />
      <span className='checkbox-label'>{label}</span>
    </label>
  );
};
