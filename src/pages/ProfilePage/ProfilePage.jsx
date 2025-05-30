import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import {
  Avatar, CircularProgress, Alert, Fade,
  Typography, Box, Button
} from '@mui/material';
import styles from './Profile.module.css';
import defaultAvatar from '@assets/icons/default-avatar.svg';
import man from '@assets/icons/lawyers/man.png';
import profile2 from '@assets/icons/profile/profile2.png';
import profile3 from '@assets/icons/profile/profile3.png';
import profile4 from '@assets/icons/profile/profile4.png';
import profile5 from '@assets/icons/profile/profile5.png';
import profile6 from '@assets/icons/profile/profile6.png';
import profile8 from '@assets/icons/profile/profile8.png';
import profile9 from '@assets/icons/profile/profile9.png';
import profile10 from '@assets/icons/profile/profile10.png';
import FeedbackForm from '@components/FeedBackForm/feedBackForm';
import Reviews from '@components/Reviews/Reviews';

const ProfilePage = () => {
  const { userId } = useParams();
  const { user, accessToken, fetchWithAuth, isLoading: authLoading, error: authError } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  // Инициализация формы редактирования
  const initForm = useCallback((data) => ({
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    patronymic: data?.patronymic || '',
    birthDate: data?.birthDate || '',
    gender: data?.gender || '',
    aboutMe: data?.LawyerProfile?.aboutMe || '',
    education: data?.LawyerProfile?.education || '',
    experienceStartDate: data?.LawyerProfile?.experienceStartDate || '',
    region: data?.LawyerProfile?.region || '',
    price: data?.LawyerProfile?.price || '',
  }), []);
  const [editForm, setEditForm] = useState(initForm(null));

  const onReviewSubmit = (message) => {
    fetchWithAuth(`http://localhost:3000/api/v1/lawyers/${userId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(message)
    });
  };

  // Обработка оплаты с редиректом
  const handlePayment = async () => {
    if (!accessToken) {
      setError('Требуется авторизация для оплаты');
      return;
    }

    setIsPaying(true);
    setError(null);

    try {
      const response = await fetchWithAuth(`http://localhost:3000/api/v1/payments`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        body: JSON.stringify({ lawyerId: userId }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status} - ${response.statusText}`);
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('URL для оплаты не найден в ответе сервера');
      }
    } catch (err) {
      console.error('Payment Error:', err);
      if (err instanceof SyntaxError) {
        setError('Сервер вернул некорректный или пустой ответ');
      } else {
        setError(err.message || 'Не удалось выполнить оплату');
      }
    } finally {
      setIsPaying(false);
    }
  };

  // Загрузка профиля
  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!accessToken) throw new Error('Требуется авторизация');

      let data;
      console.log('userId from useParams:', userId);
      if (userId && userId !== 'edit') {
        const url = `http://localhost:3000/api/v1/users/${userId}`;
        console.log('Fetching profile for userId:', url);
        const response = await fetchWithAuth(url);
        data = await response.json();
      } else {
        const url = 'http://localhost:3000/api/v1/users/me';
        console.log('Fetching current user profile:', url);
        const response = await fetchWithAuth(url);
        data = await response.json();
        if (!data) throw new Error('Не удалось загрузить данные пользователя');
      }
      setProfileData(data);
    } catch (err) {
      console.error('Load Profile Error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, userId, fetchWithAuth]);

  useEffect(() => {
    if (!authLoading) loadProfile();
  }, [authLoading, loadProfile]);

  // Обработка удаления аккаунта
  const handleDeleteAccount = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить аккаунт? Это действие необратимо.')) return;

    setIsLoading(true);
    setError(null);

    try {
      await fetchWithAuth('http://localhost:3000/api/v1/users/me', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      window.location.href = '/login';
    } catch (err) {
      setError(err.message || 'Не удалось удалить аккаунт');
    } finally {
      setIsLoading(false);
    }
  };

  // Рендеринг состояния загрузки
  const renderLoading = () => (
    <Fade in timeout={500}>
      <div className={styles.loadingContainer}>
        <CircularProgress size={40} thickness={4} />
        <Typography className={styles.loadingText}>Загрузка...</Typography>
      </div>
    </Fade>
  );

  // Рендеринг состояния ошибки
  const renderError = (message) => (
    <Fade in timeout={500}>
      <Alert severity="error" className={styles.alert}>
        <Typography variant="h6">Ошибка</Typography>
        {message}
      </Alert>
    </Fade>
  );

  if (authLoading || isLoading) return renderLoading();
  if (error || authError) return renderError(error || authError);
  if (!profileData) return renderError('Профиль не найден');

  const isClient = profileData.role === 'client';
  const { LawyerProfile } = profileData;

  // Рендеринг элемента информации
  const renderInfoItem = (icon, label, value, transformFn = (v) => v) => (
    <div className={styles.infoItem}>
      <img src={icon} alt={`Иконка ${label}`} />
      <Typography className={styles.label}>{label}:</Typography>
      <Typography className={styles.value}>{transformFn(value) || 'Не указано'}</Typography>
    </div>
  );

  // Рендеринг профиля
  const renderProfileView = () => (
    <>
      <Typography variant="h4" className={styles.title}>
        {`${profileData.lastName || ''} ${profileData.firstName || ''} ${profileData.patronymic || ''}`}
      </Typography>

      {!isClient && LawyerProfile && (
        <>
          <Typography className={styles.subtitle}>
            Специализация: {LawyerProfile.Specializations?.join(', ') || 'Не указана'}
          </Typography>
          <Typography className={styles.rating}>4.5 ★</Typography>
        </>
      )}
      {userId && user.role === 'client' && profileData.role === 'lawyer' && (
        <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            disabled={isPaying || isLoading}
            startIcon={isPaying ? <CircularProgress size={20} /> : null}
          >
            {isPaying ? 'Обработка...' : 'Оплатить услуги'}
          </Button>
        </Box>
      )}
      <div className={styles.description}>
        <Typography variant="h5" className={styles.sectionTitle}>О себе</Typography>
        <Typography variant='p'>{LawyerProfile?.aboutMe}</Typography>
      </div>

      <div className={styles.infoList}>
        {renderInfoItem(profile9, 'ФИО', `${profileData.lastName} ${profileData.firstName} ${profileData.patronymic}`)}
        {renderInfoItem(
          profile3,
          'Возраст',
          profileData.birthDate,
          (date) => (date ? new Date().getFullYear() - new Date(date).getFullYear() : null)
        )}
        {isClient &&
          renderInfoItem(
            profile10,
            'Пол',
            profileData.gender,
            (gender) => (gender === 'male' ? 'Мужской' : gender === 'female' ? 'Женский' : null)
          )}
        {!isClient && LawyerProfile && (
          <>
            {renderInfoItem(profile4, 'Образование', LawyerProfile.education)}
            {renderInfoItem(
              profile2,
              'Опыт работы',
              LawyerProfile.experienceStartDate,
              (date) => (date ? `${new Date().getFullYear() - new Date(date).getFullYear()} лет` : null)
            )}
            {renderInfoItem(profile5, 'Регион', LawyerProfile.region)}
            {renderInfoItem(profile8, 'Цена', LawyerProfile.price, (price) => (price ? `${price} ₽` : null))}
            {renderInfoItem(
              profile3,
              'Статус',
              LawyerProfile.isConfirmed,
              (isConfirmed) => (isConfirmed ? 'Подтверждён' : 'Не подтверждён')
            )}
          </>
        )}
      </div>
      {!userId && (
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            component={Link}
            to="/profile/edit"
            disabled={isLoading}
          >
            Редактировать профиль
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteAccount}
            disabled={isLoading}
          >
            Удалить аккаунт
          </Button>
        </Box>
      )}
      {userId && user.role === 'client' && profileData.role === 'lawyer' && (
        <FeedbackForm callBack={onReviewSubmit} />
      )}
      {userId && profileData.role === 'lawyer' && (
        <Reviews reviews={profileData.LawyerProfile.reviews} />
      )}
    </>
  );

  return (
    <Box className={styles.profileContainer}>
      <Box className={styles.profileCard}>
        <Box className={styles.avatarSection}>
          <Avatar
            alt="Аватар пользователя"
            src={profileData.avatar_url || defaultAvatar}
            sx={{ width: 150, height: 150, border: '2px solid #e0e0e0' }}
          />
        </Box>
        <Box className={styles.infoSection}>{renderProfileView()}</Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;