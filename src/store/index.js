import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice';
import profileReducer from './profileSlice';
import lawyersReducer from './lawyersSlice';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    profile: profileReducer,
    lawyers: lawyersReducer,
  },
});