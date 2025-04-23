import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from '@styles/header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.logoLink} aria-label="Homepage">
                    {/* <img src={logo} alt="Company Logo" className={styles.logo} /> */}
                    Лого
                </Link>

                <nav className={styles.nav} aria-label="Main navigation">
                    <ul className={styles.navList}>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                                Главная
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