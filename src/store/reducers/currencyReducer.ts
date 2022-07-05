import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Currency } from './../../types/product.type';

const CURRENCY_STORAGE_KEY = 'currency';

const getLocalCurrency = () => {
  const data = localStorage.getItem(CURRENCY_STORAGE_KEY);
  if (!data) return null;
  return JSON.parse(data) as Currency;
};

const updateLocalCurrency = (currency: Currency) => {
  localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(currency));
};

export interface CurrencyState {
  currencies: Currency[];
  currentCurrency: Currency | null;
}

const initialState: CurrencyState = {
  currencies: [],
  currentCurrency: getLocalCurrency()
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    initCurrencies: (state, action: PayloadAction<Currency[]>) => {
      state.currencies = action.payload;

      if (!state.currentCurrency) {
        state.currentCurrency = action.payload[0];
        updateLocalCurrency(action.payload[0]);
      }
    },
    changeCurrency: (state, action: PayloadAction<Currency>) => {
      state.currentCurrency = action.payload;
      updateLocalCurrency(action.payload);
    }
  }
});

export const { initCurrencies, changeCurrency } = currencySlice.actions;

export const selectCurrencies = (state: RootState) => state.currency.currencies;
export const selectCurrency = (state: RootState) => state.currency.currentCurrency;

export default currencySlice.reducer;
