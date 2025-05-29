import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import {
  Avatar, CircularProgress, Alert, Fade,
  TextField, Button, Select, MenuItem,
  FormControl, InputLabel, Typography, Box
} from '@mui/material';
import styles from './Profile.module.css';
import defaultAvatar from '@assets/icons/default-avatar.png';
import man from '@assets/icons/lawyers/man.png';
import FeedbackForm from '@components/FeedBackForm/feedBackForm';

const Profile = () => {
  const { userId } = useParams();
  const { user, accessToken, fetchWithAuth, getUserInfo, isLoading: authLoading, error: authError } = useAuth();
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

  const [editForm, setEditForm] = useState(initForm(null));

  // Загрузка профиля
  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!accessToken && !userId) throw new Error('Требуется авторизация');

      let data;
      if (userId) {
        const response = await fetchWithAuth(`http://localhost:3000/api/v1/users/${userId}`);
        data = await response.json();
      } else {
        data = user || (await getUserInfo());
        if (!data) throw new Error('Не удалось загрузить данные пользователя');
        setEditForm(initForm(data));
      }
      setProfileData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, userId, user, fetchWithAuth, getUserInfo, initForm]);

  useEffect(() => {
    if (!authLoading) loadProfile();
  }, [authLoading, loadProfile]);

  // Сохранение изменений
  const handleSaveChanges = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const isClient = profileData?.role === 'client';
      const body = {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        patronymic: editForm.patronymic,
        birthDate: editForm.birthDate,
        gender: editForm.gender,
        ...(!isClient && {
          LawyerProfile: {
            aboutMe: editForm.aboutMe,
            education: editForm.education,
            experienceStartDate: editForm.experienceStartDate,
            region: editForm.region,
            price: editForm.price ? parseFloat(editForm.price) : null,
          }
        })
      };

      const response = await fetchWithAuth('http://localhost:3000/api/v1/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const updatedUser = await response.json();
      setProfileData(updatedUser);
      setIsEditing(false);
      await getUserInfo();
    } catch (err) {
      setError(err.message || 'Не удалось сохранить изменения');
    } finally {
      setIsLoading(false);
    }
  }, [editForm, profileData, fetchWithAuth, getUserInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // Вспомогательные функции для рендеринга
  const renderLoading = () => (
    <Fade in timeout={500}>
      <div className={styles.loadingContainer}>
        <CircularProgress size={40} thickness={4} />
        <Typography className={styles.loadingText}>Загрузка...</Typography>
      </div>
    </Fade>
  );

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

  // Рендер элементов информации
  const renderInfoItem = (icon, label, value, transformFn = v => v) => (
    <div className={styles.infoItem}>
      <img src={icon} alt={`Иконка ${label}`} />
      <Typography className={styles.label}>{label}:</Typography>
      <Typography className={styles.value}>{transformFn(value) || 'Не указано'}</Typography>
    </div>
  );

  // Рендер формы редактирования
  const renderEditForm = () => (
    <>
      <TextField name="firstName" label="Имя" value={editForm.firstName} onChange={handleInputChange} fullWidth margin="normal" />
      <TextField name="lastName" label="Фамилия" value={editForm.lastName} onChange={handleInputChange} fullWidth margin="normal" />
      <TextField name="patronymic" label="Отчество" value={editForm.patronymic} onChange={handleInputChange} fullWidth margin="normal" />

      {isClient ? (
        <>
          <TextField name="birthDate" label="Дата рождения" type="date"
            value={editForm.birthDate} onChange={handleInputChange} fullWidth margin="normal"
            InputLabelProps={{ shrink: true }} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Пол</InputLabel>
            <Select name="gender" value={editForm.gender} onChange={handleInputChange} label="Пол">
              <MenuItem value="male">Мужской</MenuItem>
              <MenuItem value="female">Женский</MenuItem>
            </Select>
          </FormControl>
        </>
      ) : (
        <>
          <TextField name="aboutMe" label="О себе" multiline rows={4}
            value={editForm.aboutMe} onChange={handleInputChange} fullWidth margin="normal" />
          <TextField name="education" label="Образование"
            value={editForm.education} onChange={handleInputChange} fullWidth margin="normal" />
          <TextField name="experienceStartDate" label="Дата начала опыта" type="date"
            value={editForm.experienceStartDate} onChange={handleInputChange} fullWidth margin="normal"
            InputLabelProps={{ shrink: true }} />
          <TextField name="region" label="Регион"
            value={editForm.region} onChange={handleInputChange} fullWidth margin="normal" />
          <TextField name="price" label="Цена (₽)" type="number"
            value={editForm.price} onChange={handleInputChange} fullWidth margin="normal" />
        </>
      )}

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSaveChanges} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Сохранить'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)} sx={{ ml: 1 }}>
          Отмена
        </Button>
      </Box>
    </>
  );

  // Рендер просмотра профиля
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
        <Typography>{LawyerProfile?.aboutMe || 'Нет информации'}</Typography>
      </div>

      <div className={styles.infoList}>
        {renderInfoItem(man, 'Возраст', profileData.birthDate,
          date => date ? new Date().getFullYear() - new Date(date).getFullYear() : null)}

        {isClient && renderInfoItem(man, 'Пол', profileData.gender,
          gender => gender === 'male' ? 'Мужской' : gender === 'female' ? 'Женский' : null)}

        {!isClient && LawyerProfile && (
          <>
            {renderInfoItem(man, 'Специализация', LawyerProfile.Specializations?.join(', '))}
            {renderInfoItem(man, 'Образование', LawyerProfile.education)}
            {renderInfoItem(man, 'Опыт работы', LawyerProfile.experienceStartDate,
              date => date ? `${new Date().getFullYear() - new Date(date).getFullYear()} лет` : null)}
            {renderInfoItem(man, 'Регион', LawyerProfile.region)}
            {renderInfoItem(man, 'Цена', LawyerProfile.price, price => price ? `${price} ₽` : null)}
            {renderInfoItem(man, 'Статус', LawyerProfile.isConfirmed, isConfirmed => isConfirmed ? 'Подтверждён' : 'Не подтверждён')}
          </>
        )}
      </div>

      {!userId && (
        <Button variant="contained" color="primary" onClick={() => setIsEditing(true)} sx={{ mt: 2 }}>
          Редактировать профиль
        </Button>
      )}
      {userId && (
        <div>
          <FeedbackForm/>
        </div>
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
        <Box className={styles.infoSection}>
          {isEditing && !userId ? renderEditForm() : renderProfileView()}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;