import styles from '@styles/registrationPage.module.css'
const Registration = () => {
    return (<>
        <div className={styles.container}>
            <div className={styles.left_side}></div>
            <div className={styles.right_side_container}>
                <form className={styles.form}>
                    <label htmlFor="name">Имя</label>
                    <input id="name" className={styles.inputField} type="email" />

                    <label htmlFor="email">Почта</label>
                    <input id="email" className={styles.inputField} type="email" />

                    <label htmlFor="password">Пароль</label>
                    <input id="password" className={styles.inputField} type="password" />

                    <label htmlFor="password2">Потверждение пароля</label>
                    <input id="password2" className={styles.inputField} type="password" />

                    <button type="submit" className={styles.button}>Зарегистрироваться</button>
                    <p>Уже есть аккаунт? <a href="login">Войти</a></p>
                </form>
            </div>
        </div>
    </>)
};

export default Registration;