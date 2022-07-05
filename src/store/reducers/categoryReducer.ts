import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import Category from '../../types/category.type';

export interface CategoriesState {
  categories: Category[] | null;
}

const initialState: CategoriesState = {
  categories: null
};

export const categoriesSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    initCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    }
  }
});

export const { initCategories } = categoriesSlice.actions;

export const selectCategories = (state: RootState) => state.category.categories;

export default categoriesSlice.reducer;
