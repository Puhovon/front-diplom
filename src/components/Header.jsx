import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '@hooks/useAuth';

import logo from '@assets/icons/logo_blue.png';
import styles from '@styles/header.module.css';
import defaultAvatar from '@assets/icons/default-avatar.png';
import strel from '@assets/icons/strel.png';
import profile from '@assets/icons/iconamoon_profile-fill.png';
import exit from '@assets/icons/iconamoon_exit-bold.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, accessToken, handleLogout, authError } = useAuth();

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
                to="/lawyers"
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
              >
                Юристы
              </NavLink>
            </li>
          </ul>
        </nav>
        {user && accessToken ? (
          <div className={styles.userProfile}>
            {authError && <span className={styles.authError}>{authError}</span>}
            <div className={styles.dropdown}>
              <div className={styles.userProfile}>
                <img
                  src={user.avatar || defaultAvatar}
                  alt="User Avatar"
                  className={styles.avatar}
                />
                <span className={styles.userName}>{user.role}</span>
                <img src={strel} alt="Вниз" />
              </div>
              <div className={styles.dropdownContent}>
                <Link tp="/profile" className={styles.dropdownItem}> <img src={profile} alt="user" />Профиль</Link>
                <button onClick={handleLogout} className={styles.dropdownItem}>
                  <img src={exit} alt="exit" />
                  Выход
                </button>
              </div>
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
                <Link to="/" className={styles.logoLinkMobile} onClick={toggleMenu} aria-label="Homepage">
                  <img src={logo} alt="Company Logo" className={styles.logo} />
                  LawyerHub
                </Link>
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
                      className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink}
                      onClick={toggleMenu}
                    >
                      Контакты
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (

          <>
            <div className={styles.authButtons}>
              {authError && <span className={styles.authError}>{authError}</span>}
              <Link to="/login" className={styles.authButton}>
                Вход
              </Link>
              <Link to="/registration" className={`${styles.authButton} ${styles.register}`}>
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
                <Link to="/" className={styles.logoLinkMobile} onClick={toggleMenu} aria-label="Homepage">
                  <img src={logo} alt="Company Logo" className={styles.logo} />
                  LawyerHub
                </Link>
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
                      className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink}
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
                      to="/registration"
                      className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink}
                      onClick={toggleMenu}
                    >
                      Регистрация
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;