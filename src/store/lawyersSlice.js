import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URLS } from '@constants/api';

export const fetchLawyers = createAsyncThunk(
  'lawyers/fetchLawyers',
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URLS.LAWYERS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.status === 401 ? 'Требуется авторизация' : 'Не удалось загрузить список юристов');
      }
      const { data } = await response.json();
      return data.map((lawyer) => ({
        id: lawyer.id,
        name: `${lawyer.firstName} ${lawyer.lastName} ${lawyer.patronymic || ''}`.trim(),
        specialization: lawyer.LawyerProfile?.Specializations || [],
        city: lawyer.LawyerProfile?.region || 'Неизвестно',
        avatar: lawyer.avatar_url || '/default-avatar.png',
        rating: lawyer.LawyerProfile?.rating || 0,
        price: lawyer.LawyerProfile?.price || 0,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const lawyersSlice = createSlice({
  name: 'lawyers',
  initialState: {
    lawyers: [],
    filteredLawyers: [],
    filters: {
      searchQuery: '',
      specializations: [],
      priceRange: [0, 10000],
      ratingRange: [0, 5],
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    setSpecializations: (state, action) => {
      state.filters.specializations = action.payload;
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setRatingRange: (state, action) => {
      state.filters.ratingRange = action.payload;
    },
    applyFilters: (state) => {
      let filtered = [...state.lawyers];

      if (state.filters.searchQuery) {
        filtered = filtered.filter((lawyer) =>
          lawyer.name.toLowerCase().includes(state.filters.searchQuery.toLowerCase())
        );
      }

      if (state.filters.specializations.length > 0) {
        filtered = filtered.filter((lawyer) =>
          state.filters.specializations.some((spec) =>
            Array.isArray(lawyer.specialization)
              ? lawyer.specialization.includes(spec)
              : lawyer.specialization === spec
          )
        );
      }

      filtered = filtered.filter(
        (lawyer) =>
          lawyer.price >= state.filters.priceRange[0] &&
          lawyer.price <= state.filters.priceRange[1]
      );

      filtered = filtered.filter(
        (lawyer) =>
          lawyer.rating >= state.filters.ratingRange[0] &&
          lawyer.rating <= state.filters.ratingRange[1]
      );

      state.filteredLawyers = filtered;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLawyers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLawyers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lawyers = action.payload;
        state.filteredLawyers = action.payload;
      })
      .addCase(fetchLawyers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.lawyers = [];
        state.filteredLawyers = [];
      });
  },
});

export const {
  setSearchQuery,
  setSpecializations,
  setPriceRange,
  setRatingRange,
  applyFilters,
} = lawyersSlice.actions;
export default lawyersSlice.reducer;