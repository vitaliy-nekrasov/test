import React, { ReactNode } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './MainLayout.css';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className='wrapper'>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;