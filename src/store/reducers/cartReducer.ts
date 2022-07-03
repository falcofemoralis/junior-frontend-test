import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { LocalCartItem } from '../../types/cartItem.type';
import { CartItem } from './../../types/cartItem.type';

const CART_STORAGE_KEY = 'cart';
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

export const updateLocalCart = (products: CartItem[]) => {
  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(
      products.map(p => {
        return { productId: p.product.id, quantity: p.quantity, selectedAttributes: p.selectedAttributes };
      })
    )
  );
};

export const getLocalCart = (): LocalCartItem[] => {
  const data = localStorage.getItem(CART_STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initCart: (state, action: PayloadAction<CartItem[]>) => {
      state.products.unshift(...action.payload);
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const found = state.products.find(p => compareProducts(p, action.payload));
      if (found) {
        found.quantity += 1;
      } else {
        state.products.push(action.payload);
      }

      updateLocalCart(state.products);
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

      updateLocalCart(state.products);
    }
  }
});

export const { initCart, addToCart, removeFromCart } = cartSlice.actions;

export const selectProductsCount = (state: RootState) => state.cart.products.reduce((acc, cur) => acc + cur.quantity, 0);
export const selectProducts = (state: RootState) => state.cart.products;

export default cartSlice.reducer;
