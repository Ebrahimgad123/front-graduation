import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './locationSlice'; // استيراد السلايس
import favouriteReducer from './favoritesSlice'; // استيراد السلايس المفضل

const store = configureStore({
  reducer: {
    location: locationReducer, // إضافة سلايس الموقع
    favorites: favouriteReducer, // تعديل إلى اسم favorites بدلاً من cart
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
