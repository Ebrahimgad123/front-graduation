import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './locationSlice'; // استيراد السلايس
import favouriteReducer from './favoritesSlice'; // استيراد السلايس المفضل
import themeReducer from './themeSlice'
const store = configureStore({
  reducer: {
    location: locationReducer, // إضافة سلايس الموقع
    favorites: favouriteReducer, // تعديل إلى اسم favorites بدلاً من cart
    theme: themeReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
