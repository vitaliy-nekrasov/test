import React from 'react';
import './Dropdown.css';

type DropdownProps<T> = {
  options: T[];
  onSelect: (item: T) => void;
  getKey: (item: T) => React.Key;
  renderOption: (item: T) => React.ReactNode;
  emptyText?: string;
};

function Dropdown<T>({
  options,
  onSelect,
  getKey,
  renderOption,
  emptyText = 'Нічого не знайдено',
}: DropdownProps<T>) {
  return (
    <ul className="dropdown">
      {options.map((item) => (
        <li
          key={getKey(item)}
          className="dropdown__item"
          onClick={() => onSelect(item)}
        >
          {renderOption(item)}
        </li>
      ))}
      {options.length === 0 && (
        <li className="dropdown__empty">{emptyText}</li>
      )}
    </ul>
  );
}

export default Dropdown;