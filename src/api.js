import { API_URLS } from '@constants/api';

export const loginUser = async (credentials) => {
  const response = await fetch(API_URLS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Неверный email или пароль');
  }

  return await response.json();
};

export const fetchProfile = async ({ userId, accessToken }) => {
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
};

export const updateProfile = async ({ payload, accessToken }) => {
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
};
export const forgotPassword = async (email) => {
  const response = await fetch('http://localhost:3000/api/v1/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Ошибка при отправке запроса на восстановление пароля');
  }

  return await response.json();
};

export const resetPassword = async ({ resetToken, password }) => {
  const response = await fetch(`http://localhost:3000/api/v1/auth/reset-password/${resetToken}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Ошибка при сбросе пароля');
  }

  return await response.json();
};
export const fetchLawyers = async ({ accessToken }) => {
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
};