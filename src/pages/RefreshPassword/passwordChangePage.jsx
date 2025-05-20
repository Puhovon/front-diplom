// import styles from '@styles/passwordChangePage.module.css'

const PasswordChange = () => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h2 className={styles.title}>Новый пароль </h2>
                <p className={styles.subtitle}>Придумайте  новый пароль для вашего аккаунта</p>
            </div>
            <form className={styles.form}>
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
                    id='confirmPass'
                    label='Пароль'
                    type='password'
                    error={null}
                    placeholder='Повторите пароль'
                />
                <button type='submit' className={styles.submitButton}>
                    Отправить
                </button>
            </form>
        </div>
    )
};
export default PasswordChange;