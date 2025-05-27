import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from '@styles/loginPage.module.css';
import logo from '@assets/icons/logo_blue.png';
import Input from '@components/Input/index.jsx';
import Modal from '@components/ErrModal/index.jsx';
import useAuth from '@hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { setAuthTokens, setAuthUser, authError } = useAuth();


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    setErrors(newErrors);
    setIsModalOpen(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const userData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Неверный email или пароль');
      }

      const result = await response.json();
      const { accessToken, refreshToken, user } = result;
      if (accessToken) {
        setAuthTokens({ accessToken, refreshToken });
        setAuthUser({ ...user, role: user.role || 'client' });
      }
      setFormData({ email: '', password: '' });
      setErrors({});
      setIsModalOpen(false);
      navigate(user.role === 'lawyer' ? '/' : '/');
    } catch (error) {
      console.error('Ошибка:', error.message);
      setErrors({ server: error.message || 'Ошибка отправки данных на сервер' });
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.login}>
      <Link className={styles.logo} to="/">
        <img src={logo} alt="Назад" />
      </Link>
      <div className={styles.leftWrapper}>
        <h3 className={styles.logIn}>Войти</h3>
        {authError && <p className={styles.authError}>{authError}</p>}
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Почта"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            placeholder="Введите электронную почту"
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Пароль"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
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
        <Modal isOpen={isModalOpen} errors={errors} onClose={closeModal} />
      </div>
      <div className={styles.rightWrapper} />
    </div>
  );
};

export default Login;