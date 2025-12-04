import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { getPrice, getHotel, PriceOffer, Hotel } from '../../api/api';
import Container from '../../layout/Container/Container';
import Button from '../../components/Button/Button';
import TourCard from '../../components/TourCard/TourCard';
import './TourDetailPage.css';

const TourDetailPage: React.FC = () => {
  const { priceId } = useParams<{ priceId: string }>();
  const location = useLocation();
  const hotelID = location.state?.hotelID as string | undefined;
  const [priceOffer, setPriceOffer] = useState<PriceOffer | null>(null);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceResp = await getPrice(priceId!);
        const priceData = await priceResp.json();
        setPriceOffer(priceData);

        const resolvedHotelID = hotelID || priceData.hotelID;
        if (resolvedHotelID) {
          const hotelResp = await getHotel(resolvedHotelID);
          const hotelData = await hotelResp.json();
          setHotel(hotelData);
        } else {
          setError('Не вдалося знайти готель для цієї пропозиції');
        }
      } catch {
        setError('Не вдалося завантажити дані туру');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [priceId, hotelID]);

  if (loading) return <div className='loading'>Завантаження...</div>;
  if (error) return <div className='error'>{error}</div>;
  if (!priceOffer || !hotel) return <div className='empty'>Дані туру не знайдено.</div>;

  return (
    <Container>
      <div className="tour-detail">
        <Button type="button" variant="default" className='back-btn'>
          <Link to="/test/">← Повернутися до пошуку</Link>
        </Button>
        <TourCard 
          offer={priceOffer} 
          hotel={hotel} 
          showDescriptionInfo={true} 
          showLink={false} 
          className="tour-detail__card"
        />
      </div>
    </Container>
  );
};

export default TourDetailPage;