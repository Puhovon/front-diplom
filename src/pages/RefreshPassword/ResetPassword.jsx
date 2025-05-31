import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Input from '@components/Input/index.jsx';
import styles from './refreshPassword.module.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    passwordRepeat: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError(null);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.password) {
      errors.password = 'Пароль обязателен';
    } else if (formData.password.length < 8 || formData.password.length > 32) {
      errors.password = 'Пароль должен быть от 8 до 32 символов';
    } else if (!/\d/.test(formData.password)) {
      errors.password = 'Пароль должен содержать цифру';
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'Пароль должен содержать заглавную букву';
    }

    if (!formData.passwordRepeat) {
      errors.passwordRepeat = 'Повторите пароль';
    } else if (formData.password !== formData.passwordRepeat) {
      errors.passwordRepeat = 'Пароли не совпадают';
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resetToken) {
      setError('Токен сброса пароля отсутствует');
      return;
    }
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/reset-password/${resetToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: formData.password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Ошибка при сбросе пароля');
      }

      setSuccess('Пароль успешно изменен! Перенаправление на страницу входа...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Ошибка сети');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2 className={styles.title}>Сброс пароля</h2>
        <p className={styles.subtitle}>Введите новый пароль</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          id="password"
          label="Новый пароль"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          error={error?.password}
          placeholder="Введите новый пароль (8-32 символа, цифра, заглавная)"
        />
        <Input
          id="passwordRepeat"
          label="Повторите пароль"
          type="password"
          value={formData.passwordRepeat}
          onChange={handleInputChange}
          error={error?.passwordRepeat}
          placeholder="Повторите новый пароль"
        />
        {success && <p className={styles.success}>{success}</p>}
        {error && !error.password && !error.passwordRepeat && (
          <p className={styles.error}>{error}</p>
        )}
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Сброс...' : 'Сбросить пароль'}
        </button>
      </form>
      <div className={styles.loginLinkContainer}>
        <p className={styles.text}>Вернуться к входу?</p>
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;