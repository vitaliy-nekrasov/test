import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchForm from '../components/SearchForm/SearchForm';
import SearchResults from '../components/SearchResults/SearchResults';
import { GeoEntity, stopSearchPrices } from '../api/api';
import Container from '../layout/Container/Container';
import { AppDispatch, RootState } from '../store';
import { searchToursThunk, clearSearchResults } from '../store/slices/tourSearchSlice';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [wasSearched, setWasSearched] = useState(false);
  const { loading, error, prices } = useSelector((state: RootState) => state.tourSearch);
  const [searchedCountryId, setSearchedCountryId] = useState<string | null>(null);const [activeToken, setActiveToken] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleSearch = async (selected: GeoEntity) => {
    setWasSearched(true);
    if (selected.type === 'country') {
      setInfoMessage(null);
      if (searchedCountryId !== selected.id) {
        setSearchedCountryId(selected.id);
  
        if (activeToken) {
          setIsCancelling(true);
          try {
            await stopSearchPrices(activeToken);
          } catch (err) {
            console.error('Помилка скасування пошуку:', err);
          }
          setActiveToken(null);
          dispatch(clearSearchResults());
          const action = await dispatch(searchToursThunk(selected.id));
          const token = (action.payload as { token?: string })?.token;
          if (token) setActiveToken(token);
          setIsCancelling(false);
        } else {
          dispatch(clearSearchResults());
          const action = await dispatch(searchToursThunk(selected.id));
          const token = (action.payload as { token?: string })?.token;
          if (token) setActiveToken(token);
        }
      }
    } else {
      setInfoMessage('Пошук можливий тільки по країні');
      setSearchedCountryId(null);
      dispatch(clearSearchResults());
    }
  };
  
  const handleNotFound = () => {
    setWasSearched(true);
    setInfoMessage(null);
    dispatch(clearSearchResults());
  };

  const isEmpty = wasSearched && !loading && !error && Object.keys(prices).length === 0 && !infoMessage;

  return (
    <>
      <Container>
        <SearchForm 
          onSubmit={handleSearch} 
          onNotFound={handleNotFound}
          isCancelling={isCancelling}
        />
      </Container>
      <Container>
        <SearchResults 
          loading={loading} 
          error={error} 
          isEmpty={isEmpty}
          infoMessage={infoMessage}
          countryId={searchedCountryId}
          wasSearched={wasSearched}
        />
      </Container>
    </>
  );
};

export default HomePage;