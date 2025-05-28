import { useState, useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, errors, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        let timer;
        if (isOpen) {
            // Запускаем таймер на закрытие через 5 секунд
            timer = setTimeout(() => {
                setIsClosing(true);
                // Даём время на анимацию перед фактическим закрытием
                setTimeout(onClose, 300);
            }, 3000);
        }

        return () => {
            clearTimeout(timer);
            setIsClosing(false);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={`${styles.modalOverlay} ${isClosing ? styles.fadeOut : ''}`}>
            <div className={`${styles.modal} ${isClosing ? styles.slideOut : ''}`}>
                <h3>Ошибки валидации</h3>
                <ul>
                    {Object.values(errors).map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
                <button onClick={() => {
                    setIsClosing(true);
                    setTimeout(onClose, 300);
                }} className={styles.modalCloseButton}>
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Modal;