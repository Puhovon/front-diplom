import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setTokens, logout } from '../store/registrationSlice.js';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, accessToken, refreshToken } = useSelector((state) => state.registration);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Очистка ошибок при размонтировании
  useEffect(() => {
    return () => setError(null);
  }, []);

  // Восстановление сессии
  useEffect(() => {
    let isMounted = true; // Флаг для проверки mounted компонента

    const restoreSession = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const savedAccessToken = localStorage.getItem('accessToken');
        const savedRefreshToken = localStorage.getItem('refreshToken');
        const savedUser = localStorage.getItem('authUser');

        if (savedAccessToken && savedRefreshToken) {
          dispatch(setTokens({ 
            accessToken: savedAccessToken, 
            refreshToken: savedRefreshToken 
          }));
          
          if (savedUser) {
            try {
              const parsedUser = JSON.parse(savedUser);
              dispatch(setUser(parsedUser));
            } catch (parseError) {
              console.error('Ошибка парсинга пользователя:', parseError);
              localStorage.removeItem('authUser');
            }
          }
        }
      } catch (err) {
        console.error('Ошибка восстановления сессии:', err);
        if (isMounted) {
          setError('Не удалось восстановить сессию');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false; // Очистка при размонтировании
    };
  }, [dispatch]);

  // Синхронизация с localStorage
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

  const fetchWithAuth = useCallback(async (url, options = {}) => {
    if (!accessToken) {
      setError('Требуется авторизация');
      handleLogout();
      throw new Error('Нет токена доступа');
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, { ...options, headers });
      
      if (!response.ok) {
        if (response.status === 401) {
          setError('Сессия истекла. Войдите заново.');
          handleLogout();
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Ошибка запроса: ${response.status}`
        );
      }

      return response;
    } catch (err) {
      console.error('Ошибка fetchWithAuth:', err);
      setError(err.message || 'Ошибка сети');
      throw err;
    }
  }, [accessToken, handleLogout]);

  const getUserInfo = useCallback(async () => {
    try {
      const response = await fetchWithAuth('http://localhost:3000/api/v1/users/me', { 
        method: 'GET' 
      });
      const userData = await response.json();
      dispatch(setUser(userData));
      return userData;
    } catch (err) {
      console.error('Ошибка getUserInfo:', err);
      setError('Не удалось загрузить данные пользователя');
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
    getUserInfo 
  };
};

export default useAuth;