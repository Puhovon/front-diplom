import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import styles from '@styles/registrationPage.module.css';
import logo from '@assets/icons/logo_blue.png';
import Input from '../components/Input/index.jsx';
import Modal from '../components/ErrModal/index.jsx';
import leftImage from '../../src/assets/reg-backg.png';
import { setUserType, setStep, setUser } from '../store/registrationSlice.js';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Registration = () => {
    const dispatch = useDispatch();
    const { userType, step } = useSelector((state) => state.registration);

    // Список доступных специализаций
    const availableSpecializations = [
        'Уголовное право',
        'Гражданское право',
        'Семейное право',
        'Трудовое право',
        'Налоговое право',
    ];

    // Локальное состояние для формы, ошибок и модального окна
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        patronymic: '',
        gender: 'male',
        birthDate: '',
        mail: '',
        pass: '',
        passRepeat: '',
        specialization: [], // Теперь массив
        job: '',
        education: '',
        region: '',
        license: '',
    });
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (step < 1 || step > 3) {
            dispatch(setStep(1));
        }
    }, [step, dispatch]);

    const handleUserTypeChange = (type) => {
        dispatch(setUserType(type));
        setFormData({
            name: '',
            surname: '',
            patronymic: '',
            gender: 'male',
            birthDate: '',
            mail: '',
            pass: '',
            passRepeat: '',
            specialization: [], // Сбрасываем в массив
            job: '',
            education: '',
            region: '',
            license: '',
        });
        setErrors({});
        setIsModalOpen(false);
    };

    const validateForm = () => {
        const newErrors = {};

        if (step === 1 || userType === 'client') {
            // Проверка email
            if (!formData.mail.trim()) {
                newErrors.mail = 'Почта обязательна';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mail)) {
                newErrors.mail = 'Некорректный email';
            }

            // Проверка пароля
            if (!formData.pass) {
                newErrors.pass = 'Пароль обязателен';
            } else if (formData.pass.length < 8 || formData.pass.length > 32) {
                newErrors.pass = 'Пароль должен быть от 8 до 32 символов';
            } else if (!/\d/.test(formData.pass)) {
                newErrors.pass = 'Пароль должен содержать цифру';
            } else if (!/[A-Z]/.test(formData.pass)) {
                newErrors.pass = 'Пароль должен содержать заглавную букву';
            }

            // Проверка повторного пароля
            if (!formData.passRepeat) {
                newErrors.passRepeat = 'Повторите пароль';
            } else if (formData.pass !== formData.passRepeat) {
                newErrors.passRepeat = 'Пароли не совпадают';
            }

            // Проверка имени
            if (!formData.name.trim()) {
                newErrors.name = 'Имя обязательно';
            } else if (formData.name.length < 2) {
                newErrors.name = 'Имя слишком короткое';
            }

            // Проверка фамилии
            if (!formData.surname.trim()) {
                newErrors.surname = 'Фамилия обязательна';
            } else if (formData.surname.length < 2) {
                newErrors.surname = 'Фамилия слишком короткая';
            }

            // Проверка отчества
            if (formData.patronymic && formData.patronymic.trim().length < 2) {
                newErrors.patronymic = 'Отчество слишком короткое';
            }

            if (!formData.birthDate) {
                newErrors.birthDate = 'Дата рождения обязательна';
            } else {
                const birthDate = new Date(formData.birthDate);
                const today = new Date('2025-05-29T04:14:00Z'); 
                const minAgeDate = new Date(today);
                minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);
                if (isNaN(birthDate.getTime())) {
                    newErrors.birthDate = 'Неверный формат даты';
                } else if (birthDate > today) {
                    newErrors.birthDate = 'Дата рождения не может быть в будущем';
                } else if (birthDate > minAgeDate) {
                    newErrors.birthDate = 'Пользователь должен быть старше 18 лет';
                }
            }

            if (!formData.gender) {
                newErrors.gender = 'Пол обязателен';
            } else if (!['male', 'female'].includes(formData.gender.toLowerCase())) {
                newErrors.gender = 'Неверное значение пола';
            }
        }

        if (userType === 'provider' && step === 2) {
            // Проверка специализации (массив)
            if (!formData.specialization || formData.specialization.length === 0) {
                newErrors.specialization = 'Укажите хотя бы одну специализацию';
            } else if (!formData.specialization.every(spec => availableSpecializations.includes(spec))) {
                newErrors.specialization = 'Выбрана некорректная специализация';
            }

            if (!formData.region.trim()) {
                newErrors.region = 'Укажите регион';
            } else if (formData.region.length < 2) {
                newErrors.region = 'Регион должен содержать минимум 2 символа';
            }
        }

        setErrors(newErrors);
        setIsModalOpen(Object.keys(newErrors).length > 0);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(setStep(step + 1));
            setIsModalOpen(false);
        }
    };

    const prevStep = (e) => {
        e.preventDefault();
        dispatch(setStep(step - 1));
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setErrors((prev) => ({ ...prev, [id]: '' }));
    };

    const handleGenderChange = (e) => {
        setFormData((prev) => ({ ...prev, gender: e.target.value }));
        setErrors((prev) => ({ ...prev, gender: '' }));
    };

    const handleSpecializationsChange = (event, newValue) => {
        setFormData((prev) => ({ ...prev, specialization: newValue }));
        setErrors((prev) => ({ ...prev, specialization: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const userData = {
                userType,
                firstName: formData.name,
                lastName: formData.surname,
                patronymic: formData.patronymic,
                gender: formData.gender,
                birthDate: formData.birthDate,
                email: formData.mail,
                password: formData.pass,
                specializations: formData.specialization, // Теперь массив
                experienceStartDate: formData.job,
                education: formData.education,
                region: formData.region,
                licenseNumber: formData.license,
                registrationDate: new Date().toISOString(), // 04:14 AM PDT, 29 мая 2025
            };
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/v1/auth/register${userType === 'client' ? 'Client' : 'Lawyer'}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userData),
                    }
                );
                console.log(JSON.stringify(userData));
                if (!response.ok) {
                    throw new Error('Ошибка при отправке данных на сервер');
                }

                const result = await response.json();
                dispatch(setUser(userData));
                setFormData({
                    name: '',
                    surname: '',
                    patronymic: '',
                    gender: 'male',
                    birthDate: '',
                    mail: '',
                    pass: '',
                    passRepeat: '',
                    specialization: [], // Сбрасываем в массив
                    job: '',
                    education: '',
                    region: '',
                    license: '',
                });
                setErrors({});
                setIsModalOpen(false);
            } catch (error) {
                console.error('Ошибка:', error.message);
                setErrors({ server: 'Ошибка отправки данных на сервер' });
                setIsModalOpen(true);
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.registration}>
            <Link className={styles.logo} to="/">
                <img src={logo} alt="Назад" />
            </Link>
            <div className={styles.leftWrapper}>
                <img src={leftImage} alt="leftImage" />
            </div>
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
                                id="name"
                                label="Имя"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                error={errors.name}
                                placeholder="Введите имя"
                            />
                            <Input
                                id="surname"
                                label="Фамилия"
                                type="text"
                                value={formData.surname}
                                onChange={handleInputChange}
                                error={errors.surname}
                                placeholder="Введите фамилию"
                            />
                            <Input
                                id="patronymic"
                                label="Отчество"
                                type="text"
                                value={formData.patronymic}
                                onChange={handleInputChange}
                                error={errors.patronymic}
                                placeholder="Введите отчество"
                            />
                            <Input
                                id="birthDate"
                                label="Дата рождения"
                                type="date"
                                value={formData.birthDate}
                                onChange={handleInputChange}
                                error={errors.birthDate}
                            />
                            <Input
                                id="mail"
                                label="Почта"
                                type="email"
                                value={formData.mail}
                                onChange={handleInputChange}
                                error={errors.mail}
                                placeholder="Введите электронную почту"
                            />
                            <Input
                                id="pass"
                                label="Пароль"
                                type="password"
                                value={formData.pass}
                                onChange={handleInputChange}
                                error={errors.pass}
                                placeholder="Введите пароль (8-32 символа, цифра, заглавная)"
                            />
                            <Input
                                id="passRepeat"
                                label="Повторите пароль"
                                type="password"
                                value={formData.passRepeat}
                                onChange={handleInputChange}
                                error={errors.passRepeat}
                                placeholder="Повторите пароль"
                            />
                            <FormControl component="fieldset" className={styles.genderSelector}>
                                <FormLabel component="legend">Пол</FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleGenderChange}
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="Мужской" />
                                    <FormControlLabel value="female" control={<Radio />} label="Женский" />
                                </RadioGroup>
                                {errors.gender && <p className={styles.error}>{errors.gender}</p>}
                            </FormControl>
                            <button type="submit" className={styles.submitButton}>
                                Зарегистрироваться
                            </button>
                        </>
                    )}
                    {userType === 'provider' && (
                        <>
                            <div className={styles.stepsContainer}>
                                <div className={styles.steps}>
                                    Шаг {step}:{' '}
                                    {step === 1
                                        ? 'Основные данные'
                                        : step === 2
                                        ? 'Профессиональная информация'
                                        : 'Завершение'}
                                </div>
                                <div className={styles.stepPoints}>
                                    {[1, 2, 3].map((point) => (
                                        <div
                                            key={point}
                                            className={`${styles.setepPoint} ${
                                                step >= point ? styles.activePoint : ''
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            {step === 1 && (
                                <>
                                    <Input
                                        id="name"
                                        label="Имя"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        error={errors.name}
                                        placeholder="Введите имя"
                                    />
                                    <Input
                                        id="surname"
                                        label="Фамилия"
                                        type="text"
                                        value={formData.surname}
                                        onChange={handleInputChange}
                                        error={errors.surname}
                                        placeholder="Введите фамилию"
                                    />
                                    <Input
                                        id="patronymic"
                                        label="Отчество (если есть)"
                                        type="text"
                                        value={formData.patronymic}
                                        onChange={handleInputChange}
                                        error={errors.patronymic}
                                        placeholder="Введите отчество"
                                    />
                                    <Input
                                        id="birthDate"
                                        label="Дата рождения"
                                        type="date"
                                        value={formData.birthDate}
                                        onChange={handleInputChange}
                                        error={errors.birthDate}
                                    />
                                    <Input
                                        id="mail"
                                        label="Почта"
                                        type="email"
                                        value={formData.mail}
                                        onChange={handleInputChange}
                                        error={errors.mail}
                                        placeholder="Введите электронную почту"
                                    />
                                    <Input
                                        id="pass"
                                        label="Пароль"
                                        type="password"
                                        value={formData.pass}
                                        onChange={handleInputChange}
                                        error={errors.pass}
                                        placeholder="Введите пароль (8-32 символа, цифра, заглавная)"
                                    />
                                    <Input
                                        id="passRepeat"
                                        label="Повторите пароль"
                                        type="password"
                                        value={formData.passRepeat}
                                        onChange={handleInputChange}
                                        error={errors.passRepeat}
                                        placeholder="Повторите пароль"
                                    />
                                    <FormControl component="fieldset" className={styles.genderSelector}>
                                        <FormLabel component="legend">Пол</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-label="gender"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleGenderChange}
                                        >
                                            <FormControlLabel value="male" control={<Radio />} label="Мужской" />
                                            <FormControlLabel value="female" control={<Radio />} label="Женский" />
                                        </RadioGroup>
                                        {errors.gender && <p className={styles.error}>{errors.gender}</p>}
                                    </FormControl>
                                    <button onClick={nextStep} type="button" className={styles.submitButton}>
                                        Далее
                                    </button>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <div className={styles.specializationSection}>
                                        <label className={styles.specializationLabel}>Специализация</label>
                                        <Autocomplete
                                            multiple
                                            options={availableSpecializations}
                                            value={formData.specialization}
                                            onChange={handleSpecializationsChange}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Выберите специализации"
                                                    error={!!errors.specialization}
                                                    helperText={errors.specialization}
                                                />
                                            )}
                                            className={styles.autocomplete}
                                        />
                                    </div>
                                    <Input
                                        id="job"
                                        label="Опыт работы"
                                        type="text"
                                        value={formData.job}
                                        onChange={handleInputChange}
                                        error={errors.job}
                                        placeholder="Например 5 лет"
                                    />
                                    <Input
                                        id="education"
                                        label="Образование"
                                        type="text"
                                        value={formData.education}
                                        onChange={handleInputChange}
                                        error={errors.education}
                                        placeholder="Например МГУ"
                                    />
                                    <Input
                                        id="region"
                                        label="Регион работы"
                                        type="text"
                                        value={formData.region}
                                        onChange={handleInputChange}
                                        error={errors.region}
                                        placeholder="Москва"
                                    />
                                    <Input
                                        id="license"
                                        label="Номер лицензии"
                                        type="text"
                                        value={formData.license}
                                        onChange={handleInputChange}
                                        error={errors.license}
                                        placeholder="Номер лицензии"
                                    />
                                    <div className={styles.buttons}>
                                        <button
                                            onClick={prevStep}
                                            type="button"
                                            className={styles.changePointBtn}
                                        >
                                            Назад
                                        </button>
                                        <button
                                            type="submit"
                                            className={`${styles.changePointBtn} ${styles.submitButton}`}
                                        >
                                            Зарегистрироваться
                                        </button>
                                    </div>
                                </>
                            )}
                            {step === 3 && (
                                <>
                                    <h2>Регистрация завершена успешно</h2>
                                    <div className={styles.buttons}>
                                        <Link
                                            to="/"
                                            className={`${styles.changePointBtn} ${styles.submitButton}`}
                                        >
                                            На главную
                                        </Link>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </form>
                <div className={styles.loginLinkContainer}>
                    <p className={styles.text}>Уже есть аккаунт?</p>
                    <Link to="/login" className={styles.link}>
                        Войти
                    </Link>
                </div>
                <Modal isOpen={isModalOpen} errors={errors} onClose={closeModal} />
            </div>
        </div>
    );
};

export default Registration;