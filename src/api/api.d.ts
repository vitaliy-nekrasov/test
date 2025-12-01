export type Country = { id: string; name: string; flag: string; type?: 'country' };
export type City = { id: number; name: string; type?: 'city' };
export type Hotel = { id: number; name: string; img?: string; type?: 'hotel' };
export type GeoEntity = Country | City | Hotel;

export function getCountries(): Promise<Response>;
export function searchGeo(query?: string): Promise<Response>;
export function startSearchPrices(countryID: string): Promise<Response>;
export function getSearchPrices(token: string): Promise<Response>;
export function stopSearchPrices(token: string): Promise<Response>;
export function getHotels(countryID: string): Promise<Response>;
export function getHotel(hotelId: number | string): Promise<Response>;
export function getPrice(priceId: string): Promise<Response>;