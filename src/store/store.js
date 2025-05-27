import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice.js';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
});

