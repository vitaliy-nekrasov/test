import { configureStore } from '@reduxjs/toolkit';
import geoSearchReducer from './slices/geoSearchSlice';

export const store = configureStore({
  reducer: {
    geoSearch: geoSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;