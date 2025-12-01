import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCountries, searchGeo, GeoEntity, Country } from '../../api/api';

export const fetchCountriesThunk = createAsyncThunk(
  'geoSearch/fetchCountries',
  async () => {
    const resp = await getCountries();
    const countriesMap = await resp.json() as Record<string, Country>;
    return Object.values(countriesMap).map(c => ({ ...c, type: 'country' } as GeoEntity));
  }
);

export const fetchGeoThunk = createAsyncThunk(
  'geoSearch/fetchGeo',
  async (query: string) => {
    const resp = await searchGeo(query);
    const geoMap = await resp.json();
    return Object.values(geoMap) as GeoEntity[];
  }
);

const geoSearchSlice = createSlice({
  name: 'geoSearch',
  initialState: {
    options: [] as GeoEntity[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearOptions(state) {
      state.options = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCountriesThunk.pending, state => { state.loading = true; })
      .addCase(fetchCountriesThunk.fulfilled, (state, action) => {
        state.options = action.payload;
        state.loading = false;
      })
      .addCase(fetchCountriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchGeoThunk.pending, state => { state.loading = true; })
      .addCase(fetchGeoThunk.fulfilled, (state, action) => {
        state.options = action.payload;
        state.loading = false;
      })
      .addCase(fetchGeoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  }
});

export const { clearOptions } = geoSearchSlice.actions;
export default geoSearchSlice.reducer;