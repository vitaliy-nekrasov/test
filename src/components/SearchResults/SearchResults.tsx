import React from 'react';
import { useSelector } from 'react-redux';
import { selectPriceOffers } from '../../store/selectors/tourSelectors';
import SearchMessage from '../SearchMessage/SearchMessage';
import TourCard from '../TourCard/TourCard';
import { useHotelsByCountry } from '../../hooks/useHotelsByCountry';
import { getSearchMessageProps } from '../../utils/getMessageProps';
import './SearchResults.css';

interface SearchResultsProps {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  infoMessage?: string | null;
  countryId: string | null;
  wasSearched?: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ loading, error, isEmpty, infoMessage, countryId, wasSearched }) => {
  const priceOffers = useSelector(selectPriceOffers);
  const { hotels } = useHotelsByCountry(countryId);
  const searchMessageProps = getSearchMessageProps(loading, error, isEmpty, infoMessage);

  if (searchMessageProps) {
    return <SearchMessage {...searchMessageProps} />;
  }

  if (!wasSearched) return null;

  return (
    <div className="search-results__list">
      {priceOffers.map(offer => (
        <TourCard
          key={offer.id}
          offer={offer}
          hotel={offer.hotelID ? hotels[offer.hotelID] : undefined}
          showLink={true} 
        />
      ))}
    </div>
  );
};

export default SearchResults;