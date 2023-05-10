import React, { useMemo, useState } from 'react';
import { Checkbox } from '../components/Checkbox';

export const useMultipleSelect = ({
  options = [],
  initialCheckedValues = [],
}) => {
  const [checkedValues, setCheckedValues] = useState(initialCheckedValues);

  const handleCheckbox = (value) =>
    checkedValues.includes(value)
      ? setCheckedValues((prev) =>
          prev.filter((checkedValue) => checkedValue !== value)
        )
      : setCheckedValues((prev) => [...prev, value]);

  const MemoizedCheckboxList = useMemo(
    () =>
      options.map((option) => (
        <Checkbox
          key={option.value}
          value={option.value}
          label={option.label}
          isChecked={checkedValues.includes(option.value)}
          handleChange={handleCheckbox}
        />
      )),
    [options, checkedValues]
  );

  return { CheckboxList: MemoizedCheckboxList, checkedValues };
};
