import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import currencyReducer from './reducers/currencyReducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    currency: currencyReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
