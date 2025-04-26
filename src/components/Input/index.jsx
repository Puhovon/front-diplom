import { useState } from 'react';
import styles from './styles.module.css';
import closedEye from '@assets/mystic_eye_password_keeper_closed.svg';
import openedEye from '@assets/mystic_eye_password_keeper_opened.svg';

const InputWithLabel = ({
  id,
  label,
  type = "text",
  error,
  ...inputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Определяем реальный тип инпута
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <div className={styles.inputWrapper}>
        <input
          id={id}
          type={inputType}
          className={`${styles.inputField} ${error ? styles.error : ''}`}
          aria-describedby={error ? `${id}-error` : undefined}
          {...inputProps}
        />

        {type === 'password' && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
          >
            <img className={styles.img} src={showPassword ? closedEye : openedEye} alt="скрыть/показать пароль" />
          </button>
        )}
      </div>

      {error && (
        <div id={`${id}-error`} className={styles.errorMessage}>
          {error}
        </div>
      )}
    </div>
  );
};

export default InputWithLabel;