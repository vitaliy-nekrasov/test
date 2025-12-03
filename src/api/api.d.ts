export type Country = { id: string; name: string; flag: string; type?: 'country' };
export type City = { id: number; name: string; type?: 'city' };
export type Hotel = {
  id: number;
  name: string;
  img: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
  type?: 'hotel';
  description: string;
  services?: Record<string, string>;
};
export type GeoEntity = Country | City | Hotel;

export type PriceOffer = {
  id: string;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
  hotelID?: string;
};

export type StartSearchResponse = {
  token: string;
  waitUntil: string;
};

export type GetSearchPricesResponse = {
  prices: Record<string, PriceOffer>;
};

export function getCountries(): Promise<Response>;
export function searchGeo(query?: string): Promise<Response>;
export function startSearchPrices(countryID: string): Promise<Response>;
export function getSearchPrices(token: string): Promise<Response>;
export function stopSearchPrices(token: string): Promise<Response>;
export function getHotels(countryID: string): Promise<Response>;
export function getHotel(hotelId: number | string): Promise<Response>;
export function getPrice(priceId: string): Promise<Response>;