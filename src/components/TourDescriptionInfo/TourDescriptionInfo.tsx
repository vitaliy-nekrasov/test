import React from 'react';
import { Hotel } from '../../api/api';
import { getServiceIcons } from '../../utils/getServiceIcons';
import './TourDescriptionInfo.css';

interface TourDescriptionInfoProps {
  hotel: Hotel;
}

const TourDescriptionInfo: React.FC<TourDescriptionInfoProps> = ({ hotel }) => (
  <>
    {hotel.description && (
      <div className="tour-card__description">
        <h2 className='tour-card__description-title'>Опис готелю</h2>
        <p>{hotel.description}</p>
      </div>
    )}
    {hotel.services && Object.keys(hotel.services).length > 0 && (
      <div className="tour-card__services">
        <h2 className='tour-card__services-title'>Сервіси</h2>
        <ul className="tour-card__services-list">
          {Object.entries(hotel.services)
            .filter(([, value]) => value === 'yes')
            .map(([key]) => (
              <li key={key} className="tour-card__service-item">
                {getServiceIcons[key]?.icon || '❓'} {getServiceIcons[key]?.label || key}
              </li>
            ))}
        </ul>
      </div>
    )}
  </>
);

export default TourDescriptionInfo;