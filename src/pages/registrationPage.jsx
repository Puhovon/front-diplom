import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from '@styles/registrationPage.module.css';
import logo from '@assets/icons/logo_blue.png';
import Input from '../components/Input/index.jsx';

const Registration = () => {
    const [userType, setUserType] = useState('client');
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        mail: '',
        pass: '',
        passRepeat: '',
        specialization: '',
        job: '',
        education: '',
        region: '',
        license: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (step < 1 || step > 3) {
            setStep(1);
        }
    }, [step]);

    const handleUserTypeChange = (type) => {
        setUserType(type);
        setStep(1); // Сброс шага при смене типа пользователя
    };

    const nextStep = (e) => {
        e.preventDefault();
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = (e) => {
        e.preventDefault();
        setStep((prevStep) => prevStep - 1);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Имя обязательно';
        if (!formData.mail || !/\S+@\S+\.\S+/.test(formData.mail)) newErrors.mail = 'Некорректная почта';
        if (!formData.pass) newErrors.pass = 'Пароль обязателен';
        if (formData.pass !== formData.passRepeat) newErrors.passRepeat = 'Пароли не совпадают';
        if (userType === 'provider' && step === 2) {
            if (!formData.specialization) newErrors.specialization = 'Укажите специализацию';
            if (!formData.region) newErrors.region = 'Укажите регион';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', formData);
            // Логика отправки данных через API
        }
    };

    return (
        <div className={styles.registration}>
            <Link className={styles.logo} to='/'>
                <img src={logo} alt="Назад" />
            </Link>
            <div className={styles.leftWrapper} />
            <div className={styles.rightWrapper}>
                <h2>Регистрация</h2>
                <div className={styles.сhangeForm}>
                    <div
                        className={`${styles.changeFormItem} ${userType === 'client' ? styles.active : ''}`}
                        onClick={() => handleUserTypeChange('client')}
                    >
                        Ищу услуги
                    </div>
                    <div
                        className={`${styles.changeFormItem} ${userType === 'provider' ? styles.active : ''}`}
                        onClick={() => handleUserTypeChange('provider')}
                    >
                        Предоставляю услуги
                    </div>
                </div>
                <form className={styles.registrationForm} onSubmit={handleSubmit}>
                    {userType === 'client' && (
                        <>
                            <Input
                                id='name'
                                label='Имя'
                                type='text'
                                value={formData.name}
                                onChange={handleInputChange}
                                error={errors.name}
                                placeholder='Введите имя'
                            />
                            <Input
                                id='mail'
                                label='Почта'
                                type='email'
                                value={formData.mail}
                                onChange={handleInputChange}
                                error={errors.mail}
                                placeholder='Введите электронную почту'
                            />
                            <Input
                                id='pass'
                                label='Пароль'
                                type='password'
                                value={formData.pass}
                                onChange={handleInputChange}
                                error={errors.pass}
                                placeholder='Введите пароль'
                            />
                            <Input
                                id='passRepeat'
                                label='Повторите пароль'
                                type='password'
                                value={formData.passRepeat}
                                onChange={handleInputChange}
                                error={errors.passRepeat}
                                placeholder='Введите пароль'
                            />
                            <button type='submit' className={styles.submitButton}>
                                Зарегистрироваться
                            </button>
                        </>
                    )}
                    {userType === 'provider' && (
                        <>
                            <div className={styles.stepsContainer}>
                                <div className={styles.steps}>
                                    Шаг {step}: {step === 1 ? 'Основные данные'
                                        : step === 2 ? 'Профессиональная информация'
                                            : 'Загрузка файлов'}
                                </div>
                                <div className={styles.stepPoints}>
                                    {[1, 2, 3].map((point) => (
                                        <div
                                            key={point}
                                            className={`${styles.setepPoint} ${step >= point ? styles.activePoint : ''}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            {step === 1 && (
                                <>
                                    <Input
                                        id='name'
                                        label='Имя'
                                        type='text'
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        error={errors.name}
                                        placeholder='Введите имя'
                                    />
                                    <Input
                                        id='mail'
                                        label='Почта'
                                        type='email'
                                        value={formData.mail}
                                        onChange={handleInputChange}
                                        error={errors.mail}
                                        placeholder='Введите электронную почту'
                                    />
                                    <Input
                                        id='pass'
                                        label='Пароль'
                                        type='password'
                                        value={formData.pass}
                                        onChange={handleInputChange}
                                        error={errors.pass}
                                        placeholder='Введите пароль'
                                    />
                                    <Input
                                        id='passRepeat'
                                        label='Повторите пароль'
                                        type='password'
                                        value={formData.passRepeat}
                                        onChange={handleInputChange}
                                        error={errors.passRepeat}
                                        placeholder='Введите пароль'
                                    />
                                    <button onClick={nextStep} type='button' className={styles.submitButton}>
                                        Далее
                                    </button>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <Input
                                        id='specialization'
                                        label='Специализация'
                                        type='text'
                                        value={formData.specialization}
                                        onChange={handleInputChange}
                                        error={errors.specialization}
                                        placeholder='Например уголовное право'
                                    />
                                    <Input
                                        id='job'
                                        label='Опыт работы'
                                        type='text'
                                        value={formData.job}
                                        onChange={handleInputChange}
                                        error={errors.job}
                                        placeholder='Например 5 лет'
                                    />
                                    <Input
                                        id='education'
                                        label='Образование'
                                        type='text'
                                        value={formData.education}
                                        onChange={handleInputChange}
                                        error={errors.education}
                                        placeholder='Например МГУ'
                                    />
                                    <Input
                                        id='region'
                                        label='Регион работы'
                                        type='text'
                                        value={formData.region}
                                        onChange={handleInputChange}
                                        error={errors.region}
                                        placeholder='Москва'
                                    />
                                    <Input
                                        id='license'
                                        label='Номер лицензии'
                                        type='text'
                                        value={formData.license}
                                        onChange={handleInputChange}
                                        error={errors.license}
                                        placeholder='Номер лицензии'
                                    />
                                    <div className={styles.buttons}>
                                        <button onClick={prevStep} type='button' className={styles.changePointBtn}>
                                            Назад
                                        </button>
                                        <button onClick={nextStep} type='button' className={`${styles.changePointBtn} ${styles.submitButton}`}>
                                            Далее
                                        </button>
                                    </div>
                                </>
                            )}
                            {step === 3 && (
                                <>
                                    <Input
                                        id='files'
                                        label='Загрузка файлов'
                                        type='file'
                                        error={errors.files}
                                        multiple
                                    />
                                    <div className={styles.buttons}>
                                        <button onClick={prevStep} type='button' className={styles.changePointBtn}>
                                            Назад
                                        </button>
                                        <button type='submit' className={`${styles.changePointBtn} ${styles.submitButton}`}>
                                            Зарегистрироваться
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </form>
                <div className={styles.loginLinkContainer}>
                    <p className={styles.text}>Уже есть аккаунт?</p>
                    <Link to='/login' className={styles.link}>Войти</Link>
                </div>
            </div>
        </div>
    );
};

export default Registration;