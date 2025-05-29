import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, clearProfileError, clearProfileSuccess } from '@store/profileSlice';
import useAuth from '@hooks/useAuth';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Fade,
} from '@mui/material';
import styles from './EditProfile.module.css';
import LoadingSpinner from '@components/LoadingSpinner';
import ErrorAlert from '@components/ErrorAlert';
import { AVAILABLE_SPECIALIZATIONS } from '@constants/specializations';

const EditProfile = () => {
  const { user, accessToken, authError } = useAuth();
  const { profileData, isLoading, error, success } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    birthDate: '',
    gender: '',
    aboutMe: '',
    specializations: [],
    education: '',
    experienceStartDate: '',
    region: '',
    price: '',
  });

  const isClient = user?.role === 'client';

  useEffect(() => {
    if (profileData) {
      setFormData({
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        patronymic: profileData.patronymic || '',
        birthDate: profileData.birthDate ? profileData.birthDate.split('T')[0] : '',
        gender: profileData.gender || '',
        aboutMe: profileData.LawyerProfile?.aboutMe || '',
        specializations: profileData.LawyerProfile?.Specializations || [],
        education: profileData.LawyerProfile?.education || '',
        experienceStartDate: profileData.LawyerProfile?.experienceStartDate
          ? profileData.LawyerProfile.experienceStartDate.split('T')[0]
          : '',
        region: profileData.LawyerProfile?.region || '',
        price: profileData.LawyerProfile?.price || '',
      });
    } else if (!authError) {
      navigate('/login');
    }
  }, [profileData, navigate, authError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'specializations' ? value.split(',').map((s) => s.trim()).filter(Boolean) : value,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      return 'Имя и фамилия обязательны';
    }
    if (!isClient && formData.price && isNaN(parseFloat(formData.price))) {
      return 'Цена должна быть числом';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      dispatch(clearProfileError());
      dispatch(clearProfileSuccess());
      dispatch(setAuthError(validationError));
      return;
    }

    const payload = isClient
      ? {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          patronymic: formData.patronymic?.trim() || null,
          birthDate: formData.birthDate || null,
          gender: formData.gender || null,
        }
      : {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          patronymic: formData.patronymic?.trim() || null,
          birthDate: formData.birthDate || null,
          gender: formData.gender || null,
          LawyerProfile: {
            aboutMe: formData.aboutMe?.trim() || null,
            Specializations: formData.specializations.length > 0 ? formData.specializations : null,
            education: formData.education?.trim() || null,
            experienceStartDate: formData.experienceStartDate || null,
            region: formData.region?.trim() || null,
            price: formData.price ? parseFloat(formData.price) : null,
          },
        };

    dispatch(updateProfile({ payload, accessToken }));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(clearProfileSuccess());
        navigate('/profile?refresh=true');
      }, 1500);
    }
  }, [success, navigate, dispatch]);

  const renderField = (label, name, type = 'text', props = {}) => (
    <TextField
      label={label}
      name={name}
      type={type}
      value={formData[name] || ''}
      onChange={handleChange}
      fullWidth
      margin="normal"
      className={styles.textField}
      InputLabelProps={type === 'date' ? { shrink: true } : undefined}
      {...props}
    />
  );

  if (isLoading) {
    return <LoadingSpinner message="Сохранение профиля..." />;
  }

  if (authError || error) {
    return <ErrorAlert error={authError || error} />;
  }

  if (success) {
    return (
      <Fade in={true} timeout={500}>
        <Alert severity="success" className={styles.alert}>
          <AlertTitle>Успех</AlertTitle>
          {success}
        </Alert>
      </Fade>
    );
  }

  return (
    <div className={styles.editProfileContainer}>
      <h1 className={styles.title}>Редактировать профиль</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {renderField('Имя', 'firstName', 'text', { required: true })}
        {renderField('Фамилия', 'lastName', 'text', { required: true })}
        {renderField('Отчество', 'patronymic', 'text')}
        {renderField('Дата рождения', 'birthDate', 'date')}
        <FormControl fullWidth margin="normal" className={styles.textField}>
          <InputLabel>Пол</InputLabel>
          <Select name="gender" value={formData.gender} onChange={handleChange} label="Пол">
            <MenuItem value="male">Мужской</MenuItem>
            <MenuItem value="female">Женский</MenuItem>
            <MenuItem value="">Не указан</MenuItem>
          </Select>
        </FormControl>
        {!isClient && (
          <>
            {renderField('О себе', 'aboutMe', 'text', { multiline: true, rows: 4 })}
            {renderField('Специализация (через запятую)', 'specializations')}
            {renderField('Образование', 'education')}
            {renderField('Начало опыта работы', 'experienceStartDate', 'date')}
            {renderField('Регион', 'region')}
            {renderField('Цена за консультацию (₽)', 'price', 'number')}
          </>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;