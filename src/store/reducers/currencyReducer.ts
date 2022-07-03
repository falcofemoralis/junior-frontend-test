import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Currency } from './../../types/product.type';

const CURRENCY_STORAGE_KEY = 'currency';
export interface CurrencyState {
  currencies: Currency[];
  currentCurrency: Currency | null;
}

const initialState: CurrencyState = {
  currencies: [],
  currentCurrency: null
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    initCurrencies: (state, action: PayloadAction<Currency[]>) => {
      state.currencies = action.payload;

      const data = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (data) {
        const localCurrencyLabel: string = JSON.parse(data);
        const found = action.payload.find(c => c.label == localCurrencyLabel);
        state.currentCurrency = found ?? action.payload[0];
      } else {
        state.currentCurrency = action.payload[0];
      }
    },
    changeCurrency: (state, action: PayloadAction<Currency>) => {
      state.currentCurrency = action.payload;
      localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(action.payload.label));
    }
  }
});

export const { initCurrencies, changeCurrency } = currencySlice.actions;

export const selectCurrencies = (state: RootState) => state.currency.currencies;
export const selectCurrency = (state: RootState) => state.currency.currentCurrency;

export default currencySlice.reducer;
