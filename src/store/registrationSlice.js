import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userType: 'client',
  step: 1,
  user: null,
  accessToken: null,
  refreshToken: null,
  authError: null,
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
      state.user = action.payload;
      console.log(state.user);
    },
    setTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.authError = null;
    },
    setAuthError: (state, action) => {
      state.authError = action.payload;
    },
    restoreSession: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.authError = null;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.userType = 'client';
      state.step = 1;
      state.authError = null;
    },
  },
});

export const { setUserType, setStep, setUser, setTokens, setAuthError, restoreSession, logout } = registrationSlice.actions;

export default registrationSlice.reducer;