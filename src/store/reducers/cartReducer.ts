import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct } from './../../types/cartProduct.type';

export interface CartState {
  products: CartProduct[];
}

const initialState: CartState = {
  products: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct[]>) => {
      state.products = action.payload;
    }
  }
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
