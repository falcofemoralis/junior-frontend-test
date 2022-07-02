import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
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
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      state.products.push(action.payload);
    }
  }
});

export const { addToCart } = cartSlice.actions;

export const selectProductsCount = (state: RootState) => state.cart.products.reduce((acc, cur) => acc + cur.quantity, 0);

export default cartSlice.reducer;
