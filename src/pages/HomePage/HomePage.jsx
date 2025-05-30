import styles from '@styles/homePage.module.css';
import arrow from '@assets/icons/arrow_button.svg';
import item from '@assets/icons/tg.png';
import pic1 from '@assets/icons/hero/pic1.png'
import pic2 from '@assets/icons/hero/pic2.png'
import pic3 from '@assets/icons/hero/pic3.png'
import pic4 from '@assets/icons/hero/pic4.png'
import pic5 from '@assets/icons/hero/pic5.png'
import pic6 from '@assets/icons/hero/pic6.png'
import pic7 from '@assets/icons/hero/pic7.png'
import pic8 from '@assets/icons/hero/pic8.png'
import pic9 from '@assets/icons/hero/pic8.png'
import pic10 from '@assets/icons/hero/pic10.png'
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <h1>Адвокат рядом — защита на расстоянии клика</h1>
            <p>Не ищите в офлайне — мы уже здесь</p>
          </div>
          <Link to="/lawyers" className={styles.button}>
            Найти Адвоката
            <img src={arrow} alt="Иконка стрелки" className={styles.image} />
          </Link>
        </div>
      </section>

      <section className={styles.specializations}>
        <div className={styles.container}>
          <h2>Основные специализации адвокатов</h2>
          <div className={styles.specializationsList}>
            <Link to="/family-law" className={styles.specializationsItem}>
              <img src={pic8} alt="Иконка адвоката по семейным делам" />
              <p>Адвокат по семейным делам</p>
            </Link>
            <Link to="/criminal-law" className={styles.specializationsItem}>
              <img src={pic4} alt="Иконка адвоката по уголовным делам" />
              <p>Адвокат по уголовным делам</p>
            </Link>
            <Link to="/civil-law" className={styles.specializationsItem}>
              <img src={pic3} alt="Иконка адвоката по гражданским делам" />
              <p>Адвокат по гражданским делам</p>
            </Link>
            <Link to="/arbitration-law" className={styles.specializationsItem}>
              <img src={pic10} alt="Иконка адвоката по арбитражным делам" />
              <p>Адвокат по арбитражным делам</p>
            </Link>
            <Link to="/consumer-law" className={styles.specializationsItem}>
              <img src={pic7} alt="Иконка адвоката по правам потребителей" />
              <p>Адвокат по правам потребителей</p>
            </Link>
            <Link to="/labor-law" className={styles.specializationsItem}>
              <img src={pic5} alt="Иконка адвоката по трудовым спорам" />
              <p>Адвокат по трудовым спорам</p>
            </Link>
            <Link to="/housing-law" className={styles.specializationsItem}>
              <img src={pic6} alt="Иконка адвоката по жилищным делам" />
              <p>Адвокат по жилищным делам</p>
            </Link>
            <Link to="/tax-law" className={styles.specializationsItem}>
              <img src={pic9} alt="Иконка адвоката по налоговым спорам" />
              <p>Адвокат по налоговым спорам</p>
            </Link>
            <Link to="/administrative-law" className={styles.specializationsItem}>
              <img src={pic2} alt="Иконка адвоката по административным делам" />
              <p>Адвокат по административным делам</p>
            </Link>
            <Link to="/intellectual-property" className={styles.specializationsItem}>
              <img src={pic1} alt="Иконка адвоката по интеллектуальной собственности" />
              <p>Адвокат по интеллектуальной собственности</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;