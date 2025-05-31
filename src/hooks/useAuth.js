import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setTokens, logout, setAuthError } from '../store/registrationSlice.js';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, accessToken, refreshToken } = useSelector((state) => state.registration);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return () => setError(null);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const savedAccessToken = localStorage.getItem('accessToken');
        const savedRefreshToken = localStorage.getItem('refreshToken');
        const savedUser = localStorage.getItem('authUser');

        if (savedAccessToken && savedRefreshToken) {
          dispatch(setTokens({ accessToken: savedAccessToken, refreshToken: savedRefreshToken }));
          if (savedUser) {
            try {
              const parsedUser = JSON.parse(savedUser);
              dispatch(setUser(parsedUser));
            } catch (parseError) {
              console.error('Ошибка парсинга пользователя:', parseError);
              localStorage.removeItem('authUser');
              if (isMounted) setError('Данные пользователя повреждены, требуется повторный вход');
            }
          }
        }
      } catch (err) {
        console.error('Ошибка восстановления сессии:', err);
        if (isMounted) setError('Не удалось восстановить сессию');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

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

  const handleLogout = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('authUser');
  }, [dispatch]);

  const refreshTokens = useCallback(async () => {
    try {
      console.log('Attempting to refresh token with refreshToken:', refreshToken);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Не удалось обновить токен, статус: ${response.status}`);
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await response.json();
      console.log('Token refresh successful, new accessToken:', newAccessToken);
      dispatch(setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));
      return newAccessToken;
    } catch (err) {
      console.error('Token refresh failed:', err);
      setError('Сессия истекла. Войдите заново.');
      dispatch(setAuthError('Сессия истекла. Войдите заново.'));
      handleLogout();
      throw err;
    }
  }, [refreshToken, dispatch, handleLogout]);

  const fetchWithoutAuth = useCallback(async (url, options = {}) => {
    const headers = {
      ...options.headers,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Ошибка запроса: ${response.status}`);
      }
      return response;
    } catch (err) {
      console.error('Ошибка fetchWithoutAuth:', err);
      setError(err.message || 'Ошибка сети');
      dispatch(setAuthError(err.message || 'Ошибка сети'));
      throw err;
    }
  }, [dispatch]);

  const fetchWithAuth = useCallback(async (url, options = {}) => {
    if (!accessToken) {
      setError('Требуется авторизация');
      dispatch(setAuthError('Требуется авторизация'));
      handleLogout();
      throw new Error('Нет токена доступа');
    }
    let headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      console.log('Initial fetch with URL:', url, 'Headers:', headers);
      let response = await fetch(url, { ...options, headers });

      if (response.status === 401) {
        console.log('Received 401, attempting token refresh...');
        const newAccessToken = await refreshTokens();
        headers.Authorization = `Bearer ${newAccessToken}`;
        console.log('Retrying fetch with new token, Headers:', headers);
        response = await fetch(url, { ...options, headers });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Ошибка запроса: ${response.status} ${response.statusText} для URL: ${url}`);
      }

      return response;
    } catch (err) {
      console.error('Ошибка fetchWithAuth:', err);
      setError(err.message || 'Ошибка сети');
      dispatch(setAuthError(err.message || 'Ошибка сети'));
      throw err;
    }
  }, [accessToken, handleLogout, refreshTokens, dispatch]);

  const getUserInfo = useCallback(async () => {
    try {
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/v1/users/me`, {
        method: 'GET',
      });
      const userData = await response.json();
      dispatch(setUser(userData));
      return userData;
    } catch (err) {
      console.error('Ошибка getUserInfo:', err);
      setError('Не удалось загрузить данные пользователя');
      dispatch(setAuthError('Не удалось загрузить данные пользователя'));
      return null;
    }
  }, [dispatch, fetchWithAuth]);

  return {
    user,
    accessToken,
    error,
    isLoading,
    handleLogout,
    fetchWithAuth,
    fetchWithoutAuth,
    getUserInfo,
  };
};

export default useAuth;