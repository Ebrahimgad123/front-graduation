import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteItem {
  id: number;
  name: string;
  image: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

// دالة لاسترجاع العناصر من localStorage عند التفاعل مع المتصفح
const getFavoritesFromLocalStorage = (): FavoriteItem[] => {
  if (typeof window !== 'undefined') {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }
  return []; 
};

const initialState: FavoritesState = {
  items: [], 
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
        if (typeof window !== 'undefined') {
          localStorage.setItem('favorites', JSON.stringify(state.items));
        }
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    clearFavorites(state) {
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    // دالة لتحميل الـ favorites من localStorage بعد تحميل الصفحة
    loadFavorites(state) {
      state.items = getFavoritesFromLocalStorage();
    }
  },
});

export const { addFavorite, removeFavorite, clearFavorites, loadFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
