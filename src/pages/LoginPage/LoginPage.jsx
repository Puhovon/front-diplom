import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTokens, setUser } from '../../store/registrationSlice.js';
import styles from '@styles/loginPage.module.css';
import logo from '@assets/icons/logo_blue.png';
import Input from '@components/Input/index.jsx';
import Modal from '@components/ErrModal/index.jsx';
import useAuth from '@hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isLoading, fetchWithoutAuth } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Почта обязательна';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 8 || formData.password.length > 32) {
      newErrors.password = 'Пароль должен быть от 8 до 32 символов';
    }

    setFormErrors(newErrors);
    setIsModalOpen(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFormErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetchWithoutAuth(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      const { user, accessToken, refreshToken } = result;

      dispatch(setTokens({ accessToken, refreshToken }));
      dispatch(setUser(user));

      setFormData({ email: '', password: '' });
      setFormErrors({});
      setIsModalOpen(false);
      navigate(user.role === 'lawyer' ? '/' : '/');
    } catch (err) {
      console.error('Ошибка:', err.message);
      setFormErrors({ server: err.message || 'Ошибка отправки данных на сервер' });
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormErrors({});
  };

  return (
    <div className={styles.login}>
      <Link className={styles.logo} to="/">
        <img src={logo} alt="Назад" />
      </Link>
      <div className={styles.leftWrapper}>
        <h3 className={styles.logIn}>Войти</h3>
        {(error || formErrors.server) && (
          <p className={styles.authError}>{error || formErrors.server}</p>
        )}
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Почта"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={formErrors.email}
            placeholder="Введите электронную почту"
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Пароль"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            error={formErrors.password}
            placeholder="Введите пароль"
            disabled={isLoading}
          />
          <Link to="/passwordRefresh" className={styles.link}>
            Забыли пароль?
          </Link>
          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Загрузка...' : 'Войти'}
          </button>
        </form>
        <div className={styles.registerLinkContainer}>
          <p className={styles.text}>Нет аккаунта?</p>
          <Link to="/registration" className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>
        <Modal isOpen={isModalOpen} errors={formErrors} onClose={closeModal} />
      </div>
      <div className={styles.rightWrapper} />
    </div>
  );
};

export default Login;