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
import FeedbackForm from '@components/FeedBackForm/feedBackForm';

const ProfilePage = () => {
  const { userId } = useParams();
  const { user, accessToken, fetchWithAuth, isLoading: authLoading, error: authError } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
  console.log(user);
  const [editForm, setEditForm] = useState(initForm(null));

  const onReviewSubmit = (message) => {
    fetchWithAuth('http://localhost:3000/api/v1/lawyers/1/reviews', {
      method: 'POST',
      body: JSON.stringify(message)}
    )
  }

  // Загрузка профиля
  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!accessToken) throw new Error('Требуется авторизация');

      let data;
      // Debug: Log the userId and the constructed URL
      console.log('userId from useParams:', userId);
      if (userId && userId !== 'edit') {
        // Fetch another user's profile
        const url = `http://localhost:3000/api/v1/users/${userId}`;
        console.log('Fetching profile for userId:', url);
        const response = await fetchWithAuth(url);
        data = await response.json();
      } else {
        // Fetch current user's profile
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
      console.log(profileData)
    }
  }, [accessToken, userId, fetchWithAuth]);

  useEffect(() => {
    if (!authLoading) loadProfile();
  }, [authLoading, loadProfile]);

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить аккаунт? Это действие необратимо.')) return;

    setIsLoading(true);
    setError(null);

    try {
      await fetchWithAuth('http://localhost:3000/api/v1/users/me', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      // Assuming successful deletion logs the user out or redirects
      window.location.href = '/login';
    } catch (err) {
      setError(err.message || 'Не удалось удалить аккаунт');
    } finally {
      setIsLoading(false);
    }
  };

  // Render loading state
  const renderLoading = () => (
    <Fade in timeout={500}>
      <div className={styles.loadingContainer}>
        <CircularProgress size={40} thickness={4} />
        <Typography className={styles.loadingText}>Загрузка...</Typography>
      </div>
    </Fade>
  );

  // Render error state
  const renderError = (message) => (
    <Fade in timeout={500}>
      <Alert severity="error" className={styles.alert}>
        <Typography variant="h6">Ошибка</Typography>
        {message}
        <Typography>
          <Link to="/login" className={styles.alertLink}>Войдите</Link> заново.
        </Typography>
      </Alert>
    </Fade>
  );

  if (authLoading || isLoading) return renderLoading();
  if (error || authError) return renderError(error || authError);
  if (!profileData) return renderError('Профиль не найден');

  const isClient = profileData.role === 'client';
  const { LawyerProfile } = profileData;

  // Render individual info item
  const renderInfoItem = (icon, label, value, transformFn = (v) => v) => (
    <div className={styles.infoItem}>
      <img src={icon} alt={`Иконка ${label}`} />
      <Typography className={styles.label}>{label}:</Typography>
      <Typography className={styles.value}>{transformFn(value) || 'Не указано'}</Typography>
    </div>
  );

  // Render profile view
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

      <div className={styles.description}>
        <Typography variant="h5" className={styles.sectionTitle}>О себе</Typography>
        <Typography variant='p'>{LawyerProfile?.aboutMe}</Typography>
      </div>

      <div className={styles.infoList}>
        {renderInfoItem(man, 'Имя', profileData.firstName)}
        {renderInfoItem(man, 'Фамилия', profileData.lastName)}
        {renderInfoItem(man, 'Отчество', profileData.patronymic)}
        {renderInfoItem(
          man,
          'Возраст',
          profileData.birthDate,
          (date) => (date ? new Date().getFullYear() - new Date(date).getFullYear() : null)
        )}
        {isClient &&
          renderInfoItem(
            man,
            'Пол',
            profileData.gender,
            (gender) => (gender === 'male' ? 'Мужской' : gender === 'female' ? 'Женский' : null)
          )}
        {!isClient && LawyerProfile && (
          <>
            {renderInfoItem(man, 'Образование', LawyerProfile.education)}
            {renderInfoItem(
              man,
              'Опыт работы',
              LawyerProfile.experienceStartDate,
              (date) => (date ? `${new Date().getFullYear() - new Date(date).getFullYear()} лет` : null)
            )}
            {renderInfoItem(man, 'Регион', LawyerProfile.region)}
            {renderInfoItem(man, 'Цена', LawyerProfile.price, (price) => (price ? `${price} ₽` : null))}
            {renderInfoItem(
              man,
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
      {userId && user.role =='client' && (
        <Box>
          <FeedbackForm callBack={onReviewSubmit}/>
        </Box>
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