import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Category from '../../types/category.type';

export interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: []
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    initCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    }
  }
});

export const { initCategories } = categorySlice.actions;

export default categorySlice.reducer;
