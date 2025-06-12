"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteItem {
  id: number;
  name: string;
  image: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

const getFavoritesFromLocalStorage = (): FavoriteItem[] => {
  try {
    if (typeof window !== 'undefined') {
      const favorites = localStorage.getItem('favorites');
      return favorites ? JSON.parse(favorites) : [];
    }
  } catch (error) {
    console.error("Failed to load favorites from localStorage", error);
  }
  return [];
};

const updateLocalStorage = (items: FavoriteItem[]) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(items));
    }
  } catch (error) {
    console.error("Failed to update localStorage", error);
  }
};

const initialState: FavoritesState = {
  items: getFavoritesFromLocalStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<FavoriteItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push(newItem);
        updateLocalStorage(state.items);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      updateLocalStorage(state.items);
    },
    clearFavorites(state) {
      state.items = [];
      updateLocalStorage(state.items);
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
