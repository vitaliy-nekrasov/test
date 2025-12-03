import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout';
import HomePage from './pages/HomePage';
import TourDetailPage from './pages/TourDetailPage/TourDetailPage';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tour/:priceId" element={<TourDetailPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;