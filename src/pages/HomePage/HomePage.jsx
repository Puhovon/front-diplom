import styles from '@styles/homePage.module.css';
import arrow from '@assets/icons/arrow_button.svg';

const HomePage = () => {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <h1>Адвокат рядом — защита на расстоянии клика</h1>
            <p>Не ищите в офлайне — мы уже здесь</p>
          </div>
          <button className={styles.button}>
            Найти Адвоката
            <img src={arrow} className={styles.image} />
          </button>
        </div>
      </section>
      <section>
        <div className={styles.container}>

        </div>
      </section>
    </>
  );
};

export default HomePage;