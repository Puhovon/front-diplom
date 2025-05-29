import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '@hooks/useAuth';
import { updateProfile, fetchProfile, clearProfileError, clearProfileSuccess } from '../../store/profileSlice';
import {
  Avatar, CircularProgress, Alert, Fade,
  TextField, Button, Select, MenuItem,
  FormControl, InputLabel, Typography, Box
} from '@mui/material';
import styles from './Profile.module.css';
import defaultAvatar from '@assets/icons/default-avatar.png';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { accessToken } = useAuth();
  const { profileData, isLoading, error: profileError, success } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    birthDate: '',
    gender: '',
    aboutMe: '',
    education: '',
    experienceStartDate: '',
    region: '',
    price: '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form values
  const initForm = useCallback((data) => ({
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    patronymic: data?.patronymic || '',
    birthDate: data?.birthDate?.split('T')[0] || '',
    gender: data?.gender || '',
    aboutMe: data?.LawyerProfile?.aboutMe || '',
    education: data?.LawyerProfile?.education || '',
    experienceStartDate: data?.LawyerProfile?.experienceStartDate?.split('T')[0] || '',
    region: data?.LawyerProfile?.region || '',
    price: data?.LawyerProfile?.price || '',
  }), []);

  // Load profile data
  useEffect(() => {
    if (accessToken) {
      dispatch(fetchProfile({ accessToken }));
    }
  }, [dispatch, accessToken]);

  // Update form values when profileData changes
  useEffect(() => {
    if (profileData) {
      setFormValues(initForm(profileData));
    }
  }, [profileData, initForm]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    dispatch(clearProfileError());
    dispatch(clearProfileSuccess());

    try {
      const isClient = profileData?.role === 'client';
      const body = {
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        patronymic: formValues.patronymic.trim(),
        birthDate: formValues.birthDate,
        gender: formValues.gender,
      };

      // Validate required fields
      if (!body.firstName || !body.lastName) {
        throw new Error('Имя и фамилия обязательны для заполнения');
      }

      if (!isClient) {
        body.LawyerProfile = {
          aboutMe: formValues.aboutMe.trim(),
          education: formValues.education.trim(),
          experienceStartDate: formValues.experienceStartDate,
          region: formValues.region.trim(),
          price: formValues.price ? parseFloat(formValues.price) : null,
        };

        if (body.LawyerProfile.price && isNaN(body.LawyerProfile.price)) {
          throw new Error('Цена должна быть числом');
        }
      }

      await dispatch(updateProfile({
        payload: body,
        accessToken,
      })).unwrap();

      navigate('/profile', { state: { profileUpdated: true } });
    } catch (err) {
      console.error('Ошибка сохранения:', err);
      setError(err.message || 'Не удалось сохранить изменения');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render loading state
  const renderLoading = () => (
    <Fade in timeout={500}>
      <div className={styles.loadingContainer}>
        <CircularProgress size={40} thickness={4} />
        <Typography className={styles.loadingText}>Загрузка профиля...</Typography>
      </div>
    </Fade>
  );

  // Render error state
  const renderError = (message) => (
    <Fade in timeout={500}>
      <Alert severity="error" className={styles.alert}>
        <Typography variant="h6">Ошибка</Typography>
        {message}
        {!accessToken && (
          <Typography>
            <Link to="/login" className={styles.alertLink}>Войдите</Link> заново.
          </Typography>
        )}
      </Alert>
    </Fade>
  );

  if (isLoading) return renderLoading();
  if (error || profileError) return renderError(error || profileError);
  if (!profileData) return renderError('Профиль не найден');

  const isClient = profileData.role === 'client';

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
          <Typography variant="h4" className={styles.title}>
            Редактирование профиля
          </Typography>
          
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}
          
          {(error || profileError) && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error || profileError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                name="firstName"
                label="Имя"
                value={formValues.firstName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                disabled={isSubmitting}
              />
              <TextField
                name="lastName"
                label="Фамилия"
                value={formValues.lastName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
                disabled={isSubmitting}
              />
              <TextField
                name="patronymic"
                label="Отчество"
                value={formValues.patronymic}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                disabled={isSubmitting}
              />
              <TextField
                name="birthDate"
                label="Дата рождения"
                type="date"
                value={formValues.birthDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                disabled={isSubmitting}
              />
              
              {isClient && (
                <FormControl fullWidth margin="normal" disabled={isSubmitting}>
                  <InputLabel>Пол</InputLabel>
                  <Select
                    name="gender"
                    value={formValues.gender}
                    onChange={handleInputChange}
                    label="Пол"
                    required
                  >
                    <MenuItem value="male">Мужской</MenuItem>
                    <MenuItem value="female">Женский</MenuItem>
                  </Select>
                </FormControl>
              )}
              
              {!isClient && (
                <>
                  <TextField
                    name="aboutMe"
                    label="О себе"
                    multiline
                    rows={4}
                    value={formValues.aboutMe}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled={isSubmitting}
                  />
                  <TextField
                    name="education"
                    label="Образование"
                    value={formValues.education}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled={isSubmitting}
                  />
                  <TextField
                    name="experienceStartDate"
                    label="Начало опыта работы"
                    type="date"
                    value={formValues.experienceStartDate}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                    disabled={isSubmitting}
                  />
                  <TextField
                    name="region"
                    label="Регион"
                    value={formValues.region}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled={isSubmitting}
                  />
                  <TextField
                    name="price"
                    label="Цена (руб)"
                    type="number"
                    value={formValues.price}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled={isSubmitting}
                    inputProps={{ min: 0, step: 100 }}
                  />
                </>
              )}
            </Box>
            
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/profile')}
                disabled={isSubmitting}
              >
                Отмена
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;