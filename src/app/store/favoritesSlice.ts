import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteItem {
  id: number;
  name: string;
  image: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

// استرجاع الـ items من localStorage عند تحميل التطبيق
const getFavoritesFromLocalStorage = (): FavoriteItem[] => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
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
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
    clearFavorites(state) {
      state.items = [];
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
