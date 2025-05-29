import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import { Avatar, CircularProgress, Alert, AlertTitle, Fade } from '@mui/material';
import styles from './Profile.module.css';
import defaultAvatar from '@assets/icons/default-avatar.png';
import man from '@assets/icons/lawyers/man.png';

const Profile = () => {
  const { userId } = useParams();
  const { user, accessToken, getUserInfo } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenLoading, setIsTokenLoading] = useState(true);
  const [isUserInfoLoading, setIsUserInfoLoading] = useState(false);
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
        setError('Ошибка проверки авторизации');
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
        } else if (!user && !isUserInfoLoading) {
          setIsUserInfoLoading(true);
          console.log('Вызываем getUserInfo для текущего пользователя');
          await getUserInfo();
          setIsUserInfoLoading(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId, accessToken, navigate, isTokenLoading]);

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
  if (isLoading || isUserInfoLoading) {
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
          {error.includes('авторизация') && (
            <p>
              Попробуйте{' '}
              <Link to="/login" className={styles.alertLink}>
                войти
              </Link>{' '}
              заново.
            </p>
          )}
        </Alert>
      </Fade>
    );
  }

  // Определяем данные для отображения
  const displayUser = userId ? profileData : user;

  // Если данные не загружены
  if (!displayUser) {
    return (
      <Fade in={true} timeout={500}>
        <Alert severity="info" className={styles.alert}>
          <AlertTitle>Данные не найдены</AlertTitle>
          Данные пользователя не найдены. Попробуйте обновить страницу или{' '}
          <Link to="/login" className={styles.alertLink}>
            войти
          </Link>{' '}
          заново.
        </Alert>
      </Fade>
    );
  }

  // Проверяем, является ли пользователь клиентом
  const isClient = displayUser.role === 'client';

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
            {displayUser.firstName} {displayUser.lastName} {displayUser.patronymic}
          </h1>
          {!isClient && (
            <>
              <p className={styles.subtitle}>
                Специализация:{' '}
                {displayUser.LawyerProfile?.Specializations?.length > 0
                  ? displayUser.LawyerProfile.Specializations.join(', ')
                  : 'Не указана'}
              </p>
              <span className={styles.rating}>4.5 ★</span>
            </>
          )}
          <div className={styles.description}>
            <h2 className={styles.sectionTitle}>О себе</h2>
            <p>{displayUser.LawyerProfile?.aboutMe || 'Информация о пользователе отсутствует'}</p>
          </div>
          {!isClient && displayUser.LawyerProfile && (
            <>
              <h2 className={styles.sectionTitle}>Данные специалиста</h2>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <img src={man} alt="man" />
                  <span className={styles.label}>Возраст:</span>
                  <span className={styles.value}>
                    {displayUser.birthDate
                      ? new Date().getFullYear() - new Date(displayUser.birthDate).getFullYear()
                      : 'Не указано'}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <img src={man} alt="man" />
                  <span className={styles.label}>Специализация:</span>
                  <span className={styles.value}>
                    {displayUser.LawyerProfile.Specializations?.length > 0
                      ? displayUser.LawyerProfile.Specializations.join(', ')
                      : 'Не указана'}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <img src={man} alt="man" />
                  <span className={styles.label}>Образование:</span>
                  <span className={styles.value}>
                    {displayUser.LawyerProfile.education || 'Не указано'}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <img src={man} alt="man" />
                  <span className={styles.label}>Опыт работы:</span>
                  <span className={styles.value}>
                    {displayUser.LawyerProfile.experienceStartDate
                      ? `${new Date().getFullYear() - new Date(displayUser.LawyerProfile.experienceStartDate).getFullYear()} лет`
                      : 'Не указано'}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <img src={man} alt="man" />
                  <span className={styles.label}>Регион:</span>
                  <span className={styles.value}>
                    {displayUser.LawyerProfile.region || 'Не указано'}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <img src={man} alt="man" />
                  <span className={styles.label}>Цена за консультацию:</span>
                  <span className={styles.value}>
                    {displayUser.LawyerProfile.price ? `${displayUser.LawyerProfile.price} ₽` : 'Не указано'}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <img src={man} alt="man" />
                  <span className={styles.label}>Статус профиля:</span>
                  <span className={styles.value}>
                    {displayUser.LawyerProfile.isConfirmed ? 'Подтверждён' : 'Не подтверждён'}
                  </span>
                </div>
              </div>
            </>
          )}
          {isClient && (
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <img src={man} alt="man" />
                <span className={styles.label}>Возраст:</span>
                <span className={styles.value}>
                  {displayUser.birthDate
                    ? new Date().getFullYear() - new Date(displayUser.birthDate).getFullYear()
                    : 'Не указано'}
                </span>
              </div>
            </div>
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