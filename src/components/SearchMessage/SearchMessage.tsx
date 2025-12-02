import React from 'react';

export interface SearchMessageProps {
  icon: React.ReactNode;
  title: string;
  text?: string;
  className: string;
}

const SearchMessage: React.FC<SearchMessageProps> = ({ icon, title, text, className }) => (
  <div className={`search-results ${className}`}>
    <div>
      {icon}
      <h3>{title}</h3>
      {text && <p>{text}</p>}
    </div>
  </div>
);

export default SearchMessage;