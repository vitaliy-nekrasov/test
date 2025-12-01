import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { startSearchPrices, getSearchPrices, PriceOffer, StartSearchResponse, GetSearchPricesResponse } from '../../api/api';

interface TourSearchState {
  loading: boolean;
  error: string | null;
  prices: Record<string, PriceOffer>;
  searchToken: string | null;
  retryCount: number;
}

const initialState: TourSearchState = {
  loading: false,
  error: null,
  prices: {},
  searchToken: null,
  retryCount: 0,
};

const MAX_RETRIES = 2;
const MAX_ATTEMPTS = 10;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const searchToursThunk = createAsyncThunk(
  'tourSearch/searchTours',
  async (countryID: string, { rejectWithValue }) => {
    for (let retry = 0; retry <= MAX_RETRIES; retry++) {
      try {
        const startResp = await startSearchPrices(countryID);
        const { token, waitUntil }: StartSearchResponse = await startResp.json();

        let waitTime = new Date(waitUntil).getTime() - Date.now();
        if (waitTime > 0) await delay(waitTime);

        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
          try {
            const pricesResp = await getSearchPrices(token);
            const pricesData: GetSearchPricesResponse = await pricesResp.json();
            return { prices: pricesData.prices, token };
          } catch (error) {
            if (error instanceof Response && error.status === 425) {
              const errorData = await error.json();
              waitTime = new Date(errorData.waitUntil).getTime() - Date.now();
              if (waitTime > 0) await delay(waitTime);
            } else {
              throw error;
            }
          }
        }
        throw new Error('Перевищено максимальну кількість спроб отримання результатів');
      } catch (error) {
        if (retry === MAX_RETRIES) {
          let errorMessage = 'Не вдалося виконати пошук турів';
          if (error instanceof Response) {
            try {
              const errorData = await error.json();
              errorMessage = errorData.message || errorMessage;
            } catch {
              errorMessage = `Помилка ${error.status}: ${error.statusText}`;
            }
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          return rejectWithValue(errorMessage);
        }
        await delay(1000 * (retry + 1));
      }
    }
    return rejectWithValue('Не вдалося виконати пошук після всіх спроб');
  }
);

const tourSearchSlice = createSlice({
  name: 'tourSearch',
  initialState,
  reducers: {
    clearSearchResults(state) {
      state.prices = {};
      state.error = null;
      state.searchToken = null;
      state.retryCount = 0;
    },
    resetError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchToursThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.retryCount = 0;
      })
      .addCase(searchToursThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = action.payload.prices;
        state.searchToken = action.payload.token;
        state.error = null;
      })
      .addCase(searchToursThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.prices = {};
      });
  },
});

export const { clearSearchResults, resetError } = tourSearchSlice.actions;
export default tourSearchSlice.reducer;