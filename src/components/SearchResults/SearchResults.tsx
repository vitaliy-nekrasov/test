import React from 'react';
import { useSelector } from 'react-redux';
import { selectPriceOffers } from '../../store/selectors/tourSelectors';
import './SearchResults.css';

interface SearchResultsProps {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  infoMessage?: string | null;
}

interface MessageProps {
  icon: React.ReactNode;
  title: string;
  text?: string;
  className: string;
}

const Message: React.FC<MessageProps> = ({ icon, title, text, className }) => (
  <div className={`search-results ${className}`}>
    <div>
      {icon}
      <h3>{title}</h3>
      {text && <p>{text}</p>}
    </div>
  </div>
);

const SearchResults: React.FC<SearchResultsProps> = ({ loading, error, isEmpty, infoMessage }) => {
  let messageProps: MessageProps | null = null;
  const priceOffers = useSelector(selectPriceOffers);

  console.log('priceOffers:', priceOffers); // в SearchResults

  switch (true) {
    case loading:
      messageProps = {
        icon: <div className="spinner"></div>,
        title: "Шукаємо тури для вас...",
        className: "search-results__loader"
      };
      break;
    case !!infoMessage:
      messageProps = {
        icon: <span className="search-results__info-icon">ℹ️</span>,
        title: infoMessage as string,
        className: "search-results__info"
      };
      break;
    case !!error:
      messageProps = {
        icon: <span className="search-results__error-icon">⚠️</span>,
        title: "Виникла помилка",
        text: error as string,
        className: "search-results__error"
      };
      break;
    case isEmpty:
      messageProps = {
        icon: <span className="search-results__empty-icon">🔍</span>,
        title: "За вашим запитом турів не знайдено",
        text: "Спробуйте змінити критерії пошуку",
        className: "search-results__empty"
      };
      break;
    default:
      messageProps = null;
  }

  return messageProps ? <Message {...messageProps} /> : null;
};

export default SearchResults;