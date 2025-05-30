import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/registrationSlice';

import logo from '@assets/icons/logo_blue.png';
import styles from '@styles/header.module.css';
import defaultAvatar from '@assets/icons/default-avatar.png';
import strel from '@assets/icons/strel.png';
import profile from '@assets/icons/iconamoon_profile-fill.png';
import exit from '@assets/icons/iconamoon_exit-bold.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isTokenLoading, setIsTokenLoading] = useState(true);
  const { user, accessToken, handleLogout, authError, getUserInfo } = useAuth();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (accessToken === undefined || accessToken === null) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      } catch (err) {
        console.error('Ошибка проверки токена:', err);
      } finally {
        setIsTokenLoading(false);
      }
    };

    checkToken();
  }, []);

  const fetchUser = async () => {
    if (!accessToken) return;

    setIsLoadingUser(true);
    try {
      const startTime = Date.now();
      const userData = await getUserInfo();
      if (userData) {
        dispatch(setUser(userData));
      }
      const elapsed = Date.now() - startTime;
      if (elapsed < 1000) {
        await new Promise((resolve) => setTimeout(resolve, 1000 - elapsed));
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    if (isTokenLoading) return;

    if (accessToken && (!user || !Object.keys(user).length)) {
      fetchUser();
    }
  }, [accessToken, isTokenLoading]);

  if (isTokenLoading) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logoLink} aria-label="Homepage">
            <img src={logo} alt="Company Logo" className={styles.logo} />
            LawyerHub
          </Link>
          <div className={styles.userProfile}>Проверка авторизации...</div>
        </div>
      </header>
    );
  }

  if (accessToken && (!user || !Object.keys(user).length) && isLoadingUser) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logoLink} aria-label="Homepage">
            <img src={logo} alt="Company Logo" className={styles.logo} />
            LawyerHub
          </Link>
          <div className={styles.userProfile}>Загрузка...</div>
        </div>
      </header>
    );
  }

  const displayName = user?.firstName || user?.name || 'Пользователь';

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
            {user && accessToken && (
              <li>
                <NavLink
                  to="/chat"
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                  }
                >
                  Мои чаты
                </NavLink>
              </li>
            )}
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
                <img src={strel} alt="Вниз" />
              </div>
              <div className={styles.dropdownContent}>
                <Link onClick={fetchUser} to="/profile" className={styles.dropdownItem}>
                  <img src={profile} alt="user" /> Профиль
                </Link>
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
                      className={({ isActive }) => (isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink)}
                      onClick={toggleMenu}
                    >
                      Главная
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/services"
                      className={({ isActive }) => (isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink)}
                      onClick={toggleMenu}
                    >
                      Услуги
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/lawyers"
                      className={({ isActive }) => (isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink)}
                      onClick={toggleMenu}
                    >
                      Юристы
                    </NavLink>
                  </li>
                  {user && accessToken && (
                    <li>
                      <NavLink
                        to="/chat"
                        className={({ isActive }) => (isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink)}
                        onClick={toggleMenu}
                      >
                        Мои чаты
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) => (isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink)}
                      onClick={toggleMenu}
                    >
                      О нас
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contacts"
                      className={({ isActive }) => (isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink)}
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
                      className={({ isActive }) => (isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink)}
                      onClick={toggleMenu}
                    >
                      Главная
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/services"
                      className={({ isActive }) => (isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink)}
                      onClick={toggleMenu}
                    >
                      Услуги
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/lawyers"
                      className={({ isActive }) => (isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink)}
                      onClick={toggleMenu}
                    >
                      Юристы
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) => (isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink)}
                      onClick={toggleMenu}
                    >
                      О нас
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contacts"
                      className={({ isActive }) => (isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink)}
                      onClick={toggleMenu}
                    >
                      Контакты
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) => (isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink)}
                      onClick={toggleMenu}
                    >
                      Вход
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/registration"
                      className={({ isActive }) => (isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink)}
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