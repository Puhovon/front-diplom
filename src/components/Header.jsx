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
                    LawyerHub
                </Link>

                <nav className={styles.nav} aria-label="Main navigation">
                    <ul className={styles.navList}>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                                Главная
                            </NavLink>
                        </li>
                        <li><NavLink to="/services" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                            Услуги
                        </NavLink>
                        </li>
                        <li>
                            <NavLink to="/lawyers" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                                Юристы
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                                О нас
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contacts" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                                Контакты
                            </NavLink>
                        </li>

                    </ul>
                </nav>
                <div className={styles.authButtons}>
                    <Link to="/login" className={styles.authButton}>
                        Вход
                    </Link>
                    <Link to="/register" className={`${styles.authButton} ${styles.register}`}>
                        Регистрация
                    </Link>
                </div>
            </div>
        </header>
    );

};
export default Header;