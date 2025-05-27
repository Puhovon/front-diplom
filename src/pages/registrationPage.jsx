import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import styles from '@styles/registrationPage.module.css';
import logo from '@assets/icons/logo_blue.png';
import Input from '../components/Input/index.jsx';
import Modal from '../components/ErrModal/index.jsx';
import leftImage from '../../src/assets/reg-backg.png';
import { setUserType, setStep, setUser } from '../store/registrationSlice.js';

const Registration = () => {
  const dispatch = useDispatch();
  const { userType, step } = useSelector((state) => state.registration);

  // Локальное состояние для формы, ошибок и модального окна
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    patronymic: '',
    birthDate: '',
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
      birthDate: '',
      mail: '',
      pass: '',
      passRepeat: '',
      specialization: '',
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
      if (!formData.name.trim()) {
        newErrors.name = 'Имя обязательно';
      } else if (formData.name.length < 2) {
        newErrors.name = 'Имя должно содержать минимум 2 символа';
      }

      if (!formData.surname.trim()) {
        newErrors.surname = 'Фамилия обязательна';
      } else if (formData.surname.length < 2) {
        newErrors.surname = 'Фамилия должна содержать минимум 2 символа';
      }

      if (!formData.patronymic.trim()) {
        newErrors.patronymic = 'Отчество обязательно';
      } else if (formData.patronymic.length < 2) {
        newErrors.patronymic = 'Отчество должно содержать минимум 2 символа';
      }

      if (!formData.birthDate) {
        newErrors.birthDate = 'Дата рождения обязательна';
      } else {
        const birthDate = new Date(formData.birthDate);
        const today = new Date('2025-05-27T14:59:00Z'); // 07:59 AM PDT = 14:59 UTC
        const ageDiff = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        let age = ageDiff;
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
        if (isNaN(birthDate.getTime())) {
          newErrors.birthDate = 'Некорректная дата рождения';
        } else if (birthDate > today) {
          newErrors.birthDate = 'Дата рождения не может быть в будущем';
        } else if (age < 18) {
          newErrors.birthDate = 'Вам должно быть не менее 18 лет';
        }
      }

      if (!formData.mail.trim()) {
        newErrors.mail = 'Почта обязательна';
      } else if (!/\S+@\S+\.\S+/.test(formData.mail)) {
        newErrors.mail = 'Некорректная почта';
      }

      if (!formData.pass) {
        newErrors.pass = 'Пароль обязателен';
      } else if (formData.pass.length < 6) {
        newErrors.pass = 'Пароль должен содержать минимум 6 символов';
      }

      if (!formData.passRepeat) {
        newErrors.passRepeat = 'Повторите пароль';
      } else if (formData.pass !== formData.passRepeat) {
        newErrors.passRepeat = 'Пароли не совпадают';
      }
    }

    if (userType === 'provider' && step === 2) {
      if (!formData.specialization.trim()) {
        newErrors.specialization = 'Укажите специализацию';
      } else if (formData.specialization.length < 3) {
        newErrors.specialization = 'Специализация должна содержать минимум 3 символа';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = {
        userType,
        ...formData,
        registrationDate: new Date().toISOString(), // 07:59 AM PDT, 27 мая 2025
      };

      // Отправка данных на бэкенд
      try {
        const response = await fetch('https://your-backend-api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error('Ошибка при отправке данных на сервер');
        }

        const result = await response.json();
        console.log('Response from backend:', result);

        // Сохраняем пользователя в Redux после успешной отправки
        dispatch(setUser(userData));

        // Очищаем форму после успешной регистрации
        setFormData({
          name: '',
          surname: '',
          patronymic: '',
          birthDate: '',
          mail: '',
          pass: '',
          passRepeat: '',
          specialization: '',
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
                placeholder="Выберите дату рождения"
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
                placeholder="Введите пароль"
              />
              <Input
                id="passRepeat"
                label="Повторите пароль"
                type="password"
                value={formData.passRepeat}
                onChange={handleInputChange}
                error={errors.passRepeat}
                placeholder="Введите пароль"
              />
              <button type="submit" className={styles.submitButton}>
                Зарегистрироваться
              </button>
            </>
          )}
          {userType === 'provider' && (
            <>
              <div className={styles.stepsContainer}>
                <div className={styles.steps}>
                  Шаг {step}: {step === 1 ? 'Основные данные' : step === 2 ? 'Профессиональная информация' : 'Загрузка файлов'}
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
                    placeholder="Выберите дату рождения"
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
                    placeholder="Введите пароль"
                  />
                  <Input
                    id="passRepeat"
                    label="Повторите пароль"
                    type="password"
                    value={formData.passRepeat}
                    onChange={handleInputChange}
                    error={errors.passRepeat}
                    placeholder="Введите пароль"
                  />
                  <button onClick={nextStep} type="button" className={styles.submitButton}>
                    Далее
                  </button>
                </>
              )}
              {step === 2 && (
                <>
                  <Input
                    id="specialization"
                    label="Специализация"
                    type="text"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    error={errors.specialization}
                    placeholder="Например уголовное право"
                  />
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
                    <button onClick={prevStep} type="button" className={styles.changePointBtn}>
                      Назад
                    </button>
                    <button onClick={nextStep} type="button" className={`${styles.changePointBtn} ${styles.submitButton}`}>
                      Далее
                    </button>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <Input
                    id="files"
                    label="Загрузка файлов"
                    type="file"
                    multiple
                  />
                  <div className={styles.buttons}>
                    <button onClick={prevStep} type="button" className={styles.changePointBtn}>
                      Назад
                    </button>
                    <button type="submit" className={`${styles.changePointBtn} ${styles.submitButton}`}>
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
