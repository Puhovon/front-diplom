import React from 'react';
import { Alert, AlertTitle, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styles from './ErrorAlert.module.css';

const ErrorAlert = ({ error, loginLink = true }) => (
  <Fade in={true} timeout={500}>
    <Alert severity="error" className={styles.alert}>
      <AlertTitle>Ошибка</AlertTitle>
      {error}
      {loginLink && (
        <p>
          Попробуйте{' '}
          <Link to="/login" component={RouterLink} className={styles.alertLink}>
            войти
          </Link>{' '}
          заново или проверьте данные.
        </p>
      )}
    </Alert>
  </Fade>
);

export default ErrorAlert;