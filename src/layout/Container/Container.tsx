import React, { ReactNode } from 'react';
import './Container.css';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className='container'>
    {children}
  </div>
);

export default Container;