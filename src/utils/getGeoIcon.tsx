import { GeoEntity } from '../api/api';

export function getGeoIcon(item: GeoEntity) {
  if (item.type === 'country') {
    return <img className='dropdown__flag' src={item.flag} alt="" />;
  }
  if (item.type === 'hotel') {
    return <span className='dropdown__icon' role="img" aria-label="Готель">🏨</span>;
  }
  if (item.type === 'city') {
    return <span className='dropdown__icon' role="img" aria-label="Місто">🏙️</span>;
  }
  return null;
}