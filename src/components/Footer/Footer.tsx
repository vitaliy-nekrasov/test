import React from 'react';
import Container from '../../layout/Container/Container';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Container>
        <span className="footer__copyright">© 2025 ТурСервіс</span>
      </Container>
    </footer>
  );
};

export default Footer;