import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import { Avatar, CircularProgress, Alert, AlertTitle, Fade } from '@mui/material';
import styles from './Profile.module.css';
import defaultAvatar from '@assets/icons/default-avatar.png';

const Profile = () => {
  const { userId } = useParams();
  const { user, accessToken, getUserInfo } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenLoading, setIsTokenLoading] = useState(true);
  const [error, setError] = useState(null);

  // Проверка токена
  useEffect(() => {
    const checkToken = async () => {
      try {
        if (accessToken === undefined || accessToken === null) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      } catch (err) {
        console.error('Ошибка проверки токена:', err);
      } finally {
        setIsTokenLoading(false);
      }
    };
    checkToken();
  }, [accessToken]);

  // Загрузка данных профиля
  useEffect(() => {
    const fetchProfileData = async () => {
      if (isTokenLoading) return;

      if (!userId && !accessToken) {
        navigate('/login');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        if (userId) {
          const headers = {
            'Content-Type': 'application/json',
          };
          if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
          }
          const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
            method: 'GET',
            headers,
          });
          if (!response.ok) {
            if (response.status === 401) {
              throw new Error('Для просмотра профиля требуется авторизация');
            }
            throw new Error('Не удалось загрузить данные пользователя');
          }
          const userData = await response.json();
          setProfileData(userData);
        } else if (!user || !Object.keys(user).length) {
          await getUserInfo();
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId, accessToken, user, navigate, isTokenLoading]);

  // Отображение загрузки токена
  if (isTokenLoading) {
    return (
      <Fade in={true} timeout={500}>
        <div className={styles.loadingContainer}>
          <CircularProgress size={40} thickness={4} />
          <p className={styles.loadingText}>Проверка авторизации...</p>
        </div>
      </Fade>
    );
  }

  // Требуется авторизация
  if (!userId && !accessToken) {
    return (
      <Fade in={true} timeout={500}>
        <Alert severity="warning" className={styles.alert}>
          <AlertTitle>Требуется авторизация</AlertTitle>
          Пожалуйста,{' '}
          <Link to="/login" className={styles.alertLink}>
            войдите
          </Link>{' '}
          для просмотра своего профиля.
        </Alert>
      </Fade>
    );
  }

  // Отображение загрузки данных
  if (isLoading) {
    return (
      <Fade in={true} timeout={500}>
        <div className={styles.loadingContainer}>
          <CircularProgress size={40} thickness={4} />
          <p className={styles.loadingText}>Загрузка профиля...</p>
        </div>
      </Fade>
    );
  }

  // Отображение ошибки
  if (error) {
    return (
      <Fade in={true} timeout={500}>
        <Alert severity="error" className={styles.alert}>
          <AlertTitle>Ошибка</AlertTitle>
          {error}
        </Alert>
      </Fade>
    );
  }

  // Данные пользователя еще не загружены
  if (!user && !userId) {
    return (
      <Fade in={true} timeout={500}>
        <div className={styles.loadingContainer}>
          <CircularProgress size={40} thickness={4} />
          <p className={styles.loadingText}>Загрузка вашего профиля...</p>
        </div>
      </Fade>
    );
  }

  // Определяем данные для отображения
  const displayUser = userId ? profileData : user;

  if (!displayUser) {
    return (
      <Fade in={true} timeout={500}>
        <Alert severity="info" className={styles.alert}>
          <AlertTitle>Данные не найдены</AlertTitle>
          Данные пользователя не найдены.
        </Alert>
      </Fade>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <Avatar
            alt="Аватар пользователя"
            src={displayUser.avatar_url || defaultAvatar}
            sx={{
              width: 150,
              height: 150,
              border: '2px solid #e0e0e0',
              '@media (max-width: 768px)': {
                width: 120,
                height: 120,
              },
            }}
          />
        </div>
        <div className={styles.infoSection}>
          <h1 className={styles.title}>
            {userId ? `Профиль юриста` : 'Ваш профиль'}
            {userId && <span className={styles.userId}> (ID: {userId})</span>}
          </h1>
          <div className={styles.infoItem}>
            <span className={styles.label}>Имя:</span>
            <span className={styles.value}>
              {`${displayUser.firstName || ''} ${displayUser.lastName || ''} ${displayUser.patronymic || ''}`.trim() || 'Не указано'}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{displayUser.email || 'Не указано'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Роль:</span>
            <span className={styles.value}>{displayUser.role || 'Не указано'}</span>
          </div>
          {displayUser.role === 'lawyer' && displayUser.LawyerProfile && (
            <>
              <div className={styles.infoItem}>
                <span className={styles.label}>Специализация:</span>
                <span className={styles.value}>
                  {displayUser.LawyerProfile.Specializations?.length > 0
                    ? displayUser.LawyerProfile.Specializations.join(', ')
                    : 'Не указана'}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Регион:</span>
                <span className={styles.value}>{displayUser.LawyerProfile.region || 'Не указано'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Образование:</span>
                <span className={styles.value}>{displayUser.LawyerProfile.education || 'Не указано'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Цена за консультацию:</span>
                <span className={styles.value}>
                  {displayUser.LawyerProfile.price ? `${displayUser.LawyerProfile.price} ₽` : 'Не указана'}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Опыт с:</span>
                <span className={styles.value}>
                  {displayUser.LawyerProfile.experienceStartDate
                    ? new Date(displayUser.LawyerProfile.experienceStartDate).toLocaleDateString('ru-RU')
                    : 'Не указано'}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Статус профиля:</span>
                <span className={styles.value}>
                  {displayUser.LawyerProfile.isConfirmed ? 'Подтверждён' : 'Не подтверждён'}
                </span>
              </div>
              {displayUser.LawyerProfile.aboutMe && (
                <div className={styles.infoItem}>
                  <span className={styles.label}>О себе:</span>
                  <p className={styles.bio}>{displayUser.LawyerProfile.aboutMe}</p>
                </div>
              )}
            </>
          )}
          {!accessToken && (
            <div className={styles.loginPrompt}>
              <p>
                Чтобы связаться с пользователем,{' '}
                <Link to="/login" className={styles.loginLink}>
                  войдите
                </Link>{' '}
                или{' '}
                <Link to="/registration" className={styles.loginLink}>
                  зарегистрируйтесь
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;