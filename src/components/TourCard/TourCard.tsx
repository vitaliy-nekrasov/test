import React from 'react';
import { Link } from 'react-router-dom';
import { PriceOffer, Hotel } from '../../api/api';
import { formatDate, formatPrice } from '../../utils/formatUtils';
import { getCountryFlag } from '../../utils/getCountryFlag';
import TourDescriptionInfo from '../TourDescriptionInfo/TourDescriptionInfo';
import './TourCard.css';

interface TourCardProps {
  offer: PriceOffer;
  hotel?: Hotel;
  showDescriptionInfo?: boolean;
  showLink?: boolean;
  className?: string;
}

const TourCard: React.FC<TourCardProps> = ({ offer, hotel, showDescriptionInfo, showLink, className }) => {
  if (!hotel) return null;

  return (
    <div className={`tour-card ${className || ''}`}>
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
        {showDescriptionInfo && <TourDescriptionInfo hotel={hotel} />}
        <div className="tour-card__dates">
          {formatDate(offer.startDate)} – {formatDate(offer.endDate)}
        </div>
        <div className="tour-card__price">
          {formatPrice(offer.amount, offer.currency)}
        </div>
        {showLink && (
          <Link
            className="tour-card__link"
            to={`/tour/${offer.id}`}
            state={{ hotelID: hotel.id }}
          >
            Відкрити ціну
          </Link>
        )}
      </div>
    </div>
  );
};

export default TourCard;