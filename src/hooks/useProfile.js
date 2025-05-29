import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '@store/profileSlice';

export const useProfile = (userId = null) => {
  const dispatch = useDispatch();
  const { profileData, isLoading, error } = useSelector((state) => state.profile);
  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchProfile({ userId, accessToken }));
    }
  }, [dispatch, accessToken, userId]);

  return { profileData, isLoading, error };
};