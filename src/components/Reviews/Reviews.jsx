import styles from './styles.module.css';
import ReviewCard from './ReviewCard/ReviewCard';

export default ({ reviews }) => {
    return (
        <div className={styles.container}>
            <h2>Отзывы</h2>
            <div>
                {reviews.map((el) => {
                    return <ReviewCard review={el} key={el.id} />
                })}
            </div>
        </div>
    )
}