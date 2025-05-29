import React from 'react';
import { CircularProgress, Fade } from '@mui/material';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ message = 'Загрузка...', size = 40, thickness = 4 }) => (
  <Fade in={true} timeout={500}>
    <div className={styles.loadingContainer}>
      <CircularProgress size={size} thickness={thickness} />
      <p className={styles.loadingText}>{message}</p>
    </div>
  </Fade>
);

export default LoadingSpinner;