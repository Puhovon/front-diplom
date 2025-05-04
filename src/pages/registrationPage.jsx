import styles from '@styles/registrationPage.module.css'

import Input from '../components/Input/index.jsx';
import { Link } from 'react-router-dom';
import logo from '@assets/icons/logo_blue.png';

const Registration = () => {
    return (
        <div className={styles.login}>
            <div className={styles.rightWrapper} />

            <Link className={styles.logo} to='/'>
                <img src={logo} alt="Назад" />
            </Link>
            <div className={styles.leftWrapper}>
                <h3 className={styles.logIn}>Регистрация</h3>
                <form className={styles.loginForm}>
                    <Input
                        id='name'
                        label='Имя'
                        type='name'
                        error={null}
                        placeholder='Введите имя'
                    />
                    <Input
                        id='mail'
                        label='Почта'
                        type='mail'
                        error={null}
                        placeholder='Введите электронную почту'
                    />
                    <Input
                        id='password'
                        label='Пароль'
                        type='password'
                        error={null}
                        placeholder='Введите пароль'
                    />
                    <Input
                        id='password'
                        label='Пароль'
                        type='password'
                        error={null}
                        placeholder='Введите пароль'
                    />
                    <button type='submit' className={styles.submitButton}>
                        Войти
                    </button>
                </form>
                <div className={styles.registerLinkContainer}>
                    <p className={styles.text}>Есть аккаунт?</p>
                    <Link to='/login' className={styles.link}>Войти</Link>
                </div>
            </div>
        </div>
    )
};

export default Registration;