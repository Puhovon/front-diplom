import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userType: 'client',
  step: 1,
  user: null, // Храним только одного пользователя
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
      state.step = 1;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload; // Перезаписываем пользователя
      console.log(state.user)
    },
  },
});

export const { setUserType, setStep, setUser } = registrationSlice.actions;

export default registrationSlice.reducer;