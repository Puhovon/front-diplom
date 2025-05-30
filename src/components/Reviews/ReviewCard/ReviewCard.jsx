import styles from './ReviewCard.module.css';
import StarIcon from '@mui/icons-material/Star';
export default ({review}) => {
    return (
        <div className={styles.card}>
            <h2>{review.rating}{<StarIcon/>}</h2>
            <h3>{review.text}</h3>
            <p>{new Date().toLocaleTimeString()}</p>
        </div>
    )
}