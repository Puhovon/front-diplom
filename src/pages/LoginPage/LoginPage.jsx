import styles from '@styles/loginPage.module.css';
import Input from '@components/Input/index.jsx';
import { Link } from 'react-router-dom';
import logo from '@assets/icons/logo_blue.png';

const Login = () => {
  return (
    <div className={styles.login}>
      <Link className={styles.logo} to='/'>
        <img src={logo} alt="Назад" />
      </Link>
      <div className={styles.leftWrapper}>
        <h3 className={styles.logIn}>Войти</h3>
        <form className={styles.loginForm}>
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
          <Link to='/passwordRefresh' className={styles.link}>Забыли пароль</Link>
          <button type='submit' className={styles.submitButton}>
            Войти
          </button>
        </form>
        <div className={styles.registerLinkContainer}>
          <p className={styles.text}>Нет аккаунта?</p>
          <Link to='/registration' className={styles.link}>Зарегистрироваться</Link>
        </div>
      </div>
      <div className={styles.rightWrapper} />
    </div>
  )
};
export default Login;