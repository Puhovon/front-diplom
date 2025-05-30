import styles from './index.module.css'

const Team = () => {
    return(
        <div className={styles.teamContainer}>
            <h2 className={styles.teamTitle}>Наша команда</h2>
            <div className={styles.teamMembers}>
                <div className={styles.memberCard}>
                    <div className={`${styles.avatar} ${styles.teamLead}`}></div>
                    <h3>Станислав Киселев</h3>
                    <p className={styles.role}>Тимлид</p>
                </div>
                
                <div className={styles.memberCard}>
                    <div className={`${styles.avatar} ${styles.backend}`}></div>
                    <h3>Владимир Баранов</h3>
                    <p className={styles.role}>Backend разработчик</p>
                </div>
                
                <div className={styles.memberCard}>
                    <div className={`${styles.avatar} ${styles.frontend}`}></div>
                    <h3>Аркадий Алавердян</h3>
                    <p className={styles.role}>Frontend разработчик</p>
                </div>
                
                <div className={styles.memberCard}>
                    <div className={`${styles.avatar} ${styles.designer}`}></div>
                    <h3>Алина Лобова</h3>
                    <p className={styles.role}>Дизайнер</p>
                </div>
                
                <div className={styles.memberCard}>
                    <div className={`${styles.avatar} ${styles.tester}`}></div>
                    <h3>Евгений Изотов</h3>
                    <p className={styles.role}>Тестировщик</p>
                </div>
            </div>
        </div>
    );
};
export default Team;