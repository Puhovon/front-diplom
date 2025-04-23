const RegistrationForm = () => {
    return (
        <>
            <form>
                <label htmlFor="name">Имя</label>
                <input id="name" className="name inputField" type="text"/>

                <label htmlFor="email">Почта</label>
                <input id="email" className="email inputField" type="email"/>

                <label htmlFor="password">Пароль</label>
                <input id="password" className="password inputField" type="password"/>

                <label htmlFor="password2">Потверждение пароля</label>
                <input id="password2" className="password2 inputField" type="password"/>

                <button type="submit">Зарегистрироваться</button>
                <p>Уже есть аккаунт? <a href="tidolbayob">Войти</a></p>
            </form>
            
        </>)
}

export default RegistrationForm;