import { configureStore } from '@reduxjs/toolkit';
import geoSearchReducer from './slices/geoSearchSlice';
import tourSearchReducer from './slices/tourSearchSlice';

export const store = configureStore({
  reducer: {
    geoSearch: geoSearchReducer,
    tourSearch: tourSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;