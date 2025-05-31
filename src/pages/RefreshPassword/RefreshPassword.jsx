import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@components/Input/index.jsx';
import styles from './refreshPassword.module.css';

const RefreshPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Ошибка при отправке запроса на восстановление пароля');
      }

      setSuccess('Ссылка для восстановления пароля отправлена на вашу почту');
      setEmail('');
    } catch (err) {
      setError(err.message || 'Ошибка сети');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <p className={styles.subtitle}>
          Введите почту, указанную при регистрации. Мы отправим ссылку для сброса пароля
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          id="mail"
          label="Почта"
          type="email"
          value={email}
          onChange={handleInputChange}
          error={error}
          placeholder="Введите электронную почту"
        />
        {success && <p className={styles.success}>{success}</p>}
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Отправка...' : 'Отправить'}
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

export default RefreshPassword;