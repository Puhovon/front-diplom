import Input from '@components/Input/index.jsx';
import styles from '../RefreshPassword/refreshPassword.module.css';
import { Link } from 'react-router-dom';


const RefreshPassword = () => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h2 className={styles.title}>Восстановление пароля</h2>
                <p className={styles.subtitle}>Введите почту, указанную при регистрации. Мы отправим ссылку для сброса пароля</p>
            </div>
            <form className={styles.form}>
                <Input
                    id='mail'
                    label='Почта'
                    type='mail'
                    error={null}
                    placeholder='Введите электронную почту'
                />
                <Link to='/passwordChange' type='submit' className={styles.submitButton}>
                    Отправить
                </Link>
            </form>
        </div>
    );
};
export default RefreshPassword;