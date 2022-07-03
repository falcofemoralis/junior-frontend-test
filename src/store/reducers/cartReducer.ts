import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { CartItem } from './../../types/cartItem.type';

export interface CartState {
  products: CartItem[];
}

const initialState: CartState = {
  products: []
};

const compareProducts = (cartItem: CartItem, selectedCartItem: CartItem) => {
  return (
    cartItem.product.id == selectedCartItem.product.id &&
    cartItem.selectedAttributes.every(
      (value, index) =>
        value.attributeId === selectedCartItem.selectedAttributes[index].attributeId && value.itemId === selectedCartItem.selectedAttributes[index].itemId
    )
  );
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const found = state.products.find(p => compareProducts(p, action.payload));
      if (found) {
        found.quantity += 1;
      } else {
        state.products.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const found = state.products.find(p => compareProducts(p, action.payload));

      if (!found) {
        return;
      }

      if (found.quantity > 1) {
        found.quantity -= 1;
      } else {
        state.products = state.products.filter(p => !compareProducts(p, action.payload));
      }
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectProductsCount = (state: RootState) => state.cart.products.reduce((acc, cur) => acc + cur.quantity, 0);
export const selectProducts = (state: RootState) => state.cart.products;

export default cartSlice.reducer;
