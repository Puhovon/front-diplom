import { Link } from 'react-router-dom';
import styles from './style.module.css';
import defaultAvatar from '../../assets/icons/default-avatar.svg';
// import StarIcon from '../../assets/icons/star.svg';

const LawyerCard = ({ id, name, specialization, city, photo, rating }) => {
  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        <img
          src={defaultAvatar}
          alt={`Аватар ${name}`}
          className={styles.avatarImage}
          loading="lazy"
        />
      </div>
      <div className={styles.infoContainer}>
        <h3 className={styles.name}>
          {name}
          {rating !== null && rating !== undefined ? (
            <span className={styles.rating}>
              {/* <img src={StarIcon} alt="Звезда рейтинга" className={styles.starIcon} /> */}
              {rating.toFixed(1)}
            </span>
          ) : (
            <span className={styles.rating}>Без рейтинга</span>
          )}
        </h3>
        <p className={styles.info}>
          <span className={styles.label}>Специализация:</span>{' '}
          <span className={styles.labelBold}>{specialization || 'Не указано'}</span>
        </p>
        <p className={styles.info}>
          <span className={styles.label}>Город:</span> <span className={styles.labelBold}>{city || 'Не указано'}</span>
        </p>
        <div className={styles.actionContainer}>
        <Link to={`/profile/${id}`} className={styles.profileLink}>
          <button type="button" className={styles.profileButton}>
            Посмотреть профиль
          </button>
        </Link>
      </div>
      </div>
    
    </div>
  );
};

export default LawyerCard;