import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  coordinates: { lat: number; lng: number };
}


const getLocationFromLocalStorage = (): { lat: number; lng: number } => {
  if (typeof window !== 'undefined') {
    const storedLocation = localStorage.getItem('location');
    if (storedLocation) {
      return JSON.parse(storedLocation);
    }
  }
  return { lat: 30.0444, lng: 31.2357 };
};

const initialState: LocationState = {
  coordinates: getLocationFromLocalStorage(),
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<{ lat: number; lng: number }>) => {
      state.coordinates = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('location', JSON.stringify(state.coordinates));
      }
    },
  },
});

export const { setLocation } = locationSlice.actions;
export const selectLocation = (state: { location: LocationState }) => state.location.coordinates;
export default locationSlice.reducer;
