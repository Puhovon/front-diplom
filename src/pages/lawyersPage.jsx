import styles from '@styles/lawyersPage.module.css'
import Input from '@components/Input/index.jsx';
import LawyerCard from '@components/LawyerCard/index.jsx';
import pidaras from '@assets/pidaras.jpg'
const Lawyers = () => {
    return (
        <div className={styles.lawyers}>
            <div className={styles.container}>
                <form className={styles.searchForm}>
                    <Input
                        id='specialization'
                        type='text'
                        error={null}
                        placeholder='Выбрать специализацию' />
                    <button type='submit' className={styles.button}>Найти</button>
                </form>
                <ul className={styles.list}>
                    <li className={styles.findElement}>
                        <LawyerCard
                            name="Аркадий Алавердян"
                            specialization="Уголовное право"
                            city="Москва"
                            photo={pidaras} />
                    </li>
                    <li className={styles.findElement}>
                        <LawyerCard
                            name="Евгений Изотов"
                            specialization="семейная терапия"
                            city="Санкт-Питербург"
                            photo={pidaras} />
                    </li>
                </ul>
            </div>
        </div>
    )
};
export default Lawyers;