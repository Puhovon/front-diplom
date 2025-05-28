import { Link } from 'react-router-dom';
import logo from '@assets/icons/logo_white.png';
import tg from '@assets/icons/tg.png';
import wp from '@assets/icons/Wp.png';
import styles from '@styles/footer.module.css';
import Input from '@components/Input/index.jsx';

const Footer = () => {
    return (
        <footer className={styles.footer} itemScope itemType="http://schema.org/Organization">
            <div className={styles.container}>
                <div className={`${styles.column} ${styles.logoContainer}`}>
                    <Link to="/" aria-label="LawyerHub - Юридические услуги" title="Перейти на главную страницу LawyerHub">
                        <img
                            src={logo}
                            alt="Логотип LawyerHub - Юридические услуги"
                            loading="lazy"
                            className={styles.logo}
                            itemProp="logo"
                        />
                        <span className={styles.logoText} itemProp="name">LawyerHub</span>
                    </Link>
                </div>

                <div className={styles.columns}>
                    <div className={styles.column}>
                        <h4 className={styles.heading}>О компании:</h4>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>
                                <Link to="/about" title="О компании LawyerHub" itemProp="url">
                                    О нас
                                </Link>
                            </li>
                            <li className={styles.listItem}>
                                <Link to="/team" title="Наша команда разработчиков" itemProp="url">
                                    Команда
                                </Link>
                            </li>
                            <li className={styles.listItem}>
                                <Link to="/blog" title="Блог о юридических услугах" itemProp="url">
                                    Блог
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.heading}>Полезная информация:</h4>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>
                                <Link to="/faq" title="Часто задаваемые вопросы" itemProp="url">
                                    FAQ
                                </Link>
                            </li>
                            <li className={styles.listItem}>
                                <Link to="/privacy" title="Политика конфиденциальности LawyerHub" itemProp="url">
                                    Политика конфиденциальности
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.heading}>Контакты:</h4>
                        <ul className={styles.list} itemProp="contactPoint" itemScope itemType="http://schema.org/ContactPoint">
                            <li className={styles.listItem}>
                                <a href="mailto:lawyer.hub@gmail.com" title="Связаться по email" itemProp="email">
                                    lawyer.hub@gmail.com
                                </a>
                            </li>
                            <li className={styles.listItem}>
                                <a href="tel:+79991234567" title="Позвонить в LawyerHub" itemProp="telephone">
                                    +7 999 123-45-67
                                </a>
                            </li>
                        </ul>
                        <div className={styles.social}>
                            <Link to="/" aria-label="Телеграм" title="Перейти на соц сеть телеграм">
                                <img
                                    src={tg}
                                    alt="Телеграм"
                                    loading="lazy"
                                    className={styles.socialImg}
                                    itemProp="telegram"
                                />
                            </Link>
                            <Link to="/" aria-label="вацап" title="Перейти на соц сеть вацап">
                                <img
                                    src={wp}
                                    alt="вацап"
                                    loading="lazy"
                                    className={styles.socialImg}
                                    itemProp="watsap"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.subscribe}>
                            <Input
                                type="email"
                                placeholder="Введите электронную почту"
                                className={styles.input}
                                styles={{backgroundColor: '#fffff'}}
                            />
                            <button className={styles.button}>Подписаться</button>
                        </div>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <p>© {new Date().getFullYear()} LawyerHub. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;