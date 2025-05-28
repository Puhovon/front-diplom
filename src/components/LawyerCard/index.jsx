import { Link } from 'react-router-dom';
import styles from './style.module.css';
import defaultAvatar from '@assets/icons/default-avatar.png'; 

const LawyerCard = ({ id, name, specialization, city, photo, rating }) => {
  return (
    <div className={styles.listItem}>
      <div className={styles.avatar}>
        <img
          src={photo || defaultAvatar}
          alt={`${name}'s avatar`}
          className={styles.avatarImage}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.nameUser}>
          {name}
          <span className={styles.rating}>{rating || 'N/A'}</span>
        </h3>
        <p className={styles.otherInfo}>
          Специализация: <span>{specialization || 'Не указано'}</span>
        </p>
        <p className={styles.otherInfo}>
          Город: <span>{city || 'Не указано'}</span>
        </p>
      </div>
      <div className={styles.userProfile}>
        <Link to={`/profile/${id}`}>
          <button type="button" className={styles.profileButton}>
            Профиль
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LawyerCard;