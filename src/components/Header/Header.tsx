import React from 'react';
import Container from '../../layout/Container/Container';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header>
      <Container>
        <Link className="company-name" to="/test/">
          ТурСервіс
        </Link>
      </Container>
    </header>
  );
};

export default Header;