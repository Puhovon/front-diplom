import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '@assets/icons/logo_blue.png'
import styles from '@styles/header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.logoLink} aria-label="Homepage">
                    <img src={logo} alt="Company Logo" className={styles.logo} />
                </Link>

                <nav className={styles.nav} aria-label="Main navigation">
                    <ul className={styles.navList}>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                                Главная
                            </NavLink>
                            <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                                Услуги
                            </NavLink>
                            <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                                Юристы
                            </NavLink>
                            <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                                О нас
                            </NavLink>
                            <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                                Контакты
                            </NavLink>
                        </li>

                    </ul>
                </nav>
                <div className={styles.authButtons}>
                    <Link to="/register" className={`${styles.authButton} ${styles.register}`}>
                        Регистрация
                    </Link>
                    <Link to="/login" className={styles.authButton}>
                        Вход
                    </Link>
                </div>
            </div>
        </header>
    );

};
export default Header;