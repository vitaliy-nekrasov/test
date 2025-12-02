import React from 'react';
import { PriceOffer } from '../../api/api';
import { Hotel } from '../../api/api';
import { formatDate, formatPrice } from '../../utils/formatUtils';
import { getCountryFlag } from '../../utils/getCountryFlag';
import './TourCard.css';

interface TourCardProps {
  offer: PriceOffer;
  hotel?: Hotel;
}

const TourCard: React.FC<TourCardProps> = ({ offer, hotel }) => {
  if (!hotel) return null;
  console.log(hotel);
  
  return (
    <div className="tour-card">
      <img src={hotel.img} alt={hotel.name} className="tour-card__img" />
      <div className="tour-card__info">
        <h3 className="tour-card__hotel">{hotel.name}</h3>
        <div className="tour-card__location">
          {hotel.countryId && (
            <img
              src={getCountryFlag(hotel.countryId)}
              alt={hotel.countryName + ' flag'}
              className="tour-card__flag"
            />
          )}
          {hotel.cityName}, {hotel.countryName}
        </div>
        <div className="tour-card__dates">
          {formatDate(offer.startDate)} – {formatDate(offer.endDate)}
        </div>
        <div className="tour-card__price">
          {formatPrice(offer.amount, offer.currency)}
        </div>
        <a className="tour-card__link" href="#">
          Відкрити ціну
        </a>
      </div>
    </div>
  );
};

export default TourCard;