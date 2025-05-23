import styles from '@styles/lawyersPage.module.css'
import Input from '@components/Input/index.jsx';
import LawyerCard from '@components/LawyerCard/index.jsx';
import pidaras from '@assets/pidaras.jpg'
const Lawyers = () => {
    return (
        <div className={styles.container}>
            <form className={styles.searchForm}>
                <Input
                    id='specialization'
                    type='text'
                    error={null}
                    placeholder='Выбрать специализацию' />
                <Input
                    id='city'
                    type='text'
                    error={null}
                    placeholder='Выбрать город' />
                <button type='submit' className={styles.button}>Найти</button>
            </form>
            <ul>
                <li className={styles.findElement}>
                    <LawyerCard
                        name="Arkadiy"
                        specialization="Ugolovka"
                        city="SPb" />
                </li>
                <li className={styles.findElement}>
                    <LawyerCard
                        name="Jenya"
                        specialization="семейная терапия"
                        city="SPb"
                        photo={pidaras} />
                </li>
            </ul>
        </div>
    )
};
export default Lawyers;