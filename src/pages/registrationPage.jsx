import { Link } from 'react-router-dom';

import styles from '@styles/registrationPage.module.css'
import logo from '@assets/icons/logo_blue.png';
import Input from '../components/Input/index.jsx';
import { useState } from 'react';

const Registration = () => {
    const [userType, setUserType] = useState('client');


    const handleUserTypeChange = (type) => {
        setUserType(type);
    };

    return (
        <div className={styles.registration}>
            <Link className={styles.logo} to='/'>
                <img src={logo} alt="Назад" />
            </Link>
            <div className={styles.leftWrapper} />
            <div className={styles.rightWrapper}>
                <h2>Регистрация</h2>
                <div className={styles.сhangeForm}>
                    <div
                        className={`${styles.changeFormItem} ${userType === 'client' ? styles.active : ''}`}
                        onClick={() => handleUserTypeChange('client')}
                    >
                        Ищу услуги
                    </div>
                    <div
                        className={`${styles.changeFormItem} ${userType === 'provider' ? styles.active : ''}`}
                        onClick={() => handleUserTypeChange('provider')}
                    >
                        Предоставляю услуги
                    </div>
                </div>
                <form className={styles.registrationForm}>
                    <Input
                        id='name'
                        label='Имя'
                        type='text'
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
                        id='pass'
                        label='Пароль'
                        type='password'
                        error={null}
                        placeholder='Введите пароль'
                    />
                    <Input
                        id='passRepeat'
                        label='Повторите пароль'
                        type='password'
                        error={null}
                        placeholder='Введите пароль'
                    />
                    {userType === 'provider' && (
                        <>
                            <Input
                                id="specialization"
                                label="Специализация"
                                type="text"
                                error={null}
                                placeholder="Например, уголовное право"
                            />
                            <Input
                                id="experience"
                                label="Опыт работы (лет)"
                                type="number"
                                error={null}
                                placeholder="Введите стаж работы"
                            />
                        </>
                    )}{userType === 'provider' && (
                        <button type='file' className={styles.fileButton}>
                            Загрузить документы
                        </button>
                    )}

                    <button type='submit' className={styles.submitButton}>
                        Зарегистрироваться
                    </button>
                </form>
                <div className={styles.loginLinkContainer}>
                    <p className={styles.text}>Уже есть аккаунт?</p>
                    <Link to='/login' className={styles.link}>Войти</Link>
                </div>
            </div>
        </div>
    )
};

export default Registration;