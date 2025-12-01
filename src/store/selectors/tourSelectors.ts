import { RootState } from '../index';
import { PriceOffer } from '../../api/api';

export const selectPriceOffers = (state: RootState): PriceOffer[] =>
  Object.values(state.tourSearch.prices);

export const selectSortedPriceOffers = (state: RootState): PriceOffer[] =>
  Object.values(state.tourSearch.prices).sort((a, b) =>
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );