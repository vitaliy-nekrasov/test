import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout';
import HomePage from './pages/HomePage';
import TourDetailPage from './pages/TourDetailPage/TourDetailPage';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/test/" replace />} />
          <Route path="/test/" element={<HomePage />} />
          <Route path="/test/tour/:priceId" element={<TourDetailPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;