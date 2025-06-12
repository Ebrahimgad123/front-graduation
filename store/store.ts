import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './locationSlice'; // استيراد السلايس
import favouriteReducer from './favoritesSlice'; // استيراد السلايس المفضل
import themeReducer from './themeSlice'
const store = configureStore({
  reducer: {
    location: locationReducer, 
    favorites: favouriteReducer, 
    theme: themeReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
