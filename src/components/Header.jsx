import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '@assets/icons/logo_blue.png'
import styles from '@styles/header.module.css'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => 
                                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                                }
                            >
                                Главная
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/services" 
                                className={({ isActive }) => 
                                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                                }
                            >
                                Услуги
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/lawyers" 
                                className={({ isActive }) => 
                                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                                }
                            >
                                Юристы
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/about" 
                                className={({ isActive }) => 
                                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                                }
                            >
                                О нас
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/contacts" 
                                className={({ isActive }) => 
                                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                                }
                            >
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
                <div className={styles.burgerMenu}>
                    <button 
                        className={`${styles.burgerButton} ${isMenuOpen ? styles.active : ''}`} 
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className={styles.burgerIcon}></span>
                        <span className={styles.burgerIcon}></span>
                        <span className={styles.burgerIcon}></span>
                    </button>
                    <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
                        <div className={styles.closeMobileMenu} onClick={toggleMenu}>✖</div>
                        <ul className={styles.mobileNavList}>
                            <li>
                                <NavLink 
                                    to="/" 
                                    className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink}
                                    onClick={toggleMenu}
                                >
                                    Главная
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/services" 
                                    className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink}
                                    onClick={toggleMenu}
                                >
                                    Услуги
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/lawyers" 
                                    className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink}
                                    onClick={toggleMenu}
                                >
                                    Юристы
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/about" 
                                    className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink}
                                    onClick={toggleMenu}
                                >
                                    О нас
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/contacts" 
                                    className={({ isActive }) =>isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink}
                                    onClick={toggleMenu}
                                >
                                    Контакты
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/login" 
                                    className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink}
                                    onClick={toggleMenu}
                                >
                                    Вход
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/register" 
                                    className={({ isActive }) =>isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink}
                                    onClick={toggleMenu}
                                >
                                    Регистрация
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;