import React from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import { GeoEntity } from '../api/api';
import Container from '../layout/Container/Container';

const HomePage: React.FC = () => {
  const handleSearch = (selected: GeoEntity) => {
    console.log('Selected:', selected);
  };

  return (
    <Container>
      <SearchForm onSubmit={handleSearch} />
    </Container>
  );
};

export default HomePage;