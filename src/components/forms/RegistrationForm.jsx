

const RegistrationForm = () => {
    return (
        <>
            <form>
                <label htmlFor="Name">Имя</label>
                <input id="Name" className="Name inputField" type="text"></input>

                <label htmlFor="email">Почта</label>
                <input id="email" className="email inputField" type="email"></input>

                <label htmlFor="Password">Пароль</label>
                <input id="Password" className="Password inputField" type="password"></input>

                <label htmlFor="Password2">Потверждение пароля</label>
                <input id="Password2" className="Password2 inputField" type="password"></input>

                <button type="submit">Зарегистрироваться</button>
            </form>
            <p>Уже есть аккаунт?</p><a>Войти</a>
        </>)
}

export default RegistrationForm;