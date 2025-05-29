import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URLS } from '@constants/api';
import { calculateAge } from '@utils/calculateAge';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async ({ userId, accessToken }, { rejectWithValue }) => {
    try {
      const url = userId ? `${API_URLS.USER_PROFILE}/${userId}` : API_URLS.CURRENT_USER;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.status === 401 ? 'Требуется авторизация' : 'Не удалось загрузить данные');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ payload, accessToken }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URLS.CURRENT_USER, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Не удалось обновить профиль');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileData: null,
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    clearProfileSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileData = action.payload;
        state.success = 'Профиль успешно обновлен';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileError, clearProfileSuccess } = profileSlice.actions;
export default profileSlice.reducer;