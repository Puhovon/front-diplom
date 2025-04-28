import styles from '@styles/registrationPage.module.css'

import Input from '../components/Input/index.jsx';

const Registration = () => {
    return (<>
        <div className={styles.container}>
            <div className={styles.left_side}></div>
            <div className={styles.right_side_container}>
                <form className={styles.form}>
                    <Input id="name" label="Name" type="email" />

                    <Input id="email" label="Email" type="email" />

                    <Input id="password" label="Password" type="password" />

                    <Input id="password2" label="Password" type="password" />

                    <button type="submit" className={styles.submitButton}>Зарегистрироваться</button>
                    <p>Уже есть аккаунт? <a href="login">Войти</a></p>
                </form>
            </div>
        </div>
    </>)
};

export default Registration;