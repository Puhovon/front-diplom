import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setTokens, logout, setAuthError, restoreSession } from '../store/registrationSlice.js';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, accessToken, refreshToken, authError } = useSelector((state) => state.registration);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true); 
  const isInitialLoad = useRef(true); 

  // Восстановление сессии при инициализации
  useEffect(() => {
    if (isInitialLoad.current) {
      const savedUser = localStorage.getItem('authUser');
      const savedAccessToken = localStorage.getItem('accessToken');
      const savedRefreshToken = localStorage.getItem('refreshToken');

      if (savedAccessToken && savedRefreshToken) {
        dispatch(restoreSession({
          user: savedUser ? JSON.parse(savedUser) : null,
          accessToken: savedAccessToken,
          refreshToken: savedRefreshToken,
        }));
      }
      setIsAppLoading(false); 
      isInitialLoad.current = false; 
    }
  }, [dispatch]);

  // Сохранение состояния в localStorage при изменении
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }

    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [accessToken, refreshToken, user]);


  const setAuthTokens = (tokens) => {
    dispatch(setTokens(tokens));
  };

  const setAuthUser = (userData) => {
    dispatch(setUser(userData));
  };


  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('authUser');
  };


  const refreshTokens = async () => {
    if (isRefreshing || !refreshToken) return false;
    setIsRefreshing(true);

    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await response.json();
      dispatch(setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error.message);
      dispatch(setAuthError('Failed to refresh token. Please log in again.'));
      handleLogout();
      return false;
    } finally {
      setIsRefreshing(false);
    }
  };

  // Функция для выполнения авторизованного запроса
  const fetchWithAuth = async (url, options = {}) => {
    if (!accessToken) {
      dispatch(setAuthError('No access token available. Please log in.'));
      handleLogout();
      throw new Error('No access token');
    }

    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      const refreshed = await refreshTokens();
      if (refreshed) {
        const newHeaders = {
          ...options.headers,
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        };
        return fetch(url, { ...options, headers: newHeaders });
      } else {
        throw new Error('Token refresh failed');
      }
    }

    return response;
  };

  const getUserInfo = async () => {
    try {
      const response = await fetchWithAuth('http://localhost:3000/api/v1/users/me', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userData = await response.json();
      dispatch(setUser(userData)); // Обновляем данные пользователя в Redux
      return userData;
    } catch (error) {
      console.error('Error fetching user info:', error.message);
      dispatch(setAuthError('Failed to fetch user info. Please log in again.'));
      return null;
    }
  };


  useEffect(() => {
    if (accessToken && authError) {
      dispatch(setAuthError(null));
    }
  }, [accessToken, authError, dispatch]);

  return {
    user,
    accessToken,
    refreshToken,
    authError,
    setAuthTokens,
    setAuthUser,
    handleLogout,
    fetchWithAuth,
    isRefreshing,
    isAppLoading,
    getUserInfo,
  };
};

export default useAuth;