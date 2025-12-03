import { useState, useEffect } from 'react';
import { getHotels, Hotel } from '../api/api';

const hotelsCache: Record<string, Record<string, Hotel>> = {};

export function useHotelsByCountry(countryId: string | null) {
  const [hotels, setHotels] = useState<Record<string, Hotel>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!countryId) {
      Promise.resolve().then(() => {
        setHotels({});
        setLoading(false);
      });
      return;
    }
    if (hotelsCache[countryId]) {
      Promise.resolve().then(() => {
        setHotels(hotelsCache[countryId]);
        setLoading(false);
      });
      return;
    }
    Promise.resolve().then(() => setLoading(true));
    getHotels(countryId)
      .then(resp => resp.json())
      .then(data => {
        hotelsCache[countryId] = data;
        setHotels(data);
      })
      .finally(() => setLoading(false));
  }, [countryId]);

  return { hotels, loading };
}