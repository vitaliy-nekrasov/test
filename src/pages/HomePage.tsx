import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPriceOffers } from '../store/selectors/tourSelectors';
import SearchForm from '../components/SearchForm/SearchForm';
import SearchResults from '../components/SearchResults/SearchResults';
import { GeoEntity } from '../api/api';
import Container from '../layout/Container/Container';
import { AppDispatch, RootState } from '../store';
import { searchToursThunk, clearSearchResults } from '../store/slices/tourSearchSlice';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [wasSearched, setWasSearched] = useState(false);
  const { loading, error, prices } = useSelector((state: RootState) => state.tourSearch);
  const priceOffers = useSelector(selectPriceOffers);

  const handleSearch = async (selected: GeoEntity) => {
    setWasSearched(true);
    if (selected.type === 'country') {
      setInfoMessage(null);
      dispatch(clearSearchResults());
      await dispatch(searchToursThunk(selected.id));
    } else {
      setInfoMessage('Пошук можливий тільки по країні');
      dispatch(clearSearchResults());
    }
    console.log(priceOffers);
  };
  
  const handleNotFound = () => {
    setWasSearched(true);
    setInfoMessage(null);
    dispatch(clearSearchResults());
  };

  const isEmpty = loading && !error && Object.keys(prices).length === 0 && !infoMessage;
  const hasSearched = wasSearched;

  return (
    <>
      <Container>
        <SearchForm 
          onSubmit={handleSearch} 
          onNotFound={handleNotFound}
        />
      </Container>
      <Container>
        {hasSearched && (
          <SearchResults 
            loading={loading} 
            error={error} 
            isEmpty={isEmpty}
            infoMessage={infoMessage}
          />
        )}
      </Container>
    </>
  );
};

export default HomePage;