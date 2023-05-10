import React, { useMemo, useState } from 'react';
import { Select } from '../components/Select';

export const useSingleSelect = ({ initialSelected, options = [] }) => {
  const [selectedValue, setSelectedValue] = useState(
    initialSelected || options[0]?.value
  );

  const handleSelect = (value) => setSelectedValue(value);

  const MemoizedSelect = useMemo(
    () => (
      <Select
        options={options}
        handleChange={handleSelect}
        selectedValue={selectedValue}
      />
    ),
    [options, selectedValue]
  );

  return { Select: MemoizedSelect, selectedValue };
};
